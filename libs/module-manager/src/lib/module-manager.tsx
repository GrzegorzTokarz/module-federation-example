import type { ReactNode } from 'react';
import { createContext, memo, useCallback, useEffect, useMemo, useState, } from 'react';
import loadComponent from './utils/loadComponent';
import { LocalModuleDescriptor, RemoteModuleDescriptor } from './types';
import getRemoteModuleId from './utils/getRemoteModuleId';
import getDynamicScript from './utils/getDynamicScript';

/* eslint-disable-next-line */
export interface ModuleManagerProps {
  children?: ReactNode;
  plugins?: Array<LocalModuleDescriptor | RemoteModuleDescriptor>;
}

export type ModuleRegistry = Record<string, { scope: string; instance: any }>;

export interface ModuleManagerContextProps {
  loadModules: ((modules: RemoteModuleDescriptor[]) => void) | null;
  error: any;
  loading: boolean;
  registry: ModuleRegistry;
}

export const ModuleManagerContext = createContext<ModuleManagerContextProps>({
  loadModules: null,
  error: null,
  loading: false,
  registry: {},
});

const isLocalModuleDescriptor = (
  descriptor: any
): descriptor is LocalModuleDescriptor => {
  return typeof descriptor['load'] === 'function';
};

export function ModuleManager({ children, plugins }: ModuleManagerProps) {
  const [ modulesRegistry, setModulesRegistry ] = useState<ModuleRegistry>({});
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<any>(null);
  const loadModules = useCallback(
    async (modules: Array<LocalModuleDescriptor | RemoteModuleDescriptor>) => {
      try {
        setLoading(true);
        const remoteModules: RemoteModuleDescriptor[] = [];
        const localModules: LocalModuleDescriptor[] = [];
        modules.forEach((module) => {
          if (isLocalModuleDescriptor(module)) {
            localModules.push(module);
          } else {
            remoteModules.push(module);
          }
        });
        const remoteInstances = await Promise.all(
          remoteModules.map(async (module) => [
            getRemoteModuleId(module),
            await getDynamicScript(module).then((givenContainer) =>
              loadComponent(module.path, module.scope, module.module, givenContainer)
            ),
            module.scope,
          ])
        );
        const localInstances = await Promise.all(
          localModules.map(async (module) => [
            `local:${ module.scope }`,
            await module.load(),
            module.scope,
          ])
        );
        setModulesRegistry((prev) => {
          const newInstances = [ ...remoteInstances, ...localInstances ].map(
            ([ key, module, scope ]) => {
              if (prev[key]) {
                return [ key, prev[key] ];
              }
              return [ key, { scope, instance: new module.default() } ];
            }
          );
          return {
            ...Object.fromEntries(newInstances),
          };
        });
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    void loadModules(plugins ?? []);
  }, [ loadModules, plugins ]);

  // useEffect(() => {
  //   try {
  //     const i18nBackends: any[] =
  //       i18next?.services?.backendConnector?.backend?.backends ?? [];
  //     const pluginBackend = i18nBackends.find(
  //       (backend) => backend?.constructor?.name === 'PluginBackend'
  //     );
  //     if (pluginBackend) {
  //       for (const [key, value] of Object.entries(modulesRegistry)) {
  //         if (value.instance.i18nLoader) {
  //           pluginBackend.addLoader(value.scope, value.instance.i18nLoader);
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     console.error('ModuleManager', e);
  //   }
  // }, [modulesRegistry]);

  const contextValue = useMemo(
    () => ({ loadModules, error, loading, registry: modulesRegistry }),
    [ loadModules, error, loading, modulesRegistry ]
  );

  return (
    <ModuleManagerContext.Provider value={ contextValue }>
      { children }
    </ModuleManagerContext.Provider>
  );
}

export default memo(ModuleManager);

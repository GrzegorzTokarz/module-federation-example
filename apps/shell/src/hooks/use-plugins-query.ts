import { useEffect, useMemo, useState } from 'react';
import { RemoteModuleDescriptor } from '@ff/module-manager';

const TENANT_1_PLUGINS: RemoteModuleDescriptor[] = [ {
  path: 'http://localhost:4300/remoteEntry.js',
  scope: 'plugin-ff',
  module: './Module'
} ]

export const usePluginsQuery = (tenantId?: number) => {
  //Emulate some API query
  const [ plugins, setPlugins ] = useState<RemoteModuleDescriptor[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setPlugins(tenantId === 1 ? TENANT_1_PLUGINS : []);
      setIsLoading(false);
    }, 100);
    return () => {
      clearTimeout(timeoutId);
      setIsLoading(false);
    };
  }, [ setIsLoading, setPlugins, tenantId ]);
  return useMemo(() => ({ isLoading, plugins }), [ isLoading, plugins ]);
}

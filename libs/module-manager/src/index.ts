declare global {
  interface Window {
    remoteMFStore: Record<string, any>;
  }
}
export * from './lib/module-manager';
export type {
  RemoteModuleDescriptor,
  LocalModuleDescriptor,
} from './lib/types';
export { default as getDynamicScript } from './lib/utils/getDynamicScript';
export { default as getRemoteModuleId } from './lib/utils/getRemoteModuleId';
export { default as loadComponent } from './lib/utils/loadComponent';
export { default as RemoteComponent } from './lib/utils/RemoteComponent';

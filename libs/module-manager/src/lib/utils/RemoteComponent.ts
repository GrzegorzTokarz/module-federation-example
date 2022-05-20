import getDynamicScript from './getDynamicScript';
import getRemoteModuleId from './getRemoteModuleId';
import loadComponent from './loadComponent';
import { RemoteModuleDescriptor } from '../types';

const loadingPromise = (remoteModule: RemoteModuleDescriptor) =>
  new Promise(async (resolve, reject) => {
    try {
      await getDynamicScript(remoteModule);
      const _module = await loadComponent(
        remoteModule.path,
        remoteModule.scope,
        remoteModule.module
      );

      resolve(_module);
    } catch (e) {
      console.log(`mf-dynamic-remote-component: error getting remote ${e}`);
      reject(e);
    }
  });

export default function RemoteComponent(remoteModule: RemoteModuleDescriptor) {
  window.remoteMFStore = window.remoteMFStore || {};
  const id = getRemoteModuleId(remoteModule);
  const existingModule = window.remoteMFStore[id];
  if (existingModule) {
    return existingModule;
  }
  window.remoteMFStore[id] = loadingPromise(remoteModule);
  return window.remoteMFStore[id];
}

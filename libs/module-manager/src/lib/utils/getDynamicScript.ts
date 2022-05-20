/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { RemoteModuleDescriptor } from '../types';

export default function getDynamicScript(remoteModule: RemoteModuleDescriptor) {
  // experiments.outputModule: true
  return import(/* webpackIgnore:true */ remoteModule.path);
  // experiments.outputModule: false + library output type umd
  /*const id = getRemoteModuleId(remoteModule);

  const existingElement = document.getElementById(id);

  if (existingElement) {
    // @ts-ignore
    if (window[remoteModule.scope]) {
      return Promise.resolve(true);
    }
    return new Promise((resolve) => {
      existingElement.onload = (e) => {
        resolve(true);
      };
    });
  }

  const element = document.createElement('script');

  element.src = remoteModule.path;
  element.type = 'text/javascript';
  element.async = true;
  element.id = id;

  document.head.appendChild(element);

  return new Promise((resolve, reject) => {
    element.onload = () => {
      resolve(true);
    };
    element.onerror = () => {
      // eslint-disable-next-line no-console
      console.error(`Dynamic Script Error: ${ remoteModule.path }`);
      reject(new Error(`Dynamic Script Error: ${ remoteModule.path }`));
    };
  });*/
}

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// https://webpack.js.org/concepts/module-federation/#dynamic-remote-containers
/**
 * @param {String} path remote container scope path
 * @param {String} scope container scope
 * @param {*} module provided module to fetch from container
 * @return {Module} the remote module
 */
export default async function loadComponent(
  path: string,
  scope: string,
  module: string,
  givenContainer?: any
) {
  try {
    // @ts-ignore
    await __webpack_init_sharing__('default');
    // @ts-ignore
    const container = givenContainer ?? window[scope];
    // @ts-ignore
    await container.init(__webpack_share_scopes__['default']);
    // @ts-ignore
    const factory = await container.get(module);
    const Module = factory();
    return Module;
  } catch (e) {
    throw new Error(`Error loading remote module.
      Please check the url: ${path}, scope: ${scope} and module: ${module}
      -----------------------------------------------
      ${e}`);
  }
}

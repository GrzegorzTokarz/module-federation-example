import type { RemoteModuleDescriptor } from '../types';

export default function remoteModuleIdentifier({
  path,
  module,
  scope,
}: RemoteModuleDescriptor) {
  return [path, module, scope].join('');
}

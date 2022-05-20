export interface RemoteModuleDescriptor {
  path: string;
  scope: string;
  module: string;
}
export interface LocalModuleDescriptor {
  load: () => Promise<any>;
  scope: string;
}

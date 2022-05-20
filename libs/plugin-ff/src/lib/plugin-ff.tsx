import React from 'react';

class PluginFf {
  getRoutes() {
    return [{ path: '/', exact: true, element: <div>Tenant 1 Home</div> }];
  }
}

export default PluginFf;

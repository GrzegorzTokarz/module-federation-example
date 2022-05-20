# Example
2 federated applications (shell and other-app) plus one plugin, it exposes simple method to define routes. Shell application runs plugins and uses such method to render routes, routes from plugins are coming before default shell routes this way plugin can override default routes.
````
npm install
````
Running main federated apps
````
nx serve shell --remotes=other-app
````
Running plugin
````
nx serve plugin-ff
````
Open in browser localhost:4200, click Use tenant 1 to load and activate plugin

# Sources
https://nx.dev/module-federation/faster-builds

https://nx.dev/module-federation/micro-frontend-architecture

https://webpack.js.org/concepts/module-federation/

https://github.com/module-federation/module-federation-examples

import * as React from 'react';
import { useCallback, useContext, useState } from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';
import { ModuleManager, ModuleManagerContext } from '@ff/module-manager';
import { usePluginsQuery } from '../hooks/use-plugins-query';

const OtherApp = React.lazy(() => import('other-app/Module'));

const PluggableAppRoutes = () => {
  const mm = useContext(ModuleManagerContext);
  const links = Object.values(mm.registry).reduce(
    (links, plugin) => plugin?.instance?.getRoutes() ?? [],
    []
  );
  return (
    <Routes>
      { links.map((link, idx) => (
        <Route key={ idx } { ...link } />
      )) }
      <Route path="/" element={ <NxWelcome title="shell"/> }/>
      <Route path="/other-app" element={ <OtherApp/> }/>
    </Routes>
  );
};

export function App() {
  const [ currentTenant, setCurrentTenant ] = useState(2);
  const { plugins } = usePluginsQuery(currentTenant);
  const changeTenant = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
    setCurrentTenant(parseInt(e.currentTarget.value, 10))
  }, []);
  return (
    <React.Suspense fallback={ null }>
      <ModuleManager plugins={ plugins }>
        <button type={'button'} onClick={ changeTenant } value={ 1 }>
          Use tenant 1
        </button>
        <button type={'button'} onClick={ changeTenant } value={ 2 }>
          Use tenant 2
        </button>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/other-app">OtherApp</Link>
          </li>
        </ul>
        <PluggableAppRoutes/>
      </ModuleManager>
    </React.Suspense>
  );
}

export default App;

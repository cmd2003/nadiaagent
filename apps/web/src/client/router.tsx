import { createHashRouter, Navigate } from 'react-router';
import { App } from './App';
import { IndexGate } from './pages/IndexGate';
import { WelcomePage } from './pages/Welcome';
import ExecutionPage from './pages/Execution';
import { RouteErrorFallback } from './components/ui/RouteErrorFallback';

export const router = createHashRouter([
  {
    path: '/',
    Component: App,
    errorElement: <RouteErrorFallback />,
    children: [
      { index: true, Component: IndexGate, errorElement: <RouteErrorFallback /> },
      { path: 'welcome', Component: WelcomePage, errorElement: <RouteErrorFallback /> },
      { path: 'execution/:id', Component: ExecutionPage, errorElement: <RouteErrorFallback /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

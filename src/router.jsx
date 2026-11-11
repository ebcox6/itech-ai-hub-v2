import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Shell from './components/Shell';
import Home from './pages/Home';

// Home ships in the main bundle; everything else loads when first visited.
const Learn = lazy(() => import('./pages/Learn'));
const Framework = lazy(() => import('./pages/Framework'));
const Prompts = lazy(() => import('./pages/Prompts'));
const PromptDetail = lazy(() => import('./pages/PromptDetail'));
const Agents = lazy(() => import('./pages/Agents'));
const AgentDetail = lazy(() => import('./pages/AgentDetail'));
const MyKit = lazy(() => import('./pages/MyKit'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Old v1 paths redirect to their new homes so existing links keep working.
const legacy = {
  welcome: '/', frameworks: '/learn', synapse: '/learn/synapse', craft: '/learn/craft',
  socratic: '/learn/socratic', anatomy: '/learn/anatomy', advanced: '/learn/power',
  templates: '/prompts', library: '/prompts', resources: '/learn#guides', favorites: '/my-kit', history: '/my-kit',
};

export const router = createBrowserRouter(
  [
    {
      element: <Shell />,
      children: [
        { index: true, element: <Home /> },
        { path: 'learn', element: <Learn /> },
        { path: 'learn/:slug', element: <Framework /> },
        { path: 'prompts', element: <Prompts /> },
        { path: 'prompts/:id', element: <PromptDetail /> },
        { path: 'agents', element: <Agents /> },
        { path: 'agents/:id', element: <AgentDetail /> },
        { path: 'my-kit', element: <MyKit /> },
        ...Object.entries(legacy).map(([from, to]) => ({ path: from, element: <Redirect to={to} /> })),
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' },
);

function Redirect({ to }) {
  const [pathname, hash] = to.split('#');
  return <Navigate to={{ pathname, hash: hash ? `#${hash}` : '' }} replace />;
}

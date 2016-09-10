import Index from './containers/routes/Index';
import Self from './containers/routes/Self';
import App from './containers/App';

const routes = [
  { path: '/',
    component: App,
    childRoutes: [
      { path: 'example',
        component: Index
      },
      { path: 'example/self',
        component: Self
      }
    ]
  }
];

export default routes;

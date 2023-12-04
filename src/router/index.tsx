import { createHashRouter } from 'react-router-dom';
import loadable from '@loadable/component';
const Index = loadable(() => import('../pages/index'));
const Login = loadable(() => import('../pages/login'));
const Register = loadable(() => import('../pages/register'));
const Page404 = loadable(() => import('../pages/page404'));
const Profile = loadable(() => import('../pages/profile'));
const Email = loadable(() => import('../pages/email'));
const Bankcard = loadable(() => import('../pages/bankcard'));
const Addcard = loadable(() => import('../pages/addcard'));
const Send = loadable(() => import('../pages/send'));
const Transaction = loadable(() => import('../pages/transaction'));
const Statement = loadable(() => import('../pages/statement'));
const Request = loadable(() => import('../pages/request'));
const MyRequest = loadable(() => import('../pages/myrequest'));
const PayRequest = loadable(() => import('../pages/payrequest'));

const router = createHashRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/Register',
    element: <Register />,
  },
  {
    path: '/Profile/',
    element: <Profile />,
  },
  {
    path: '/Email/',
    element: <Email />,
  },
  {
    path: '/Bankcard/',
    element: <Bankcard />,
  },
  {
    path: '/Addcard/',
    element: <Addcard />,
  },
  {
    path: '/Send/',
    element: <Send />,
  },
  {
    path: '/Transaction/',
    element: <Transaction />,
  },
  {
    path: '/Statement/',
    element: <Statement />,
  },
  {
    path: '/Request/',
    element: <Request />,
  },
  {
    path: '/MyRequest/',
    element: <MyRequest />,
  },
  {
    path: '/PayRequest/',
    element: <PayRequest />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);

export default router;

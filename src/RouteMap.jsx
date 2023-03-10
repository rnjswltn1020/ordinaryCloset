import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactGA from 'react-ga';
import Layout from './pages/Layout';
import NotFound from './pages/NotFount';
import Main from './pages/Main';
import Products from './pages/Products';
import Login from './pages/Login';
import MyCart from './pages/MyCart';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Main />,
            },
            {
                path: '/products',
                element: <Products />,
            },
            {
                path: '/mycart',
                element: <MyCart />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <NotFound />,
    },
]);

const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID; // 환경 변수에 저장된 추적ID 가져오기
ReactGA.initialize(gaTrackingId, { debug: true }); // react-ga 초기화 및 debug 사용
ReactGA.pageview(window.location.pathname); // 추적하려는 page 설정

export default function RouteMap() {
    return <RouterProvider router={router} />;
}

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactGA from 'react-ga';
import Layout from './pages/Layout';
import NotFound from './pages/NotFount';
import Main from './pages/Main';
import Products from './pages/Products';
import Login from './pages/Login';
import MyCart from './pages/MyCart';
import NewProducts from './pages/NewProducts';
import ProductsDetail from './pages/ProductsDetail';
import ProtectedRoute from './pages/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                path: '/',
                element: <Main />,
            },
            // 모든상품
            {
                path: '/products',
                element: <Products />,
            },
            // 상품 상세
            {
                path: '/products/:id',
                element: <ProductsDetail />,
            },
            // 신상품
            {
                path: '/products/new',
                element: (
                    <ProtectedRoute requiredAdmin>
                        <NewProducts />
                    </ProtectedRoute>
                ),
            },
            // 카트
            {
                path: '/mycart',
                element: (
                    <ProtectedRoute>
                        <MyCart />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    // 로그인
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

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout';
import NotFound from './pages/NotFount';
import Main from './pages/Main';
import Products from './pages/Products';
import Login from './pages/Login';
import MyCart from './pages/MyCart';
import NewProducts from './pages/NewProducts';
import ProductsDetail from './pages/ProductsDetail';
import ProtectedRoute from './pages/ProtectedRoute';
import Join from './pages/Join';

const router = createBrowserRouter(
    [
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
        // 회원가입
        {
            path: '/join',
            element: <Join />,
            errorElement: <NotFound />,
        },
    ],
    {
        basename: process.env.PUBLIC,
    },
);

export default function RouteMap() {
    return <RouterProvider router={router} />;
}

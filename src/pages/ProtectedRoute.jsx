import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredAdmin }) {
    //  1. 로그인 유무 확인
    //  2. 관리자인지아닌지 확인 후 조건맞으면 children 보이게
    const { getUserData } = useAuthContext();

    if (!getUserData || (requiredAdmin && !getUserData.isAdmin)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

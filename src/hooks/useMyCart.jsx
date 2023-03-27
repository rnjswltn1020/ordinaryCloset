import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteFromCart, getMyCart as getCartIData, postMyCart } from '../api/fbase';
import { useAuthContext } from '../context/AuthContext';

export default function useMyCart() {
    const queryClient = useQueryClient();
    const { uid } = useAuthContext();

    const getMyCart = useQuery(['myCart', uid || ''], () => getCartIData(uid), { enabled: !!uid });

    const putMyCart = useMutation(product => postMyCart(uid, product), {
        onSuccess: () => queryClient.invalidateQueries(['myCart', uid]),
    });

    const deleteProduct = useMutation(({ productId }) => deleteFromCart(uid, productId), {
        onSuccess: () => queryClient.invalidateQueries(['myCart', uid]),
    });

    return { getMyCart, putMyCart, deleteProduct };
}

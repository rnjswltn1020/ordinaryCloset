import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyCart as getCartIData, postMyCart } from '../api/fbase';
import { useAuthContext } from '../context/AuthContext';

export default function useMyCart() {
    const queryClient = useQueryClient();
    const { uid } = useAuthContext();

    const getMyCart = useQuery({
        queryKey: ['myCart'],
        queryFn: () => getCartIData(uid),
    });

    const putMyCart = useMutation(({ userId, product }) => postMyCart(userId, product), {
        onSuccess: () => queryClient.invalidateQueries('myCart'),
    });

    return { getMyCart, putMyCart };
}

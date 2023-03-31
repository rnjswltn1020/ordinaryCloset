import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductsList, postProducts } from '../api/fbase';
import { useAuthContext } from '../context/AuthContext';

export default function useProducts() {
    const queryClient = useQueryClient();
    const { uid } = useAuthContext();

    const getProducts = useQuery(
        ['myProducts', uid || '', 'myFavorite'],
        () => {
            const res = getProductsList(uid);
            return res;
        },
        {
            enabled: !!uid,
        },
    );

    const addProducts = useMutation(({ product, imageUrl }) => postProducts(product, imageUrl), {
        onSuccess: () => queryClient.invalidateQueries('myProducts'),
    });

    return { getProducts, addProducts };
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteFromCart, getProductsList, postProducts } from '../api/fbase';

export default function useProducts() {
    const queryClient = useQueryClient();

    const getProducts = useQuery({
        queryKey: ['products'],
        queryFn: () => getProductsList(),
    });

    const addProducts = useMutation(({ product, imageUrl }) => postProducts(product, imageUrl), {
        onSuccess: () => queryClient.invalidateQueries('products'),
    });

    return { getProducts, addProducts };
}

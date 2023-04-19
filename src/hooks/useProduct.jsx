import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductsList, postProducts } from '../api/fbase';
import { useAuthContext } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import useMyFavorite from './useMyFavorite';

export default function useProducts() {
    const queryClient = useQueryClient();
    const { uid } = useAuthContext();
    const {
        getMyFavorite: { data: favorites },
    } = useMyFavorite();
    const [getFavoriteLen, setFavoriteLen] = useState('');

    useEffect(() => {
        if (favorites) {
            setFavoriteLen(favorites.length);
        }
    }, [getFavoriteLen]);

    const getProducts = useQuery(
        ['myProducts', uid || '', getFavoriteLen],
        () => {
            const res = getProductsList(uid, favorites);
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

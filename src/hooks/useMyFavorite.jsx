import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { deleteFromMyFavorite, getMyFavorite as getFavorites, postMyFavorite } from '../api/fbase';

export default function useMyFavorite() {
    const queryClient = useQueryClient();
    const { uid } = useAuthContext();

    const getMyFavorite = useQuery(['myFavorite', uid || ''], () => getFavorites(uid), {
        enabled: !!uid,
    });

    const updateMyFavorite = useMutation(product => postMyFavorite(uid, product), {
        onSuccess: () => {
            queryClient.invalidateQueries(['myFavorite', uid]);
        },
    });

    const deleteMyFavorite = useMutation(({ productId }) => deleteFromMyFavorite(uid, productId), {
        onSuccess: () => queryClient.invalidateQueries(['myFavorite', uid]),
    });

    return { getMyFavorite, updateMyFavorite, deleteMyFavorite };
}

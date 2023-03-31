import useMyFavorite from '../hooks/useMyFavorite';

export default function Favorite() {
    const {
        getMyFavorite: { isLoading, error, data: myFavorite },
    } = useMyFavorite();
    return (
        <ul>
            {myFavorite.map(item => {
                return <h2 key={item.id}>{item.productName}</h2>;
            })}
        </ul>
    );
}

import useMyFavorite from '../hooks/useMyFavorite';

export default function Favorite() {
    const {
        getMyFavorite: { isLoading, error, data: myFavorite },
    } = useMyFavorite();

    if (isLoading) <p>Loading중...</p>;
    if (error) <p>오류가 발생하였습니다😥</p>;

    return (
        <ul>
            {myFavorite.map(item => {
                return <h2 key={item.id}>{item.productName}</h2>;
            })}
        </ul>
    );
}

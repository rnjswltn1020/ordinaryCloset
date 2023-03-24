import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProduct';
import PaginationBox from '../components/Pagination';

export default function Products() {
    const {
        getProducts: { isLoading, error, data: products },
    } = useProducts();

    const [getCurrentPage, setCurrentPage] = useState(1);
    const [getItemPerPage, setItemPerPage] = useState(9);
    const [targetItems, setTargetItems] = useState(null);

    const indexOfLast = getCurrentPage * getItemPerPage;
    const indexOfFirst = indexOfLast - getItemPerPage;
    const currentPosts = posts => {
        if (posts !== undefined) {
            let currentPost = 0;
            currentPost = posts.slice(indexOfFirst, indexOfLast);
            setTargetItems(currentPost);
        }
    };

    useEffect(() => {
        currentPosts(products);
    }, [products, getCurrentPage]);

    const handlePage = (e, currentPage) => setCurrentPage(currentPage);

    if (isLoading) return 'Loading....';
    if (error) return '에러가 발생하였습니다.';

    return (
        <Wrapper>
            <ul>
                {targetItems &&
                    targetItems.map(item => {
                        return <ProductCard key={item.id} data={item} />;
                    })}
            </ul>
            {products && <PaginationBox data={products} onChangePage={handlePage} />}
        </Wrapper>
    );
}

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        overflow: hidden;
        gap: 10px;
        margin-bottom: 20px;
    }
`;

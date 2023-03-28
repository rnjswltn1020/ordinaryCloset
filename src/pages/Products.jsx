import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProduct';
import PaginationBox from '../components/Pagination';
import Filtering from '../components/Filtering';

export default function Products() {
    const {
        getProducts: { isLoading, error, data: products },
    } = useProducts();
    const [getCurrentPage, setCurrentPage] = useState(1);
    const [getItemPerPage] = useState(6);
    const [targetCategory, setTargetCategory] = useState('all');
    const [filteredProduct, setFilteredProduct] = useState(products);
    const [filterPagination, setFilterPagination] = useState(null);

    const indexOfLast = getCurrentPage * getItemPerPage;
    const indexOfFirst = indexOfLast - getItemPerPage;
    const currentPosts = posts => {
        if (posts !== undefined && posts !== null) {
            let currentPost = 0;
            currentPost = posts.slice(indexOfFirst, indexOfLast);
            setFilteredProduct(currentPost);
        }
    };

    const handlePage = currentPage => setCurrentPage(currentPage);

    const changeTab = category => {
        if (category !== 'all') {
            const res = [...products].filter(item => item.targetGender === category);
            setFilterPagination(res);
            currentPosts(res);
        } else {
            setFilterPagination([...products]);
            currentPosts([...products]);
        }
    };

    useEffect(() => {
        if (products) {
            changeTab(targetCategory);
            handlePage(1);
        }
    }, [targetCategory]);

    useEffect(() => {
        if (products) {
            currentPosts(filterPagination);
        }
    }, [getCurrentPage]);

    useEffect(() => {
        if (products) {
            changeTab(targetCategory);
        }
    }, [products]);

    if (isLoading) return 'Loading....';
    if (error) return '에러가 발생하였습니다.';

    return (
        <Wrapper>
            <Filtering selectedIdx={setTargetCategory} />
            <div>
                {filteredProduct && filteredProduct.length === 0 && <p>상품을 준비중입니다😁</p>}
            </div>
            <ul>
                {products &&
                    filteredProduct &&
                    filteredProduct.map(item => {
                        return <ProductCard key={item.id} data={item} />;
                    })}
            </ul>
            {products && filterPagination && (
                <PaginationBox
                    data={filterPagination}
                    onChangePage={handlePage}
                    page={getCurrentPage}
                    rowsPerPage={getItemPerPage}
                />
            )}
        </Wrapper>
    );
}

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    & > ul:last-of-type {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        overflow: hidden;
        gap: 10px;
        margin-bottom: 30px;
        padding: 1rem;
    }
`;

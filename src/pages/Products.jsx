import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProduct';
import PaginationBox from '../components/Pagination';
import Filtering from '../components/Filtering';

export default function Products() {
    const {
        getProducts: { isLoading, error, data: myProduct },
    } = useProducts();

    const [getCurrentPage, setCurrentPage] = useState(1);
    const [getItemPerPage] = useState(6);
    const [targetCategory, setTargetCategory] = useState('all');
    const [filteredProduct, setFilteredProduct] = useState(myProduct);
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
            const res = [...myProduct].filter(item => item.targetGender === category);
            setFilterPagination(res);
            currentPosts(res);
        } else {
            setFilterPagination([...myProduct]);
            currentPosts([...myProduct]);
        }
    };

    useEffect(() => {
        if (myProduct) {
            changeTab(targetCategory);
            handlePage(1);
        }
    }, [targetCategory]);

    useEffect(() => {
        if (myProduct) {
            currentPosts(filterPagination);
        }
    }, [getCurrentPage]);

    useEffect(() => {
        console.log(myProduct);
        if (myProduct) {
            changeTab(targetCategory);
        }
    }, [myProduct]);

    if (isLoading && myProduct !== undefined) return 'Loading....';
    if (error) return '에러가 발생하였습니다.';
    if( myProduct === undefined)  return '로그인이 필요한 서비스 입니다😅'

    return (
        myProduct !== undefined && <Wrapper>
            <Filtering selectedIdx={setTargetCategory} />
            {filteredProduct && filteredProduct.length === 0 && <NoProducts><p>상품을 준비중입니다😁</p></NoProducts>}
            <ul>
                {myProduct &&
                    filteredProduct &&
                    filteredProduct.map(item => {
                        return <ProductCard key={item.id} data={item} />;
                    })}
            </ul>
            {myProduct && filterPagination && (
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
    width:100%;
    display: flex;
    flex-direction: column;
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

const NoProducts = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &>p{
    background: rgb(189, 170, 170);
    font-size: 17px;
    color: #fff;
    padding: 0.2rem;
    border-radius: 5px;
    font-weight: 600;
  }
`

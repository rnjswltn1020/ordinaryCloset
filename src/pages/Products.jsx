import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getProductsList } from '../api/fbase';
import ProductCard from '../components/ProductCard';

export default function Products() {
    const {
        isLoading,
        error,
        data: products,
    } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProductsList(),
    });
    if (isLoading) return 'Loading....';
    if (error) return '에러가 발생하였습니다.';

    return (
        <Wrapper>
            {products.map(item => {
                return <ProductCard key={item.id} data={item} />;
            })}
        </Wrapper>
    );
}

const Wrapper = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: hidden;
    gap: 10px;
`;

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getProductsList } from '../api/fbase';
import Product from '../components/Product';

export default function Products() {
    const [products, setProducts] = useState([]);
    const setData = () => {
        getProductsList().then(setProducts);
    };

    useEffect(() => {
        setData();
        console.log(products);
    }, []);
    return (
        <Wrapper>
            {products.map(item => {
                return <Product key={item.id} data={item} />;
            })}
        </Wrapper>
    );
}

const Wrapper = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

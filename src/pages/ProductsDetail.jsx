import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '../components/Button';

export default function ProductsDetail() {
    const {
        state: {
            image,
            productName,
            targetGender,
            productDetail,
            productPrice,
            productSizes,
            productOpt,
        },
    } = useLocation();
    const [getSize, setSize] = useState(productSizes[0] || []);
    const handleSelect = e => setSize(e.target.value);

    return (
        <BoxWrapper>
            <p>Category/All/{targetGender}</p>
            <ItemBox>
                <img src={image} alt={productName} />
                <div>
                    <div>
                        <ProductName>{productName}</ProductName>
                    </div>
                    <Row>
                        <span className="label">설명 :</span>
                        <p className="content">{productDetail}</p>
                    </Row>
                    <Row>
                        <span className="label">가격 :</span>
                        <p className="content">{productPrice}원</p>
                    </Row>
                    <Row>
                        <span className="label">사이즈 :</span>
                        <FormControl
                            size="small"
                            fullWidth
                            variant="filled"
                            className="content"
                            sx={{ borderStyle: 'dashed' }}>
                            <Select
                                sx={{
                                    borderStyle: 'dashed',
                                    color: ' #d32f2f;',
                                    borderWidth: '2px',
                                }}
                                size="small"
                                id="productSize"
                                value={getSize}
                                label="상품 사이즈"
                                onChange={handleSelect}>
                                {productSizes &&
                                    productSizes.map(size => {
                                        return (
                                            <MenuItem key={size} value={size}>
                                                {size}
                                            </MenuItem>
                                        );
                                    })}
                            </Select>
                        </FormControl>
                    </Row>
                    {productOpt && (
                        <Row>
                            <span className="label">옵션 :</span>
                            <p className="content">{productOpt}</p>
                        </Row>
                    )}
                    <Button text="장바구니에 추가" />
                </div>
            </ItemBox>
        </BoxWrapper>
    );
}

const BoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ItemBox = styled.section`
    display: flex;

    & > img {
        width: 600px;
    }

    & > div {
        flex: 1;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    @media only screen and (max-width: 768px) {
        flex-direction: column;
        & > img {
            width: 100%;
            padding: 0;
        }
    }
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 0.4rem 0;

    & > .label {
        width: 120px;
    }

    & > .content {
        flex: 1;
    }
`;

const ProductName = styled.span`
    display: inline-block;
    background: #282c34;
    padding: 0.4rem;
    color: #fff;
    border-radius: 5px;
    font-size: 14px;
`;

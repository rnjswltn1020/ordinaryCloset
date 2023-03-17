import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '../components/Input';
import Selectbox from '../components/Selectbox';
import FileUpload from '../components/fileUpload/FileUpload';
import { postProducts } from '../api/fbase';
import { imageUpload } from '../api/imageUpload';

export default function NewProducts() {
    const initialForm = {
        productImage: [],
        productName: '',
        productPrice: '',
        productOpt: '',
        targetGender: 'female',
        productDetail: '',
        productSizes: [],
    };
    const [getProductData, setProductData] = useState(initialForm);
    const [getImageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState();
    const [errors, setErrors] = useState({});

    const selectBoxItems = [
        { label: '여성', value: 'female' },
        { label: '남성', value: 'male' },
        { label: '공용', value: 'genderless' },
    ];

    const validateForm = (product, img) => {
        const checkErrors = {};

        if (!product.productName.length) checkErrors.productName = '상품명을 입력해주세요.';
        if (!product.productPrice.length) checkErrors.productPrice = '상품 가격을 입력해주세요.';
        if (!product.productSizes.length) checkErrors.productSizes = '상품 사이즈를 기입해주세요.';
        if (!product.targetGender) checkErrors.targetGender = '타겟 성별을 선택해주세요.';
        if (!product.productDetail.length) checkErrors.productDetail = '상품설명을 입력해주세요.';
        if (!img.length) checkErrors.productImage = '상품 이미지를 등록해주세요.';

        setErrors(checkErrors);
        if (Object.keys(checkErrors).length) return false;
        return true;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setProductData({ ...getProductData, [name]: value });
    };

    const resetForm = () => {
        setProductData(initialForm);
        setErrors({});
        setImageFile(null);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!validateForm(getProductData, getImageFile)) return;

        if (window.confirm('상품을 등록하시겠습니까?')) {
            setIsLoading(true);
            imageUpload(getImageFile[0].fileObj) //
                .then(imageUrl => {
                    postProducts(
                        { params: getProductData, imageUrl },
                        () => {
                            setSuccess('새상품이 등록되었습니다🌻 ');
                            setTimeout(() => {
                                setSuccess(null);
                                resetForm();
                            }, 4000);
                        },
                        error => {
                            console.log(error);
                        },
                    );
                })
                .finally(() => setIsLoading(false));
        }
    };

    return (
        <>
            <Title>{success !== null ? success : '🥕새상품 등록🌸'}</Title>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}>
                <FileUpload
                    setData={setImageFile}
                    currentImg={getImageFile}
                    error={errors}
                    name="productImage"
                />
                <Input
                    id="productName"
                    label="제품명"
                    placeholder="제품명을 입력해주세요"
                    onChange={handleChange}
                    error={errors}
                    value={getProductData.productName}
                />
                <Input
                    id="productPrice"
                    label="가격"
                    type="number"
                    placeholder="가격을 입력해주세요"
                    onChange={handleChange}
                    error={errors}
                    value={getProductData.productPrice}
                />
                <Selectbox
                    id="targetGender"
                    name="targetGender"
                    defaultValue="female"
                    value={getProductData.targetGender}
                    label="성별"
                    items={selectBoxItems}
                    onChange={handleChange}
                />
                <Input
                    id="productDetail"
                    label="디테일"
                    placeholder="상품의 디테일을 입력해주세요."
                    onChange={handleChange}
                    error={errors}
                    value={getProductData.productDetail}
                />
                <Input
                    id="productSizes"
                    label="상품 사이즈"
                    placeholder="쉼표로 사이즈를 입력해주세요 ex)XS,S,M"
                    onChange={handleChange}
                    error={errors}
                    value={getProductData.productSizes}
                />
                <Input
                    id="productOpt"
                    label="옵션값"
                    placeholder="상품의 옵션값을 입력해주세요."
                    onChange={handleChange}
                    error={errors}
                    value={getProductData.productOpt}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isLoading ? true : false}>
                    {isLoading ? '상품 등록중...' : ' 제품 등록하기🎅'}
                </Button>
            </Box>
        </>
    );
}

const Title = styled.h2`
    font-weight: normal;
    font-size: 15px;
    text-align: center;
`;

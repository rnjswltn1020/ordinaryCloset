import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '../components/Input';
import Selectbox from '../components/Selectbox';
import FileUpload from '../components/fileUpload/FileUpload';

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
    const [getImageFile, setImageFile] = useState([]);
    const [errors, setErrors] = useState({});

    const selectBoxItems = [
        { label: '여성', value: 'female' },
        { label: '남성', value: 'male' },
        { label: '공용', value: 'genderless' },
    ];

    const validateForm = val => {
        const checkErrors = {};

        if (!val.productName.length) checkErrors.productName = '상품명을 입력해주세요.';
        if (!val.productPrice.length) checkErrors.productPrice = '상품 가격을 입력해주세요.';
        if (!val.productSizes.length) checkErrors.productSizes = '상품 사이즈를 기입해주세요.';
        if (!val.targetGender) checkErrors.targetGender = '타겟 성별을 선택해주세요.';
        if (!val.productDetail.length) checkErrors.productDetail = '상품설명을 입력해주세요.';
        if (!val.productImage.length) checkErrors.productImage = '상품 이미지를 등록해주세요.';

        setErrors(checkErrors);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setProductData({ ...getProductData, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        validateForm(getProductData);
    };

    useEffect(() => {
        if (getImageFile.length) {
            setProductData({ ...getProductData, productImage: getImageFile });
        } else {
            setProductData({ ...getProductData, productImage: [] });
        }
    }, [getImageFile]);

    useEffect(() => {
        if (Object.keys(errors).length === 0) console.log(getProductData);
    }, [errors]);

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}>
            <FileUpload setData={setImageFile} error={errors} name="productImage" />
            <Input
                id="productName"
                label="제품명"
                placeholder="제품명을 입력해주세요"
                onChange={handleChange}
                error={errors}
            />
            <Input
                id="productPrice"
                label="가격"
                placeholder="가격을 입력해주세요"
                onChange={handleChange}
                error={errors}
            />
            <Selectbox
                id="targetGender"
                name="targetGender"
                defaultValue="female"
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
            />
            <Input
                id="productSizes"
                label="상품 사이즈"
                placeholder="상품의 사이즈를 입력해주세요."
                onChange={handleChange}
                error={errors}
            />
            <Input
                id="productOpt"
                label="옵션값"
                placeholder="상품의 옵션값을 입력해주세요."
                onChange={handleChange}
                error={errors}
            />
            <Button type="submit" fullWidth variant="contained" size="large">
                제품 등록하기🎅
            </Button>
        </Box>
    );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import ShowFileImage from './ShowFileImage';

export default function FileUpload({ setData, multiple, error, name }) {
    const fileInputRef = useRef(null);
    const [imageFile, setImageFiles] = useState([]);

    const handelClickDelete = number => {
        setImageFiles(imageFile.filter(item => item.number !== number));
    };

    // const throwUpLoadApi = () => {
    //     const formData = new FormData();
    //     imageFile.forEach(item => {
    //         formData.append('images', item.fileObj);
    //     });
    //
    //     // API 전송코드 하단에
    // };

    const uploadFile = () => {
        const { files } = fileInputRef.current;
        if (files && files.length) {
            let imageNum = imageFile.length ? imageFile[imageFile.length - 1].number : 0;
            const imageList = [];

            for (let i = 0; i < files.length; i++) {
                const duplicateName = imageFile.filter(file => {
                    return file.title === files[i].name;
                });

                if (duplicateName.length > 0) {
                    alert('동일한 파일명은 중복해서 첨부 할 수 없습니다.');
                    return;
                }

                imageList.push({
                    title: files[i].name,
                    thumbnail: URL.createObjectURL(files[i]),
                    fileObj: files[i],
                    type: files[i].type.slice(0, 5),
                    number: imageNum + 1,
                });
                imageNum++;
            }
            setImageFiles([...imageFile, ...imageList]);
        }
    };

    const showImage = useMemo(() => {
        return <ShowFileImage data={[...imageFile]} onClickDelete={handelClickDelete} />;
    }, [imageFile]);

    useEffect(() => {
        setData([...imageFile]);
    }, [imageFile, setData]);

    return (
        <ImageFileWrapper>
            <PreviewBox>{showImage}</PreviewBox>
            {multiple || !imageFile.length ? (
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                    <Button variant="contained" component="label">
                        상품 이미지등록 <PhotoCamera />
                        <input
                            ref={fileInputRef}
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                            onChange={uploadFile}
                        />
                    </Button>
                </Stack>
            ) : (
                ''
            )}
            <ErrorMsg>{!imageFile.length && error[name] && error[name]}</ErrorMsg>
        </ImageFileWrapper>
    );
}

const PreviewBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImageFileWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    height: 550px;
`;

const ErrorMsg = styled.p`
    color: #d32f2f;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.66;
    letter-spacing: 0.03333em;
    text-align: center;
`;

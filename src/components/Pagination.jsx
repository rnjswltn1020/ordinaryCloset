import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';

export default function PaginationBox({ data, rowsPerPage, onChangePage, page }) {
    const perPage = rowsPerPage || 9;
    const calcPageCount = () => {
        const totalLen = data.length;
        if (totalLen < perPage) {
            return 1;
        } else {
            return Math.ceil(totalLen / perPage);
        }
    };

    const handlePage = target => {
        onChangePage(target);
    };

    useEffect(() => {
        handlePage(page);
    }, [page]);

    return (
        <Stack
            spacing={2}
            sx={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
            {data.length > 0 && (
                <Pagination
                    page={page}
                    count={calcPageCount()}
                    size="large"
                    onChange={(e, currentPage) => handlePage(currentPage)}
                />
            )}
        </Stack>
    );
}

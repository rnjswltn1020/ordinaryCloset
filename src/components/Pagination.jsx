import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationBox({ data, rowsPerPage, onChangePage }) {
    const perPage = rowsPerPage || 9;
    const calcPageCount = () => {
        const totalLen = data.length;
        if (totalLen < perPage) {
            return 1;
        } else {
            return Math.ceil(totalLen / perPage);
        }
    };
    return (
        <Stack spacing={2}>
            <Pagination count={calcPageCount()} size="large" onChange={onChangePage} />
        </Stack>
    );
}

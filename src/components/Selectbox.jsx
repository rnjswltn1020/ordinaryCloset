import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function Selectbox({ label, id, onChange, items, name, defaultValue, value }) {
    return (
        <FormControl fullWidth>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
                name={name}
                labelId={`${id}-label`}
                id={id}
                label={label}
                onChange={onChange}
                variant="outlined"
                value={value}
                defaultValue={defaultValue}>
                {items &&
                    items.map(el => {
                        return (
                            <MenuItem key={el.value} value={el.value}>
                                {el.label}
                            </MenuItem>
                        );
                    })}
            </Select>
        </FormControl>
    );
}

import TextField from '@mui/material/TextField';

export default function Input({ id, label, placeholder, onChange, error, value, type }) {
    return (
        <TextField
            fullWidth
            size="large"
            name={id}
            id={id}
            label={label}
            placeholder={placeholder}
            inputProps={{ min: 0 }}
            value={value}
            variant="outlined"
            onChange={onChange}
            type={type && type}
            error={error[id] ? true : false}
            minRows="0"
            helperText={error[id] && error[id]}
        />
    );
}

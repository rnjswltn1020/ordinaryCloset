import TextField from '@mui/material/TextField';

export default function Input({ id, label, placeholder, onChange, error }) {
    return (
        <TextField
            fullWidth
            size="large"
            name={id}
            id={id}
            label={label}
            placeholder={placeholder}
            multiline
            variant="outlined"
            onChange={onChange}
            error={error[id] ? true : false}
            helperText={error[id] && error[id]}
        />
    );
}

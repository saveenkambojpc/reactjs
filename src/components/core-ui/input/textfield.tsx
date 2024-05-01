import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

interface TextFieldProps {
  type?: string;
  label: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  disabled?: boolean;
  helperText?: any;
}

const TextField: React.FC<TextFieldProps> = ({
  type,
  label,
  value,
  onChange,
  error = false,
  helperText,
  disabled = false
}) => {
  return (
    <MuiTextField
      fullWidth
      type={type}
      label={label}
      size="small"
      value={value}
      onChange={onChange}
      error={error}
      disabled={disabled}
      helperText={helperText}
    />
  );
};

export default TextField;

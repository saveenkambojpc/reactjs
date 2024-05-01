import { useRef, useState, useEffect } from 'react';
import { palette } from '../../../theme/palette';

interface OtpInputProps {
  length?: number; // Optional length of the OTP (default 4)
  onOtpSubmit: (otp: string) => void; // Function to handle OTP submission
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>(new Array(length));

  useEffect(() => {
    if (inputRefs.current.length > 0) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Validate input as a number
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Allow only one character
    setOtp(newOtp);

    const combinedOtp = newOtp.join('');
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    // Move focus to next input if current field is filled and not the last one
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // Optional: Move focus to previous input if current is empty and not the first one
    if (index > 0 && !otp[index - 1]) {
      const emptyIndex = otp.indexOf('');
      if (emptyIndex !== -1) { // Check if there's an empty field
        inputRefs.current[emptyIndex].focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus(); // Move focus on backspace
    }
  };

  return (
    <div>
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          ref={(input:any) => (inputRefs.current[index] = input)} 
          value={value}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          style={{
            width: 40,
            margin: 5,
            height: 40,
            textAlign: 'center',
            border: `1px solid ${palette.borderColor}`,
            borderRadius: 6,
            outlineColor: palette.primary.main,
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;

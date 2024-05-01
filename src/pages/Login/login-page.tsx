import * as Yup from 'yup';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';

// import { OtpInput } from 'src/components/inputs';
import { toast } from '../../services/toast';
import { baseUrls } from '../../config/baseUrls';
import { useSendOtpMutation, useVerifyOtpMutation } from '../../services/api/authApi';
import { Button, LoadingButton } from '../../components/core-ui/button';
import FormControl from '../../components/core-ui/formik/FormControl';
import { OtpInput } from '../../components/core-ui/input';

// ----------------------------------------------------------------------
interface FormValue {
  // Define your form field names and types here
  username: string;
  password: string;
  // ...other fields
}

export default function LoginView() {
  const navigate = useNavigate();

  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const [showOtpField, setShowOtpField] = useState(false);


  const initialValues: FormValue = {
    username: '',
    password: '',
  };

  const validation = Yup.object({
    username: Yup.string().required('required'),
    password: Yup.string().required('Please enter a password'),
  });

  /**
   * When we want to request the otp
   * @param {obj} values - obj contains username and password  .
   * @returns {void}
   */
  const handleSubmit = (values: FormValue): void => {
    sendOtp(values).then((res: any) => {
      if (res.data) {
        toast('success', res?.data?.message);
        setShowOtpField(true);
        sessionStorage.setItem('token', res.data?.token);
        const decodedString = atob(res.data?.token.split('.')[1]);
        if (decodedString) {
          sessionStorage.setItem('user', JSON.stringify(decodedString))
        }
      } else if (res.error) {
        toast('error', res?.error?.data?.detail[0]?.msg);
      }
    });
  };


  // USERNAME AND PASSWORD FIELD
  const renderForm = (
    <Formik validationSchema={validation} initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Stack spacing={3}>
          <FormControl control="input" label="Username" name="username" type="text" />
          <FormControl control="input" label="Password" name="password" type="password" />

          <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
            <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton loading={isLoading} type='submit'>Submit</LoadingButton>
        </Stack>
      </Form>
    </Formik>
  );

  /**
   * When we submit the login OTP value
   * @param {array} otp - arr of otps.
   * @returns {void}
   */
  const handleOtpSubmit = (otp: any) => {
    verifyOtp({ otp }).then((res: any) => {
      if (res.data) {
        toast('success', 'Successfull login');
        navigate('/');
        // new token store to browser storage
        sessionStorage.setItem('token', res.data?.token);

        // todo we have to store the user obj in session storage
      } else if (res.error) {
        toast('error', 'Incorrect Otp');
      }
    });
  };

  /* Single Sign on Button Blick
  * @returns {void}
  */
  const loginUsingSsoButtonClick = () => {
    window.location.href = baseUrls.development.concat('/signin')
  };

  // OTP FIELD DESIGN
  const renderOtpField = (
    <Stack gap={1}>
      <Typography variant="body1" color="muted">
        We have sent a verfication code to your email
      </Typography>
      <Stack alignItems="center">
        <OtpInput length={6} onOtpSubmit={handleOtpSubmit} />
      </Stack>
      <Stack mt={3} gap={1}>
        {/* <Button fullWidth variant="outlined">
          Back
        </Button> */}
        <Button fullWidth variant="contained">
          Verify
        </Button>
        <Button onClick={() => setShowOtpField(false)} fullWidth variant="outlined">
          Back
        </Button>
      </Stack>
    </Stack>
  );

  // COMPONENT RETURN
  return (
    <Box
      sx={{
        height: 1,
      }}
    >


      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to GMR</Typography>

          <Box sx={{ mt: 2, mb: 5 }}>
            {!showOtpField ? (
              <Box>
                <Box>{renderForm}</Box>
                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    OR
                  </Typography>
                </Divider>

                <Box>
                  <Button fullWidth variant="contained" onClick={loginUsingSsoButtonClick}>
                    Login using SSO
                  </Button>
                </Box>
              </Box>
            ) : (
              renderOtpField
            )}
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}

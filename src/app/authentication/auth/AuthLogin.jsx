import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  IconButton,
  TextField
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '@/services/UserService';

const userSchema = yup.object({
  email: yup
    .string()
    .email('Цахим шуудангийн хаягаа зөв бичнэ үү')
    .required('Цахим шуудангийн хаягаа оруулна уу'),
  password: yup.string().required('Нууц үгээ оруулна уу')
});

const AuthLogin = ({ title, subtitle, subtext }) => {
  const formik = useFormik({
    initialValues: {
      email: 'admin@demo.com',
      password: '123123'
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      const data = await loginUser(email, password);
      if (data.status === 200) {
        toast.success(data.message);
        localStorage.setItem('PSA-USER', JSON.stringify(data.result));
        localStorage.setItem(
          'PSA-ADMIN',
          JSON.stringify({
            data: '',
            name: 'admin'
          })
        );
        window.location.href = '/';
      } else {
        toast.error(data.message);
      }
    },
    enableReinitialize: true
  });

  return (
    <Box sx={{ width: '100%', maxWidth: 'sm', mx: 'auto' }}>
      {title && (
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          fontWeight="bold"
        >
          {title}
        </Typography>
      )}

      {subtext && (
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          sx={{ mb: 3 }}
        >
          {subtext}
        </Typography>
      )}
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Цахим шуудангийн хаяг"
            name="email"
            type="email"
            value={formik.values.email.toLowerCase()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Нууц үг"
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Нэвтрэх
          </Button>
        </Stack>
      </form>

      {subtitle && <Box sx={{ mt: 3, textAlign: 'center' }}>{subtitle}</Box>}
    </Box>
  );
};

export default AuthLogin;

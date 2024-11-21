import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    Card,
    CardContent,
    Container,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { createUser } from "@/services/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userSchema = yup.object({
    fname: yup.string().required("Нэрээ бичнэ үү"),
    phone: yup.string().required("Утасны дугаараа бичнэ үү"),
    email: yup
        .string()
        .email("Цахим шуудангийн хаягаа зөв бичнэ үү")
        .required("Цахим шуудангийн хаягаа оруулна уу"),
    password: yup.string().required("Нууц үгээ оруулна уу"),
});

const AuthRegister = ({ title, subtitle, subtext }) => {
    const formik = useFormik({
        initialValues: {
            fname: "",
            email: "",
            phone: "",
            password: "",
        },
        validationSchema: userSchema,
        onSubmit: async (values) => {
            const data = await createUser(values);
            if (data.status === 200) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        },
        enableReinitialize: true,
    });

    return (
        <Box sx={{ width: "100%", maxWidth: "sm", mx: "auto" }}>
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
                        id="fname"
                        label="Нэвтрэх нэр"
                        name="fname"
                        value={formik.values.fname.toLowerCase()}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.fname && Boolean(formik.errors.fname)
                        }
                        helperText={formik.touched.fname && formik.errors.fname}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="phone"
                        label="Утасны дугаар"
                        name="phone"
                        type="tel"
                        value={formik.values.phone}
                        onChange={(e) => {
                            const reg = new RegExp("[a-z]");
                            if (reg.test(e.target.value)) {
                                return e.preventDefault();
                            }
                            formik.handleChange(e);
                        }}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.phone && Boolean(formik.errors.phone)
                        }
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
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
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
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
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        size="large"
                        variant="contained"
                        sx={{ mt: 3 }}
                    >
                        Бүртгүүлэх
                    </Button>
                </Stack>
            </form>

            {subtitle && (
                <Box sx={{ mt: 3, textAlign: "center" }}>{subtitle}</Box>
            )}
        </Box>
    );
};

export default AuthRegister;

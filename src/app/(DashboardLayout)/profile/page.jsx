"use client";
import {
    Box,
    Button,
    TextField,
    Stack,
    Card,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Grid } from "@mui/system";
import React from "react";
import { updateUser } from "@/services/UserService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userSchema = yup.object({
    fname: yup.string().required("Нэрээ бичнэ үү"),
    phone: yup.string()
        .required("Утасны дугаараа бичнэ үү")
        .matches(/^[0-9-]*$/, 'Зөвхөн тоо оруулна уу'),
    email: yup
        .string()
        .email("Цахим шуудангийн хаягаа зөв бичнэ үү")
        .required("Цахим шуудангийн хаягаа оруулна уу"),
});

const Profile = () => {
    const [user, setUser] = React.useState();
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = localStorage.getItem("PSA-USER");
            if (storage) {
                console.log(JSON.parse(storage));
                setUser(JSON.parse(storage));
            }
            else{
                window.location.href = "/";
            }
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            fname: user?.fname || "",
            lname: user?.lname || "",
            email: user?.email || "",
            phone: user?.phone || "",
            address: user?.address || "",
        },
        validationSchema: userSchema,
        onSubmit: async (values) => {
            const data = await updateUser({
                user_id: user.user_id,
                fname: values.fname,
                lname: values.lname,
                email: values.email,
                phone: values.phone,
                address: values.address,
            });
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
            } else {
                toast.error(data.message);
            }
        },
        enableReinitialize: true,
    });
    
    return (
        <PageContainer title="Profile" description="this is Profile page">
            <Grid
                container
                spacing={0}
                justifyContent="center"
                sx={{ height: "50vh" }}
            >
                <Card
                    elevation={9}
                    sx={{
                        p: 4,
                        zIndex: 1,
                        width: "100%",
                        maxWidth: "500px",
                    }}
                >
                <Typography
                    variant="h3"
                    component="h1"
                    align="center"
                    gutterBottom
                >
                    Хувийн мэдээлэл
                </Typography>
                <ToastContainer />
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="lname"
                            label="Овог"
                            name="lname"
                            value={formik.values.lname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="fname"
                                label="Нэр"
                                name="fname"
                                value={formik.values.fname}
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
                                id="address"
                                label="Хаяг"
                                name="address"
                                value={formik.values.address.toLowerCase()}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                size="large"
                                variant="contained"
                                sx={{ mt: 3 }}
                            >
                                Хадгалах
                            </Button>
                        </Stack>
                    </form>
                </Card>
            </Grid>
        </PageContainer>
    );
};

export default Profile;

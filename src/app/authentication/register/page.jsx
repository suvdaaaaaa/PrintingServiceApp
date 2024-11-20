"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Card, Typography, Grid, Stack, Link } from "@mui/material";
import AuthRegister from "../auth/AuthRegister";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// import { createUser } from "@/services/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register2 = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (data) => {
        setLoading(true);
        setError(null);
        try {
            // const response = await createUser(data);

            console.log("response", response);

            if (response.status === 200) {
                toast.success(response.result);
                router.push("/authentication/login");
            } else if (response.status === 409) {
                toast.error(response.result);
            } else {
                toast.error(
                    response.message || "An error occurred while registering."
                );
            }
        } catch (err) {
            console.error("Error creating user:", err);
            toast.error(err.message || "Failed to register user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer title="Register" description="this is Register page">
            <ToastContainer />
            <Box
                sx={{
                    position: "relative",
                    "&:before": {
                        content: '""',
                        background:
                            "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
                        backgroundSize: "400% 400%",
                        animation: "gradient 15s ease infinite",
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        opacity: "0.3",
                        zIndex: 0,
                    },
                }}
            >
                <Grid
                    container
                    spacing={0}
                    justifyContent="center"
                    sx={{ height: "100vh" }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={4}
                        xl={3}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
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
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Logo />
                            </Box>

                            <AuthRegister
                                onRegister={handleRegister}
                                loading={loading}
                                subtext={
                                    <Typography
                                        variant="subtitle1"
                                        textAlign="center"
                                        color="textSecondary"
                                        mb={1}
                                    >
                                        Та мэдээллээ үнэн зөв оруулна уу!
                                    </Typography>
                                }
                                subtitle={
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                        spacing={1}
                                        mt={3}
                                    >
                                        <Typography
                                            color="textSecondary"
                                            variant="h6"
                                            fontWeight="400"
                                        >
                                            Бүртгэлтэй бол
                                        </Typography>
                                        <Typography
                                            component={Link}
                                            href="/authentication/login"
                                            fontWeight="500"
                                            sx={{
                                                textDecoration: "none",
                                                color: "primary.main",
                                            }}
                                        >
                                            Нэвтрэх
                                        </Typography>
                                    </Stack>
                                }
                            />

                            {error && (
                                <Typography
                                    color="error"
                                    align="center"
                                    sx={{ mt: 2 }}
                                >
                                    {error}
                                </Typography>
                            )}
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Register2;

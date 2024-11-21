"use client";
import { Box, Card, Typography, Grid, Stack, Link } from "@mui/material";
import AuthRegister from "../auth/AuthRegister";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// import { createUser } from "@/services/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register2 = () => {
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
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Register2;

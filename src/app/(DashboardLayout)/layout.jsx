"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";

const MainWrapper = styled("div")(() => ({
    display: "flex",
    minHeight: "100vh",
    width: "100%",
}));

const PageWrapper = styled("div")(() => ({
    display: "flex",
    flexGrow: 1,
    paddingBottom: "60px",
    flexDirection: "column",
    zIndex: 1,
    backgroundColor: "transparent",
}));

export default function RootLayout({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
     const [user, setUser] = React.useState(null);
     React.useEffect(() => {
         if (typeof window !== 'undefined') {
             const storage = localStorage.getItem('PSA-USER');
             if (storage) {
                 console.log(JSON.parse(storage));
                 setUser(JSON.parse(storage));
             }
         }
     }, []);
    return (
        <MainWrapper className="mainwrapper">
        {user?.role === 1 && (
            <>
                {/* ------------------------------------------- */}
                {/* Sidebar */}
                {/* ------------------------------------------- */}
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    onSidebarClose={() => setMobileSidebarOpen(false)}
                />
            </>
        )}
            {/* ------------------------------------------- */}
            {/* Main Wrapper */}
            {/* ------------------------------------------- */}
            <PageWrapper className="page-wrapper">
                {/* ------------------------------------------- */}
                {/* Header */}
                {/* ------------------------------------------- */}
                <Header
                    toggleMobileSidebar={() => setMobileSidebarOpen(true)}
                />
                {/* ------------------------------------------- */}
                {/* PageContent */}
                {/* ------------------------------------------- */}
                <Container
                    sx={{
                        paddingTop: "20px",
                        // maxWidth: "1200px",
                    }}
                >
                    {/* ------------------------------------------- */}
                    {/* Page Route */}
                    {/* ------------------------------------------- */}
                    <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
                        {children}
                    </Box>
                    {/* ------------------------------------------- */}
                    {/* End Page */}
                    {/* ------------------------------------------- */}
                </Container>
            </PageWrapper>
        </MainWrapper>
    );
}

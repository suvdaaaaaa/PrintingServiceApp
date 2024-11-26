"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Suspense } from "react";
import Editor from "@/app/(DashboardLayout)/components/editor/editor";
import { useParams } from "next/navigation";

const DashboardTemplatePage = () => {
    const params = useParams();
    const [user, setUser] = useState(null);
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = localStorage.getItem("PSA-USER");
            if (storage) {
                console.log("S", storage);
                setUser(JSON.parse(storage));
            } else {
                window.location.href = "/";
            }
        }
    }, []);

    return (
        <Box>
            <Suspense fallback={<div>Loading...</div>}>
                <Editor user={user} id={params.id} />
            </Suspense>
        </Box>
    );
};

export default DashboardTemplatePage;

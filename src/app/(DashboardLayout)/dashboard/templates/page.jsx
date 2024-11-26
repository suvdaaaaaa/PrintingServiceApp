"use client";
import React, { useEffect, useState } from "react";
import TemplateList from "@/app/(DashboardLayout)/components/template/templates";
import { getTemplates } from "@/services/TemplateService";
import { Box } from "@mui/material";

import { Suspense } from "react";

const TemplatePage = ({ searchParams }) => {
    const [user, setUser] = useState(null);
    const [tempData, setTempData] = useState([]);
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = localStorage.getItem("PSA-USER");
            if (storage) {
                console.log(JSON.parse(storage));
                setUser(JSON.parse(storage));
            } else {
                window.location.href = "/";
            }
        }
    }, []);

    useEffect(() => {
        async function fetchTemplates() {
            try {
                const data = await getTemplates();
                setTempData(data);
            } catch (error) {
                console.error("Error fetching templates:", error);
            }
        }
        fetchTemplates();
    }, []);

    return (
        <Box>
            <Suspense fallback={<div>Loading...</div>}>
                <TemplateList temp={tempData} user={user} />
            </Suspense>
        </Box>
    );
};

export default TemplatePage;

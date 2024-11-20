"use client";
import React from "react";
import TemplateList from "../components/template/templates";
import { getTemplates } from "@/services/TemplateService";
import { Box } from "@mui/material";

import { Suspense } from "react";

const TemplatePage = ({ searchParams }) => {
    const [user, setUser] = React.useState(null);
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

    const tempData = getTemplates();

    // console.log({tempData});

    return (
        <Box>
            <Suspense fallback={<div>Loading...</div>}>
                <TemplateList temp={tempData} />
            </Suspense>
        </Box>
    );
};

export default TemplatePage;

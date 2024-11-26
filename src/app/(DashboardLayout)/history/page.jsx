"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { Suspense } from "react";
import { getMaterials } from "@/services/MaterialService";
import OrderList from "../components/history/history";

const HistoryPage = ({ searchParams }) => {
    const [user, setUser] = useState(null);
    const [orderData, setOrderData] = useState([]);
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
        async function fetchOrder() {
            try {
                const data = await getMaterials();
                setOrderData(data);
            } catch (error) {
                console.error("Error fetching templates:", error);
            }
        }
        fetchOrder();
    }, []);

    return (
        <Box>
            <Suspense fallback={<div>Loading...</div>}>
                <OrderList order={orderData} />
            </Suspense>
        </Box>
    );
};

export default HistoryPage;

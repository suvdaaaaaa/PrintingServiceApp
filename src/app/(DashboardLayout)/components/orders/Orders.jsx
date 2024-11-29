"use client"
import {
    Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, Pagination
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import { getMaterialList } from "@/services/MaterialService";
import React, { useEffect, useState } from 'react';

const OrderList = () => {
    const [user, setUser] = useState(null);
    const [orderData, setOrderData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const rowsPerPage = 10; 

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = localStorage.getItem("PSA-USER");
            if (storage) {
                setUser(JSON.parse(storage));
            } else {
                window.location.href = "/";
            }
        }
    }, []);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await getMaterialList();
                setOrderData(data);
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        }
        fetchOrders();
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    
    const paginatedData = orderData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <DashboardCard title="Сүүлийн үеийн захиалга">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    #
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Нэр
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Утас
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Имэйл
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Загвар
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Илгээсэн огноо
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Цаасны төрөл
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Ширхэг
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Үнэ
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Төлөв
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData && paginatedData.length > 0 ? (
                            paginatedData.map((orders, index) => (
                                <TableRow key={orders.material_id}>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "13px"}}>
                                            {(currentPage - 1) * rowsPerPage + index + 1}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {orders.fname}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {orders.phone}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {orders.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {orders.file_name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {orders.createddate}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {orders.paper_type}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {orders.quantity}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {orders.total_price}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: "info.main",
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label={orders.status_name}
                                        ></Chip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <Typography>Захиалга байхгүй байна.</Typography>
                        )}
                    </TableBody>
                </Table>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                    count={Math.ceil(orderData.length / rowsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </DashboardCard>
    );
};

export default OrderList;

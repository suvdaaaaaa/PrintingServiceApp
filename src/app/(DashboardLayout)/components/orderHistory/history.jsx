import React from "react";
import Link from "next/link";
import { CardContent, Typography, Grid, Avatar } from "@mui/material";
import { Stack } from "@mui/system";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import DashboardCard from "../shared/DashboardCard";

const OrderList = ({order}) => {

    return (
        <DashboardCard title="Захиалгын түүх">
            <Grid container spacing={3}>
                {order && order.length > 0 ? (
                    order.map((ord) => (
                        <Grid
                            item
                            xs={12}
                            md={3}
                            lg={4}
                            key={ord.material_id}
                        >
                            <BlankCard>
                                <Link
                                    // href={`/templates/${template.template_id}`}
                                >
                                    <Avatar
                                        src={ord.file_url}
                                        alt={ord.file_name}
                                        variant="square"
                                        sx={{
                                            height: 230,
                                            width: "100%",
                                        }}
                                    />
                                </Link>
                                <CardContent sx={{ p: 3, pt: 2 }}>
                                    <Typography variant="h6">
                                        {ord.file_name}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        mt={1}
                                    >
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                        >
                                            <Typography variant="h6">
                                                {ord.total_price}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </BlankCard>
                        </Grid>
                    ))
                ) : (
                    <Typography>Захиалга хийгээгүй байна.</Typography>
                )}
            </Grid>
        </DashboardCard>
    );
};

export default OrderList;

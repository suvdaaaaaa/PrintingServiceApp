import React from "react";
import Link from "next/link";
import { CardContent, Typography, Grid, Avatar } from "@mui/material";
import { Stack } from "@mui/system";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import DashboardCard from "../shared/DashboardCard";

const TemplateList = ({ temp }) => {
    // console.log({temp});

    return (
        <DashboardCard title="Нэрийн хуудасны загварууд">
            <Grid container spacing={3}>
                {temp && temp.length > 0 ? (
                    temp.map((template) => (
                        <Grid
                            item
                            xs={12}
                            md={3}
                            lg={4}
                            key={template.template_id}
                        >
                            <BlankCard>
                                <Link
                                    href={`/templates/${template.template_id}`}
                                >
                                    <Avatar
                                        src={template.image_url}
                                        alt={template.template_name}
                                        variant="square"
                                        sx={{
                                            height: 230,
                                            width: "100%",
                                        }}
                                    />
                                </Link>
                                <CardContent sx={{ p: 3, pt: 2 }}>
                                    <Typography variant="h6">
                                        {template.template_name}
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
                                                {template.price}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </BlankCard>
                        </Grid>
                    ))
                ) : (
                    <Typography>Бэлэн загвар байхгүй байна.</Typography>
                )}
            </Grid>
        </DashboardCard>
    );
};

export default TemplateList;

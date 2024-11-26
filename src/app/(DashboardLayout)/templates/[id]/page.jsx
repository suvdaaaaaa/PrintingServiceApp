"use client";
import React from "react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import BusinessCardEditor from "@/app/(DashboardLayout)/components/canvas/canvas";
import { useParams } from "next/navigation";

const TemplateDetail = () => {
    const params = useParams();
    return <BusinessCardEditor id={params.id} />;
};

export default TemplateDetail;

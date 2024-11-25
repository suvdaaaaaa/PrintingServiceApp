import React, { useEffect, useState } from "react";
import DashboardCard from "../shared/DashboardCard";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
    TextField,
    Typography,
    IconButton,
} from "@mui/material";
import { createMaterial } from "@/services/MaterialService";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = yup.object({
    // side: yup.string().required("Талаа оруулна уу"),
    // quantity: yup.string().required("Ширхэгээ оруулна уу"),
    // material: yup.string().required("Цаасны төрлөө оруулна уу"),
    file_url: yup.mixed().required("Файлаа оруулна уу"),
});

export default function FormsOrder() {
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = localStorage.getItem("PSA-USER");
            if (storage) {
                console.log(JSON.parse(storage));
                setUser(JSON.parse(storage));
            }
        }
    }, []);
    const [isFormVisible, setIsFormVisible] = useState(true);
    const formik = useFormik({
        initialValues: {
            side: 2,
            quantity: 50,
            paper_type: "Mat",
            description: "",
            file_url: null,
            total_price: 0,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("file", values.file_url);

            const file = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const fileRes = await file.json();

            const data = await createMaterial({
                user_id: user.user_id,
                side: values.side,
                quantity: +values.quantity,
                paper_type: values.paper_type,
                description: values.description,
                file_url: fileRes.result,
                total_price: values.total_price,
            });

            if (data.status === 200) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        },
        enableReinitialize: true,
    });

    const handleFileChange = (event) => {
        const file = event.currentTarget.files
            ? event.currentTarget.files[0]
            : null;
        formik.setFieldValue("file_url", file);
    };

    const calculatePrice = (values) => {
        const basePrice = 10000;
        const quantityMultiplier = Number(values.quantity) / 50;
        const materialMultiplier = values.paper_type === "Mat" ? 1 : 1.2;
        return basePrice * quantityMultiplier * materialMultiplier;
    };

    useEffect(() => {
        const calculatedPrice = calculatePrice(formik.values);
        formik.setFieldValue("total_price", calculatedPrice);
    }, [formik.values.quantity, formik.values.paper_type]);

    const closeForm = () => {
        formik.resetForm();
        setIsFormVisible(false);
    };

    if (!isFormVisible) {
        return null;
    }

    return (
        <DashboardCard title="Өөрийн загвараа оруулна уу">
            <ToastContainer />
            <form onSubmit={formik.handleSubmit}>
                <IconButton
                    onClick={closeForm}
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        zIndex: 10,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <FormControl
                    fullWidth
                    margin="normal"
                    error={formik.touched.side && Boolean(formik.errors.side)}
                >
                    <InputLabel>Тал</InputLabel>
                    <Select
                        id="side"
                        name="side"
                        value={formik.values.side}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Side"
                    >
                        <MenuItem value="2">2</MenuItem>
                    </Select>
                    {formik.touched.side && formik.errors.side && (
                        <div style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.side}
                        </div>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    margin="normal"
                    error={
                        formik.touched.quantity &&
                        Boolean(formik.errors.quantity)
                    }
                >
                    <InputLabel>Ширхэг</InputLabel>
                    <Select
                        id="quantity"
                        name="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Quantity"
                    >
                        <MenuItem value="50">50</MenuItem>
                        <MenuItem value="100">100</MenuItem>
                        <MenuItem value="200">200</MenuItem>
                    </Select>
                    {formik.touched.quantity && formik.errors.quantity && (
                        <div style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.quantity}
                        </div>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    margin="normal"
                    error={
                        formik.touched.paper_type &&
                        Boolean(formik.errors.paper_type)
                    }
                >
                    <InputLabel>Цаасны төрөл</InputLabel>
                    <Select
                        id="paper_type"
                        name="paper_type"
                        value={formik.values.paper_type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Paper Type"
                    >
                        <MenuItem value="Mat">Матт цаас</MenuItem>
                        <MenuItem value="White">Extra white</MenuItem>
                        <MenuItem value="Matte Gloss">
                            Матт цаас + Матт бүрэлттэй
                        </MenuItem>
                        <MenuItem value="Soft Gloss">
                            Матт цаас + Зөөлөн бүрэлттэй
                        </MenuItem>
                        <MenuItem value="Gloss">
                            Матт цаас + Гялгар бүрэлттэй
                        </MenuItem>
                    </Select>
                    {formik.touched.paper_type && formik.errors.paper_type && (
                        <div style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.paper_type}
                        </div>
                    )}
                </FormControl>

                <TextField
                    fullWidth
                    margin="normal"
                    id="description"
                    name="description"
                    label="Тайлбар"
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                        formik.touched.description && formik.errors.description
                    }
                />

                <FormControl
                    fullWidth
                    margin="normal"
                    error={
                        formik.touched.file_url &&
                        Boolean(formik.errors.file_url)
                    }
                >
                    <InputLabel>Файл оруулах</InputLabel>
                    <input
                        id="file_url"
                        name="file_url"
                        type="file_url"
                        onChange={handleFileChange}
                        onBlur={formik.handleBlur}
                        style={{ display: "none" }}
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        component="label"
                        sx={{ width: "100%", height: "56px", marginTop: 2 }}
                    >
                        Choose file
                        <input hidden type="file" onChange={handleFileChange} />
                    </Button>
                    {formik.touched.file_url && formik.errors.file_url && (
                        <div style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.file_url}
                        </div>
                    )}
                </FormControl>

                <Typography variant="h4" color="primary" sx={{ mt: 2 }}>
                    Үнэ: {formik.values.total_price.toFixed(2)} ₮
                </Typography>

                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{ mt: 2 }}
                >
                    Захиалах
                </Button>
            </form>
        </DashboardCard>
    );
}

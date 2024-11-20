import React from "react";
import DashboardCard from "../shared/DashboardCard";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, MenuItem, Select, InputLabel, FormControl, Box, TextField } from "@mui/material";

const validationSchema = yup.object({
  side: yup.string().required("Side is required"),
  quantity: yup.string().required("Quantity is required"),
  material: yup.string().required("Material is required"),
  file: yup.mixed().required("File is required"),
});

export default function FormsOrder() {
  const formik = useFormik({
    initialValues: {
      side: "2", 
      quantity: "50",
      material: "Mat",
      description: "",
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
    formik.setFieldValue("file", file);
  };

  return (
    <DashboardCard title="Upload your own design">
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
        {/* Side Field */}
        <FormControl fullWidth margin="normal" error={formik.touched.side && Boolean(formik.errors.side)}>
          <InputLabel id="side-label">Тал</InputLabel>
          <Select
            labelId="side-label"
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
            <div style={{ color: "red", fontSize: "12px" }}>{formik.errors.side}</div>
          )}
        </FormControl>

        {/* Quantity Field */}
        <FormControl fullWidth margin="normal" error={formik.touched.quantity && Boolean(formik.errors.quantity)}>
          <InputLabel id="quantity-label">Ширхэг</InputLabel>
          <Select
            labelId="quantity-label"
            id="quantity"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Quantity"
          >
            <MenuItem value="50">50</MenuItem>
            <MenuItem value="75">75</MenuItem>
            <MenuItem value="100">100</MenuItem>
          </Select>
          {formik.touched.quantity && formik.errors.quantity && (
            <div style={{ color: "red", fontSize: "12px" }}>{formik.errors.quantity}</div>
          )}
        </FormControl>

        {/* Material Field */}
        <FormControl fullWidth margin="normal" error={formik.touched.material && Boolean(formik.errors.material)}>
          <InputLabel id="material-label">Цаасны төрөл</InputLabel>
          <Select
            labelId="material-label"
            id="material"
            name="material"
            value={formik.values.material}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Material"
          >
            <MenuItem value="Mat">Матт цаас</MenuItem>
            <MenuItem value="White">Extra white</MenuItem>
            <MenuItem value="Matte Gloss">Матт цаас + Матт бүрэлттэй</MenuItem>
            <MenuItem value="Soft Gloss">Матт цаас + Зөөлөн бүрэлттэй</MenuItem>
            <MenuItem value="Gloss">Матт цаас + Гялгар бүрэлттэй</MenuItem>
          </Select>
          {formik.touched.material && formik.errors.material && (
            <div style={{ color: "red", fontSize: "12px" }}>{formik.errors.material}</div>
          )}
        </FormControl>

        {/* Description Field */}
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
          helperText={formik.touched.description && formik.errors.description}
        />

        {/* File Upload Field */}
        <FormControl fullWidth margin="normal" error={formik.touched.file && Boolean(formik.errors.file)}>
          <InputLabel id="file-label">Файл оруулах</InputLabel>
          <input
            id="file"
            name="file"
            type="file"
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
          {formik.touched.file && formik.errors.file && (
            <div style={{ color: "red", fontSize: "12px" }}>{formik.errors.file}</div>
          )}
        </FormControl>

        {/* Submit Button */}
        <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
          Захиалах
        </Button>
      </Box>
    </DashboardCard>
  );
}

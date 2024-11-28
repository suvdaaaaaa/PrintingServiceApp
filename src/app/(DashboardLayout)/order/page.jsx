'use client';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  Modal,
  DialogTitle,
  DialogContent,
  Dialog,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Image from 'next/image';
import { createMaterial } from '@/services/MaterialService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const validationSchema = yup.object({
  // side: yup.string().required("Талаа оруулна уу"),
  // quantity: yup.string().required("Ширхэгээ оруулна уу"),
  // material: yup.string().required("Цаасны төрлөө оруулна уу"),
  file_url: yup.mixed().required('Файлаа оруулна уу')
});

export default function Order() {
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = React.useState(null);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleClose = () => {
    setModal(false);
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem('PSA-USER');
      if (storage) {
        console.log(JSON.parse(storage));
        setUser(JSON.parse(storage));
      }
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      side: 2,
      quantity: 50,
      paper_type: 'Mat',
      description: '',
      file_url: null,
      total_price: 0
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      setModal(true);
    },
    enableReinitialize: true
  });

  const PaymentButton = ({ img, name }) => {
    return (
      <Box
        sx={{
          padding: 2,
          width: 120,
          border: '1px solid #dedede',
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          cursor: 'pointer'
        }}
        onClick={async () => {
          const formData = new FormData();
          formData.append('file', formik.values.file_url);

          const file = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          });
          const fileRes = await file.json();

          const data = await createMaterial({
            user_id: user.user_id,
            template_id: 11,
            material_type: 1,
            side: formik.values.side,
            quantity: +formik.values.quantity,
            paper_type: formik.values.paper_type,
            description: formik.values.description,
            file_name: 'Upload',
            file_url: fileRes.result,
            total_price: formik.values.total_price
          });

          console.log('dataa', data);

          setModal(false);

          if (data.status === 200) {
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        }}
      >
        <Image src={img} alt={name} height={80} width={80} />
        <Typography variant="h6">{name}</Typography>
      </Box>
    );
  };

  const handleFileChange = (event) => {
    const file = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      formik.setFieldValue('file_url', file);
    }
  };

  const calculatePrice = (values) => {
    const basePrice = 10000;
    const quantityMultiplier = Number(values.quantity) / 50;
    const materialMultiplier = values.paper_type === 'Mat' ? 1 : 1.2;
    return basePrice * quantityMultiplier * materialMultiplier;
  };

  useEffect(() => {
    const calculatedPrice = calculatePrice(formik.values);
    formik.setFieldValue('total_price', calculatedPrice);
  }, [formik.values.quantity, formik.values.paper_type]);

  const closeForm = () => {
    formik.resetForm();
    setIsFormVisible(false);
  };

  if (!isFormVisible) {
    return null;
  }

  return (
    <DashboardCard
      title="Нэрийн хуудасны захиалга"
      action={
        <Button
          href="/templates"
          variant="contained"
          sx={{ color: 'white', backgroundColor: 'green' }}
          startIcon={<CloudDownloadIcon />}
        >
          Загвараас сонгох
        </Button>
      }
    >
      <Box
        sx={{
          position: 'relative',
          height: '80vh',
          overflowY: 'scroll',
          padding: 2,
          borderRadius: 2,
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        {/* <IconButton
          onClick={closeForm}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 10,
            color: 'gray'
          }}
        >
          <CloseIcon />
        </IconButton> */}
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Өөрийн загвараа оруулна уу!
        </Typography>
        <ToastContainer />
        <form onSubmit={formik.handleSubmit}>
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
              <div style={{ color: 'red', fontSize: '12px' }}>
                {formik.errors.side}
              </div>
            )}
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
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
              <div style={{ color: 'red', fontSize: '12px' }}>
                {formik.errors.quantity}
              </div>
            )}
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            error={
              formik.touched.paper_type && Boolean(formik.errors.paper_type)
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
              <MenuItem value="Gloss">Матт цаас + Гялгар бүрэлттэй</MenuItem>
            </Select>
            {formik.touched.paper_type && formik.errors.paper_type && (
              <div style={{ color: 'red', fontSize: '12px' }}>
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
            helperText={formik.touched.description && formik.errors.description}
          />

          <FormControl
            fullWidth
            margin="normal"
            error={formik.touched.file_url && Boolean(formik.errors.file_url)}
          >
            <InputLabel>Файл оруулах</InputLabel>
            <input
              id="file_url"
              name="file_url"
              type="file_url"
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
              style={{ display: 'none' }}
            />
            <Button
              variant="outlined"
              color="primary"
              component="label"
              sx={{ width: '100%', height: '56px', marginTop: 2 }}
            >
              Choose file
              <input hidden type="file" onChange={handleFileChange} />
            </Button>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                mt: 2
              }}
            >
              {selectedImage && (
                <Image
                  src={selectedImage}
                  width={600}
                  height={300}
                  alt="Сонгосон зураг"
                />
              )}
            </Box>
            {formik.touched.file_url && formik.errors.file_url && (
              <div style={{ color: 'red', fontSize: '12px' }}>
                {formik.errors.file_url}
              </div>
            )}
          </FormControl>

          <Typography variant="h4" color="error" sx={{ mt: 2 }}>
            Нийт үнэ: {formik.values.total_price.toFixed(2)} ₮
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
      </Box>
      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={modal}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Төлбөр төлөх
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500]
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography variant="h3" component="h1" align="center" gutterBottom>
              Төлбөрийн хэрэгсэл сонгоно уу
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ mt: 5, mb: 5 }}
            >
              <PaymentButton img="/images/logos/qpay.jpeg" name="Qpay" />
              <PaymentButton
                img="/images/logos/social-pay.png"
                name="Social Pay"
              />
              <PaymentButton
                img="/images/logos/bank-card.png"
                name="Банкны карт"
              />
            </Stack>
            <Typography variant="h3" component="h1" align="center" gutterBottom>
              Төлөх дүн: {formik.values.total_price}₮
            </Typography>
          </DialogContent>
        </BootstrapDialog>
      </React.Fragment>
    </DashboardCard>
  );
}

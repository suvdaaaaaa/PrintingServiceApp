'use client';
import React, { useEffect } from 'react';
import { Box, Button, Stack, Typography, Modal } from '@mui/material';
import ImageListHome from '@/app/(DashboardLayout)/components/imagesDashboard/ImageList';
import Link from 'next/link';
import { Grid, keyframes } from '@mui/system';
import FormsOrder from '@/app/(DashboardLayout)/components/formsUpload/forms';
import { useState } from 'react';
import MSidebar from '@/app/(DashboardLayout)/layout/sidebar/Sidebar';
import Orders from '@/app/(DashboardLayout)/components/orders/Orders';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const glowingAnimation = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const Dashboard = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem('PSA-USER');
      if (storage) {
        console.log(JSON.parse(storage));
        setUser(JSON.parse(storage));
      }
    }
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  const [showFormsOrder, setShowFormsOrder] = useState(false);

  const handleUploadClick = () => {
    setShowFormsOrder(true);
  };

  const handleClose = () => {
    setShowFormsOrder(false);
  };

  if (user && user.role == 1) {
    return loading ? (
      <div>Loading...</div>
    ) : (
      <Grid container spacing={2}>
        <MSidebar />
        <Orders />
      </Grid>
    );
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
        gap: { xs: 4, sm: 8, md: 20 },
        p: 3,
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(circle at center, #03122F, #19305C, #413B61, #AE7DAC, #F1916D)',
          // 'radial-gradient(circle at center, #F1916D, #F3DADF, #AE7DAC, #413B61, #19305C, #03122F)',
          backgroundSize: '400% 400%',
          animation: `${gradientAnimation} 60s ease infinite`,
          zIndex: -1
        }
      }}
    >
      <Box
        sx={{
          flex: '1 1 auto',
          maxWidth: { xs: '100%', md: '600px' },
          display: { xs: 'none', md: 'block' }
        }}
      >
        <ImageListHome />
      </Box>

      <Stack
        spacing={4}
        sx={{
          width: { xs: '100%', md: '450px' },
          textAlign: { xs: 'center', md: 'right' },
          zIndex: 1
        }}
      >
        {/* Heading */}
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.4rem', md: '2.4rem' },
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              mb: 2,
              textShadow: '3px 3px 12px rgba(0,0,0,0.5)'
            }}
          >
            Нэрийн хуудас хэвлэлийн үйлчилгээ
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '0.9rem', md: '0.9rem' },
              color: 'rgba(255,255,255,0.9)',
              textShadow: '1px 1px 6px rgba(0,0,0,0.3)',
              lineHeight: 1.6
            }}
          >
            Хэвлэлийн газарт биечлэн очих шаардлагагүйгээр амар хялбараар хэвлэх
            боломж
          </Typography>
        </Box>

        {/* Buttons */}
        {user && (
          <Stack
            direction="row"
            spacing={5}
            justifyContent="flex-end"
            sx={{ mt: 20 }}
          >
            <Button
              variant="contained"
              component={Link}
              href="/order"
              sx={{
                width: '180px',
                height: '50px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                borderRadius: '25px',
                background: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
                  background: 'linear-gradient(45deg, #feb47b, #ff7e5f)'
                }
              }}
              onClick={handleUploadClick}
            >
              Захиалга өгөх
            </Button>
            {/* <Button
              variant="outlined"
              component={Link}
              href="/templates"
              sx={{
                width: '180px',
                height: '50px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                borderRadius: '25px',
                color: '#ffffff',
                borderColor: '#ffffff',
                borderWidth: '2px',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Үйлчилгээ үзэх
            </Button> */}
          </Stack>
        )}
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.15)',
            animation: `${glowingAnimation} 4s ease-in-out infinite`
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 150,
            height: 150,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.15)',
            animation: `${glowingAnimation} 5s ease-in-out infinite`
          }}
        />
      </Stack>

      {/* Modal for FormsOrder */}
      <Modal
        open={showFormsOrder}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: { xs: '90%', md: '50%' },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4
          }}
        >
          <FormsOrder />
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;

import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';
// components
import Profile from './Profile';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';

const Header = ({ toggleMobileSidebar }) => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem('PSA-USER');
      if (storage) {
        console.log(JSON.parse(storage));
        setUser(JSON.parse(storage));
      }
    }
  }, []);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    justifyContent: 'space-between',
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 10)
    }
  }));

  const LogoWrapper = styled(Box)(({ theme }) => ({
    // paddingLeft: theme.spacing(0),
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      paddingLeft: theme.spacing(2)
    }
  }));

  return (
    <ToolbarStyled>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Stack spacing={1} direction="row" alignItems="center">
        {user && user.role == 1 && (
          <>
            <Link href="/dashboard/templates">Templates</Link>
            <Link href="/dashboard/orders">Orders</Link>
          </>
        )}
        {user ? (
          <Profile />
        ) : (
          <Button
            variant="contained"
            component={Link}
            href="/authentication/login"
            disableElevation
            color="primary"
          >
            Нэвтрэх
          </Button>
        )}
      </Stack>
    </ToolbarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object
};

export default Header;

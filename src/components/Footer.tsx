import { Box, Container, Typography, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: { xs: 2, md: 0 },
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box
              component="img"
              src="/assets/images/logo.png"
              alt="Stack Merlion Logo"
              sx={{
                width: 40,
                height: 'auto',
                mr: 2,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} - Stack Merlion All Rights Reserved
            </Typography>
          </Box>
          <IconButton
            onClick={handleBackToTop}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 
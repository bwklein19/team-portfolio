import { Box, Container, Typography, Button, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import contactBg from '../assets/images/contact-bg.svg';

const Contact = () => {
  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: `url(${contactBg}) no-repeat center center`,
        backgroundSize: 'cover',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: 800,
            mx: 'auto',
            textAlign: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
          data-aos="fade-up"
        >
          <Typography
            component="h1"
            variant="h2"
            className="text-gradient"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 4,
            }}
          >
            Get in Touch
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              alignItems: 'center',
              mb: 4,
            }}
          >
            {/* Email Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <EmailIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h5" gutterBottom>
                Email Us
              </Typography>
              <Link
                href="mailto:admin@stackmerlion.com"
                underline="none"
                sx={{
                  color: 'primary.main',
                  fontSize: '1.25rem',
                  '&:hover': {
                    color: 'primary.dark',
                  },
                }}
              >
                admin@stackmerlion.com
              </Link>
            </Box>

            {/* Schedule Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <CalendarTodayIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h5" gutterBottom>
                Schedule a Meeting
              </Typography>
              <Button
                variant="contained"
                size="large"
                href="https://calendly.com/benjamin-stackmerlion/30min"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #2B5876 0%, #4E4376 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1D3B4F 0%, #352E52 100%)',
                  },
                }}
              >
                Schedule Now
              </Button>
            </Box>
          </Box>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: 'auto',
              mt: 4,
            }}
          >
            We're here to help! Choose your preferred way to connect with us, and we'll get back to you as soon as possible.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;

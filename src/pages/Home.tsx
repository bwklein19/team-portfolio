import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import heroBg from '../assets/images/hero-bg.svg';

// Import images
import webDesignIcon from '../assets/images/services/web-design.svg';
import webDevIcon from '../assets/images/services/web-development.svg';
import aiTechIcon from '../assets/images/services/ai-technology.svg';
import blockchainIcon from '../assets/images/services/blockchain.svg';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: `url(${heroBg}) no-repeat center center`,
          backgroundSize: 'cover',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(2px)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
            data-aos="fade-up"
          >
            <Box
              component="img"
              src="/assets/images/logo.png"
              alt="Stack Merlion Logo"
              sx={{
                width: { xs: 150, md: 200 },
                height: 'auto',
                mb: 4,
                animation: 'scaleIn 1s ease-out',
                filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1))',
              }}
            />
            <Typography
              component="h1"
              variant="h2"
              className="text-gradient"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.75rem' },
                animation: 'fadeIn 1s ease-out',
                textShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Meet the Team: Your Experts in Software Development
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                maxWidth: '800px',
                mx: 'auto',
                animation: 'fadeIn 1s ease-out 0.2s backwards',
                color: 'rgba(255, 255, 255, 0.9)',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                lineHeight: 1.6,
              }}
            >
              Welcome to Stack Merlion, a premier software development team based in Singapore.
              With extensive experience in web design, software development, artificial
              intelligence, blockchain, DevOps, and cloud computing, we specialize in
              delivering cutting-edge solutions tailored to the needs of European and
              American companies.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                flexWrap: 'wrap',
                justifyContent: 'center',
                animation: 'fadeIn 1s ease-out 0.4s backwards',
              }}
            >
              <Button
                variant="contained"
                component={RouterLink}
                to="/contact"
                size="large"
                sx={{
                  minWidth: 200,
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #2B5876 0%, #4E4376 100%)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1D3B4F 0%, #352E52 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/services"
                size="large"
                sx={{
                  minWidth: 200,
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  backdropFilter: 'blur(5px)',
                  '&:hover': {
                    borderColor: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Our Services
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Services Preview Section */}
      <Box
        className="services-pattern"
        sx={{
          py: { xs: 8, md: 12 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(78, 67, 118, 0.05) 0%, rgba(255, 107, 107, 0.05) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            component="h2"
            variant="h3"
            align="center"
            className="text-gradient"
            gutterBottom
            data-aos="fade-up"
          >
            Our Awesome Services
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Empowering US Companies with Comprehensive Web Design, Development,
            Blockchain, and AI Technology Solutions to Achieve Their Goals
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid
                item
                key={service.title}
                xs={12}
                sm={6}
                md={3}
                data-aos="fade-up"
                data-aos-delay={150 + index * 100}
              >
                <Box
                  className="card-hover"
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <Box
                    component="img"
                    src={service.image}
                    alt={service.title}
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2,
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  />
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {service.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {service.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

// Service data
const services = [
  {
    title: 'Web Design',
    description: 'Experience expert web design tailored to elevate your digital presence. We specialize in creating user-friendly interfaces and visually appealing websites that drive results.',
    image: webDesignIcon,
  },
  {
    title: 'Web Development',
    description: 'Discover our tailored approach to web development, specializing in creating robust e-commerce platforms, custom web applications, and seamless user experiences.',
    image: webDevIcon,
  },
  {
    title: 'AI Technology',
    description: 'Our AI services leverage cutting-edge technology to optimize processes, enhance decision-making, and drive business growth. From machine learning algorithms to natural language processing solutions.',
    image: aiTechIcon,
  },
  {
    title: 'Blockchain',
    description: 'Discover our robust blockchain services designed to optimize security, streamline operations, and ensure data integrity across diverse industries.',
    image: blockchainIcon,
  },
];

export default Home; 
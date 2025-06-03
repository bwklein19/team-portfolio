import React from 'react';
import { FC } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { useEffect } from 'react';
import AOS from 'aos';

// Import images
import webDesignIcon from '../assets/images/services/web-design.svg';
import webDevIcon from '../assets/images/services/web-development.svg';
import aiTechIcon from '../assets/images/services/ai-technology.svg';
import blockchainIcon from '../assets/images/services/blockchain.svg';

interface Service {
  title: string;
  description: string;
  image: string;
  features: string[];
}

const services: Service[] = [
  {
    title: 'Web Design',
    description: 'Experience expert web design tailored to elevate your digital presence. We specialize in creating user-friendly interfaces and visually appealing websites that drive results.',
    image: webDesignIcon,
    features: [
      'Responsive Design',
      'UI/UX Design',
      'Website Redesign',
      'Mobile-First Approach',
    ],
  },
  {
    title: 'Web Development',
    description: 'Discover our tailored approach to web development, specializing in creating robust e-commerce platforms, custom web applications, and seamless user experiences.',
    image: webDevIcon,
    features: [
      'Full-Stack Development',
      'E-commerce Solutions',
      'Custom Web Applications',
      'API Integration',
    ],
  },
  {
    title: 'AI Technology',
    description: 'Our AI services leverage cutting-edge technology to optimize processes, enhance decision-making, and drive business growth. From machine learning algorithms to natural language processing solutions.',
    image: aiTechIcon,
    features: [
      'Machine Learning',
      'Natural Language Processing',
      'Predictive Analytics',
      'AI Integration',
    ],
  },
  {
    title: 'Blockchain',
    description: 'Discover our robust blockchain services designed to optimize security, streamline operations, and ensure data integrity across diverse industries.',
    image: blockchainIcon,
    features: [
      'Smart Contracts',
      'DApp Development',
      'Blockchain Integration',
      'Cryptocurrency Solutions',
    ],
  },
];

const Services: FC = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          data-aos="fade-up"
        >
          Our Services
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Comprehensive solutions tailored to meet your business needs and drive growth
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} key={service.title}>
              <Card
                sx={{ height: '100%' }}
                data-aos="fade-up"
                data-aos-delay={150 + index * 50}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={service.image}
                      alt={service.title}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 2,
                        mr: 2
                      }}
                    />
                    <Typography variant="h4" component="h2" gutterBottom>
                      {service.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    paragraph
                  >
                    {service.description}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {service.features.map((feature) => (
                      <Typography
                        component="li"
                        key={feature}
                        sx={{ mb: 1 }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services; 
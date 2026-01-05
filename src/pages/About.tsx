import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Avatar } from '@mui/material';

const teamMembers = [
    {
    name: 'Benjamin Tan',
    role: 'Technical Lead (Full Stack Developer)',
    description: 'Visionary leader driving technological excellence with deep expertise in blockchain technology and AI solutions.',
    image: require('../assets/images/Benjamin Tan.png'),
  }
];

const About = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* About Section */}
        <Box sx={{ mb: 8 }} data-aos="fade-up">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            About Stack Merlion
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Maximize Profit through Collaboration with Our Expert Developers
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            Join forces with us in a strategic partnership aimed at maximizing mutual
            profit through collaborative efforts with talented US developers. Together,
            we&apos;ll leverage our combined expertise to penetrate and thrive in the
            dynamic US job market, capitalizing on emerging opportunities and driving
            sustained growth.
          </Typography>
        </Box>

        {/* Team Members Section */}
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
          data-aos="fade-up"
        >
          Meet Our Team
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
          data-aos="fade-up"
        >
          Skilled Software Development Team for Customized Solutions
        </Typography>

        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={member.name}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Box
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      mb: 2,
                      objectFit: 'cover'
                    }}
                  />
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    color="primary"
                    align="center"
                  >
                    {member.role}
                  </Typography>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {member.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* University Background */}
        <Box sx={{ mt: 8 }} data-aos="fade-up">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Our Background
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            Our cohesive team comprises professionals who graduated from Singapore
            National University and share a collective experience of working together
            in various roles. With a foundation in rigorous academic training and
            practical collaboration, we bring a diverse range of skills and
            perspectives to deliver innovative solutions and achieve exceptional
            results.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About; 

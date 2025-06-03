import { Box, Container, Typography, Grid, Card, CardContent, Stepper, Step, StepLabel } from '@mui/material';

const workflowSteps = [
  {
    title: 'Communication',
    subtitle: 'Goal Setting and Strategic Planning',
    steps: [
      'Email',
      'Google meeting',
      'Telegram sharing',
      'Prepare workspace',
    ],
  },
  {
    title: 'Collaboration',
    subtitle: 'Development and Execution',
    steps: [
      'Catching task',
      'Getting Offer',
      'Sharing knowledge',
      'Deliver Product',
    ],
  },
  {
    title: 'Profit Sharing',
    subtitle: 'Building Strong Partnerships',
    steps: [
      'Initiation and Agreement',
      'Defining Roles and Contributions',
      'Establishing Financial Tracking',
      'Revenue Generation',
    ],
  },
];

const Workflow = () => {
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
          Our Workflow
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
          Proven Workflow for Effective and Successful Collaboration
        </Typography>

        <Grid container spacing={4}>
          {workflowSteps.map((section, index) => (
            <Grid item xs={12} md={4} key={section.title}>
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
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    align="center"
                    color="primary"
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {section.subtitle}
                  </Typography>
                  <Stepper
                    orientation="vertical"
                    activeStep={-1}
                    sx={{
                      '& .MuiStepLabel-root': {
                        py: 1,
                      },
                    }}
                  >
                    {section.steps.map((step) => (
                      <Step key={step} expanded>
                        <StepLabel>{step}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Collaboration Benefits */}
        <Box sx={{ mt: 8 }} data-aos="fade-up">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Let's Collaborate
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            Both our team and the US developers align on a shared vision and clear,
            common goals. This ensures everyone is working towards the same outcome,
            fostering a sense of unity and purpose.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Workflow; 
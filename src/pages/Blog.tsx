import { FC } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardHeader, Avatar } from '@mui/material';

const blogPosts = [
  {
    title: 'Expanding Horizons',
    content: 'Our collaboration with US developers has been a catalyst for expanding our market reach and driving business growth. By partnering with talented professionals across the United States, we\'ve broadened our service offerings and tapped into new market segments.',
    author: 'Asher Li',
    role: 'Team Leader',
    date: 'Two months ago',
    avatar: '👨‍💼',
  },
  {
    title: 'Driving Revenue Growth Through Strategic Collaboration!',
    content: 'Our partnership with US developers is a key driver of our revenue growth. By joining forces with top-tier professionals from across the United States, we\'ve enhanced our ability to deliver cutting-edge solutions and achieve outstanding results for our clients.',
    author: 'Li Guo Qiang',
    role: 'Senior Backend developer',
    date: 'One month ago',
    avatar: '👨‍💻',
  },
  {
    title: 'Enhancing Service Offerings Through US Developer Collaboration!',
    content: 'The collaboration between our team and US developers has significantly enhanced our service offerings. By partnering with skilled professionals across the United States, we\'ve been able to innovate and deliver solutions that cater to a wide range of client needs.',
    author: 'Tung Wen Ming',
    role: 'Senior Devops Engineer',
    date: '6 months ago',
    avatar: '👨‍🔧',
  },
  {
    title: 'The Power of Collaboration with US Developers!',
    content: 'We believe in the power of collaboration to drive innovation and success. Our partnership with US developers has been a testament to this belief, enabling us to create innovative solutions that meet the evolving needs of our clients.',
    author: 'Hong Cheng Hao',
    role: 'Senior Frontend Developer',
    date: 'Four months ago',
    avatar: '👨‍🎨',
  },
  {
    title: 'The Benefits of Partnering with US Developers!',
    content: 'Our collaboration with US developers has been instrumental in expanding our reach and impact within the tech industry. We value the innovative spirit and expertise that our US partners bring to the table, enabling us to deliver high-quality solutions that resonate with our clients.',
    author: 'Benjamin Tan',
    role: 'Technical Lead',
    date: '3 months ago',
    avatar: '👨‍🔬',
  },
  {
    title: 'Building a Stronger Market Presence Through US Developer Partnerships!',
    content: 'The partnership between our team and US developers has been a cornerstone of our strategy to build a stronger market presence. By collaborating with top talent in the US, we\'ve been able to extend our reach and establish a robust foothold in the competitive tech landscape.',
    author: 'Zhong Yan Ling',
    role: 'Web Designer',
    date: '7 months ago',
    avatar: '👩‍🎨',
  },
];

const Blog: FC = () => {
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
          Our Blog Stories
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
          Insights and Updates from Our Team's Journey in Software Development
        </Typography>

        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} md={6} key={post.title}>
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
                <CardHeader
                  avatar={
                    <Typography variant="h3" component="span">
                      {post.avatar}
                    </Typography>
                  }
                  title={post.author}
                  subheader={`${post.role} • ${post.date}`}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog; 
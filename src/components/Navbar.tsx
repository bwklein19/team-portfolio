import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Menu,
  Container,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['Home', 'Services', 'About', 'Contact'];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        stackmerlion
      </Typography>
      <List>
        {pages.map((page) => (
          <ListItem key={page} component={RouterLink} to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}>
            <ListItemText primary={page} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo for larger screens */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box
              component="img"
              src="/assets/images/logo.png"
              alt="Stack Merlion Logo"
              sx={{
                height: 40,
                width: 'auto',
                mr: 1,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                letterSpacing: '.1rem',
              }}
            >
              STACK MERLION
            </Typography>
          </Box>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile screens */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box
              component="img"
              src="/assets/images/logo.png"
              alt="Stack Merlion Logo"
              sx={{
                height: 40,
                width: 'auto',
                mr: 1,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                letterSpacing: '.1rem',
              }}
            >
              STACK MERLION
            </Typography>
          </Box>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={RouterLink}
                to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 
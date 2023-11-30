import { Suspense } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { RouterProvider } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import router from './router';
import Me from './components/me';

const mdTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          height: '100%',
        }}
      >
        <AppBar position="absolute">
          <Toolbar>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              onClick={() => {
                location.href = '/#/';
              }}
            >
              WALLET
            </Typography>
            <Me />
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: 'auto',
            marginTop: 3,
            marginLeft: 4,
            height: '90%',
          }}
        >
          <Toolbar />
          <Suspense fallback={<CircularProgress disableShrink />}>
            <RouterProvider router={router} />
          </Suspense>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default App;

import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';
import './App.css';


export const AppHeader = () => (
    <div className='title'>
    <AppBar position="static" style={{ background: '#61dafb' }}>
    <Toolbar style={{ flex: 1 }}>
      <Typography variant="h3">
        CatBook
      </Typography>
      <Button style={{ color: 'white' }}>
          Logout
      </Button>
    </Toolbar>
  </AppBar>
  </div>
);
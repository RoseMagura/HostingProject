import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import './App.css';
import { Link } from 'react-router-dom';

export const AppHeader = () => {
    const loginStatus = localStorage.getItem('user');
    console.log('LS', loginStatus);
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('admin');
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <div className="title">
            <AppBar position="static" style={{ background: '#61dafb' }}>
                <Toolbar style={{ flex: 1 }}>
                    <Typography variant="h3">CatBook</Typography>
                    {loginStatus === null ? (
                        <Link to='/login'>
                            <Button id='headerBtn'>Login</Button>
                        </Link>
                    ) : (
                        <Button id='headerBtn' onClick={logout}>Logout</Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

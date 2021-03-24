import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import './App.css';
import { NavLink } from 'react-router-dom';

export const AppHeader = () => {
    console.log('current page', window.location.pathname);
    const loginStatus = localStorage.getItem('user');

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('admin');
        localStorage.removeItem('token');
        window.location.reload();
    };
    return (
        <div className="title">
            <AppBar position="static" style={{ background: '#61dafb' }}>
                <Toolbar style={{ flex: 1 }}>
                    <Typography variant="h3">CatBook</Typography>
                    <NavLink
                        exact
                        to="/"
                        activeStyle={{ fontWeight: 'bold' }}
                        className="NavLink"
                    >
                        Images
                        {/* <Button id="headerBtn">Images</Button> */}
                    </NavLink>
                    <NavLink
                        exact
                        to="/users"
                        activeStyle={{ fontWeight: 'bold' }}
                        className="NavLink"
                    >
                        {/* <Button id="headerBtn">Friends</Button> */}
                        Friends
                    </NavLink>
                    {loginStatus === null ? (
                        <NavLink to="/login">
                            <Button id="headerBtn">Login</Button>
                        </NavLink>
                    ) : (
                        <Button id="headerBtn" onClick={logout}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import './App.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const AppHeader = () => {
    const user = localStorage.getItem('id');
    const [loginStatus, setStatus] = useState(false);

    useEffect(() => {
        console.log(localStorage);
        if(user){
            console.log('switching to logout');
            setStatus(true);
        };
    }, [user]);

    const logout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('admin');
        localStorage.removeItem('token');
        const newStatus = false;
        setStatus(newStatus);
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
                    </NavLink>
                    <NavLink
                        exact
                        to="/users"
                        activeStyle={{ fontWeight: 'bold' }}
                        className="NavLink"
                    >
                        Friends
                    </NavLink>
                    {loginStatus === false ? (
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

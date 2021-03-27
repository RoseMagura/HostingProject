import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import './App.css';
import { NavLink } from 'react-router-dom';
import { BasicProps } from '../interfaces/BasicProps';

export const AppHeader = (props: BasicProps) => {
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
                    {props.value === false ? (
                        <NavLink to="/login">
                            <Button id="headerBtn">Login</Button>
                        </NavLink>
                    ) : (
                        <Button id="headerBtn" onClick={props.onChange}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

import React, { useState } from 'react';
import {
    Button,
    TextField,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
} from '@material-ui/core';
import './App.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';

interface BasicProps {
    history: string[];
}

const Login = (props: BasicProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setStatus] = useState('');
    const [hidden, toggleShow] = useState(true);

    const switching = (
    ) => {
        toggleShow(!hidden);
    }

    const submit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const apiUrl = `${process.env.REACT_APP_API_URL}/login`;
        // fetch request using apiUrl and credentials
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            // should return error or token
        }).then(async (response) => {
            if (response.status === 401) {
                setStatus(await response.json());
            } else {
                // remove any previous error messages
                setStatus('Successfully logged in!');
                // get credentials and store in Local Storage
                const cred = await response.json();
                
                localStorage.setItem('id', cred.userId);
                localStorage.setItem('admin', cred.admin);
                localStorage.setItem('token', cred.token);
                // redirect to home
                props.history.push('/');
            }
        });
    };

    const updateUsername = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setUsername(event.target.value);
    };

    const updatePassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <AppBar position="static" style={{ background: '#61dafb' }}>
                <Toolbar style={{ flex: 1 }}>
                    <Typography variant="h3">Login</Typography>
                </Toolbar>
            </AppBar>
            <form noValidate onSubmit={submit}>
                <div id='grid'>
                    <div id='textboxes'>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        onChange={updateUsername}
                    />
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type={hidden ? 'password' : 'text'}
                            onChange={updatePassword}
                        />
                        </div>
                        <div id='column2'>
                            <div id='empty'></div>
                            <div>
                                <IconButton onClick={switching}>
                                    {hidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </div>
                        </div>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
            <div>{loginStatus}</div>
            <Link to='/signup'>
                <Button>Sign Up</Button>
            </Link>
        </div>
    );
};
export default Login;

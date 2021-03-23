import { useState } from 'react';
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

    const submit = (): void => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/login`;
        console.log(username, password);
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
                // set token
                const token = await response.json();
                localStorage.setItem('token', token);
                // redirect to home
                props.history.push('/');
            }
        });
    };

    const updateUsername = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        console.log(typeof event);
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
            <form noValidate autoComplete="off">
                <div id='grid'>
                    <div id='textboxes'>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        onChange={updateUsername}
                    />
                    {/* <div id='pwdRow'> */}
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
            </form>
            <Button onClick={submit}>Submit</Button>
            <div>{loginStatus}</div>
        </div>
    );
};
export default Login;

import { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/login`;
        console.log(username, password);
        // fetch request using apiUrl and credentials
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({username, password})
        }).then(response => console.log(response));
        // should return error or token
    }

    const updateUsername = (event: any) => {
        console.log(typeof event);
        setUsername(event.target.value);
    } 

    const updatePassword = (event: any) => {
        setPassword(event.target.value);
    }

    return (
        <div>
            <h1>Login</h1>
            <form noValidate autoComplete="off">
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
                    onChange={updatePassword}
                />
            </form>
            <Button onClick={submit}>Submit</Button>
        </div>
    );
};
export default Login;

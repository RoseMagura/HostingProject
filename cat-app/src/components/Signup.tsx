import {
    Button,
    TextField,
    IconButton
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import './App.css';
import { Link } from 'react-router-dom';
import { useState, FormEvent } from 'react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setRepeat] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loginStatus, setStatus] = useState('');
    const [hidden, toggleShow] = useState(true);

    const [usernameError, setUsernameErr] = useState('');
    const [passwordError, setPwdErr] = useState('');

    const switching = (
    ) => {
        toggleShow(!hidden);
    }

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // check that password was correctly entered
        if (password !== passwordRepeat) {
            setStatus('Error: Passwords do not match');
        } else {
            setStatus('');
        }
        // Send fetch request to backend to create user
        const apiUrl = `${process.env.REACT_APP_API_URL}/users`;
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username, password, firstName, lastName }),
            // should return error or token
        }).then(async (response) => {
            if (response.status === 401) {
                setStatus(await response.json());
            } else {
                // remove any previous error messages
                setStatus('Successfully created user!');
                // get credentials and store in Local Storage
                const cred = await response.json();
                console.log(cred);
                // Get token and store in local storage
                localStorage.setItem('token', cred.token);
                localStorage.setItem('id', cred.userId);
                localStorage.setItem('admin', cred.admin);
            }
        });
    }

    const updateUsername = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setUsername(event.target.value);
        event.target.value.length < 5
            ? setUsernameErr('Username is too short.')
            : setUsernameErr('');

    };

    const updatePassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setPassword(event.target.value);
        event.target.value.length < 8
            ? setPwdErr('Password is too short.')
            : setPwdErr('');

    };

    const updateRepeat = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setRepeat(event.target.value);
        event.target.value !== password
            ? setPwdErr('Passwords don\'t match.') : setPwdErr('');
    };

    const updateFirstName = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setFirstName(event.target.value);
    };

    const updateLastName = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setLastName(event.target.value);
    };

    return (<div>
        <form noValidate onSubmit={submit}>
            <div id='grid'>
                <div id='textboxes'>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        onChange={updateUsername}
                        required
                    />
                    {usernameError !== '' && usernameError}
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type={hidden ? 'password' : 'text'}
                        onChange={updatePassword}
                    />
                    <TextField
                        id="confirm-password"
                        label="Re-enter Password"
                        variant="outlined"
                        type={hidden ? 'password' : 'text'}
                        onChange={updateRepeat}
                    />
                    {passwordError !== '' && passwordError}
                    <TextField
                        id="first-name"
                        label="First Name"
                        variant="outlined"
                        onChange={updateFirstName}
                    />
                    <TextField
                        id="last-name"
                        label="Last Name"
                        variant="outlined"
                        onChange={updateLastName}
                    />
                </div>
                <div id='sign-up-column2'>
                    <div>
                        <IconButton onClick={switching}>
                            {hidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </div>
                </div>
            </div>
            <div>{loginStatus}</div>
            <Button type='submit'>Submit</Button>
            <Link to='/login'>
                <Button>
                    Return to Login
                </Button>
            </Link>
        </form>
    </div>
    )
};

export default Signup;

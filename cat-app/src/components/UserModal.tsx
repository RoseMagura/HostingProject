import {
    Button, TextField, RadioGroup,
    FormControl, FormControlLabel, Radio, FormLabel, IconButton
} from '@material-ui/core';
import { useState } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

interface UserModalProps {
    id: number;
    username: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    admin: Boolean;
    func: Function;
}

export const UserModal = (props: UserModalProps) => {
    const { id, username, password, firstName, lastName, admin } = props;
    const [newUsername, setUsername] = useState(username);
    const [newPassword, setPassword] = useState(password);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newFirstName, setFirstName] = useState(firstName);
    const [newLastName, setLastName] = useState(lastName);

    const [hidden, toggleShow] = useState(true);
    const [apiResponse, setResponse] = useState('');

    const switching = (
    ) => {
        toggleShow(!hidden);
    }

    let val = '';
    admin ? val = 'admin' : val = 'standard';
    const [newAdmin, setAdmin] = useState(val);
    const [origPwd, setOrigPwd] = useState('');
    const [passwordError, setPwdErr] = useState(false);

    const currUserStatus = localStorage.getItem('admin') === 'true';

    const updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const updatePrevPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrigPwd(event.target.value);
    }

    const updateConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
        setPwdErr(event.target.value !== newPassword);
    }

    const updateFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }

    const updateLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }

    const updateAdminStatus = (event: any) => {
        setAdmin(event.target.value);
    }


    const editUser = () => {
        const token = localStorage.getItem('token');

        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username, 'password': origPwd }),
        }
        ).then(async response => {
            if (response.status !== 200) {
                const data = await response.json();
                setResponse(data);
            } else {
                let putBody = {};
                if (newPassword === password) {
                    putBody = {
                        'username': newUsername,
                        'firstName': newFirstName,
                        'lastName': newLastName,
                        'admin': newAdmin === 'admin' ? true : false
                    };
                } else {
                    putBody = {
                        'username': newUsername,
                        'password': newPassword,
                        'firstName': newFirstName,
                        'lastName': newLastName,
                        'admin': newAdmin === 'admin' ? true : false
                    };
                }
                fetch(`${process.env.REACT_APP_API_URL}/users/id/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(putBody)
                }).then(async res => {
                    const data = res;
                    alert((await data.text()).replace(/"/g, ''));
                    props.func({ 'res': data, newFirstName, newLastName, 'newAdminStatus': newAdmin, newUsername, changed: true });
                }
                )
            }
        }
        )
    }

    const cancel = () => {
        props.func({ changed: false });
    }

    return (
        <div className='modal' id='modal-grid'>
            <div id='main-column'>
                <form>
                    <TextField label='New Username' variant='outlined' onChange={updateUsername} />
                    <TextField label='Original Password' variant='outlined' onChange={updatePrevPassword}
                        type={hidden ? 'password' : 'text'} />

                    <TextField label='New Password' variant='outlined' onChange={updatePassword}
                        type={hidden ? 'password' : 'text'} />
                    <TextField label='Re-enter New Password' variant='outlined' onChange={updateConfirmPassword}
                        type={hidden ? 'password' : 'text'} />
                    {passwordError && <div>Passwords don't match</div>}

                    <TextField label='New First Name' variant='outlined' onChange={updateFirstName} />
                    <TextField label='New Last Name' variant='outlined' onChange={updateLastName} />
                    <FormControl component='fieldset'>
                        <FormLabel component='legend'>Admin Status</FormLabel>
                        <RadioGroup aria-label='admin-status' name='admin1' value={newAdmin} onChange={updateAdminStatus}>
                            <FormControlLabel value='admin' disabled={!currUserStatus} control={<Radio />} label="Admin" />
                            <FormControlLabel value='standard' control={<Radio />} label="Standard User" />
                        </RadioGroup>
                    </FormControl>
                    <Button onClick={editUser} disabled={passwordError}>Submit</Button>
                    <Button onClick={cancel}>Cancel</Button>
                    {apiResponse}
                </form>
            </div>
            <div id='side-column'>
                <IconButton onClick={switching}>
                    {hidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
                <div>

                </div>
            </div>
        </div>
    )
}
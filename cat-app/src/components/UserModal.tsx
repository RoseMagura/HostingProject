import { Button, TextField, RadioGroup, FormControl, FormControlLabel, Radio, FormLabel } from '@material-ui/core';
import { useState } from 'react';

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
        const userId = localStorage.getItem('id');
        console.log(newUsername, newPassword, confirmPassword, newFirstName, newLastName, newAdmin);
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username, 'password': origPwd }),
        }
    ).then(async response => 
        {
            if(response.status !== 200) {
                const data = await response.json();
                setResponse(data);
            }
        }
        );
    // fetch(`${process.env.REACT_APP_API_URL}/users/id/${id}`, {
    //     method: 'PUT',
    //     headers: {
    //         'Content-type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     },
    //     body: JSON.stringify({})
    // }).then(async res => {
    //     props.func({ res, changed: true });
    // }
    // );
}

const cancel = () => {
    props.func({ changed: false });
}

return (
    <div className='modal'>
        <form>
            <TextField label='New Username' variant='outlined' onChange={updateUsername} />
            <TextField label='Original Password' variant='outlined' onChange={updatePrevPassword} />
                
            <TextField label='New Password' variant='outlined' onChange={updatePassword} />
            <TextField label='Re-enter New Password' variant='outlined' onChange={updateConfirmPassword} />
            <TextField label='New First Name' variant='outlined' onChange={updateFirstName} />
            <TextField label='New Last Name' variant='outlined' onChange={updateLastName} />
            <FormControl component='fieldset'>
                <FormLabel component='legend'>Admin Status</FormLabel>
                <RadioGroup aria-label='admin-status' name='admin1' value={newAdmin} onChange={updateAdminStatus}>
                    <FormControlLabel value='admin' control={<Radio />} label="Admin" />
                    <FormControlLabel value='standard' control={<Radio />} label="Standard User" />
                </RadioGroup>
            </FormControl>
            <Button onClick={editUser}>Submit</Button>
            <Button onClick={cancel}>Cancel</Button>
            {apiResponse}
        </form>
    </div>
)
}
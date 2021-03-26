import { useState } from 'react';
import {
    Button,
    TextField
} from '@material-ui/core';
import './App.css';
import { Link } from 'react-router-dom';

const Signup = () => {
    const submit = () => {
        console.log('submitting');
    }

    return (<div>
        <h1>SIGN UP</h1>
        <form noValidate onSubmit={submit}>
            <div id='grid'>
                <div id='textboxes'>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                    />
                    <TextField
                        id="confirm-password"
                        label="Re-enter Password"
                        variant="outlined"
                    />
                </div>

            </div>
            <Button type='submit'>Submit</Button>
        </form>
    </div>
    )
};

export default Signup;

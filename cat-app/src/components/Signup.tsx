import {
    Button,
    TextField,
    AppBar,
    Toolbar,
    Typography,
    LinearProgress
} from '@material-ui/core';
import './App.css';
import { Link } from 'react-router-dom';
import { AppHeader } from './AppHeader';

const Signup = () => {
    const submit = (event: any) => {
        event.preventDefault();
        console.log('submitting');
    }

    return (<div>
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

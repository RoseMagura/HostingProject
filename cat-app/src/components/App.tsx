import './App.scss';
import Home from './Home';
import Login from './Login';
import UserList from './UserList';
import { Route } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import Signup from './Signup';
import { useState } from 'react';

const App = () => {
    const user = localStorage.getItem('id');
    const [loginStatus, setStatus] = useState(user !== undefined && user !== null);

    const logout = () => {
        console.log('logging out');
        localStorage.removeItem('id');
        localStorage.removeItem('admin');
        localStorage.removeItem('token');
        const newStatus = false;
        setStatus(newStatus);
    };

    const update = (result: boolean) => {
        setStatus(result);
    }

    return (
        <div className="App">
            <AppHeader value={loginStatus} onChange={logout} />
            <Route exact path='/' render={() => (<Home value={loginStatus} onChange={logout} />)} />
            <Route path='/login'
                render={() => (<Login onChange={update} />)}
            />
            <Route path='/users' render={() => (<UserList value={user} />)} />
            <Route path='/signup' component={Signup} />
        </div>
    );
}

export default App;

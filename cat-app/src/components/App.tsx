import './App.css';
import Home from './Home';
import Login from './Login';
import UserList from './UserList';
import { Route } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import Signup from './Signup';
import { useEffect, useState } from 'react';

function App() {
    const user = localStorage.getItem('id');
    const [loginStatus, setStatus] = useState(false);

    console.log('LS', loginStatus);
    
    useEffect(() => {
        console.log("running");
        if(user){
            console.log('switching to logout');
            setStatus(true);
        };
    }, [user]);

    const logout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('admin');
        localStorage.removeItem('token');
        const newStatus = false;
        setStatus(newStatus);
        console.log('logging out');
    };

    return (
        <div className="App">
            <AppHeader value={loginStatus} onChange={logout}/>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login}/>
            <Route path='/users' component={UserList}/>
            <Route path='/signup' component={Signup}/>
        </div>
    );
}

export default App;

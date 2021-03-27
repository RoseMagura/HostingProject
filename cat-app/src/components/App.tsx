import './App.css';
import Home from './Home';
import Login from './Login';
import UserList from './UserList';
import { Route } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import Signup from './Signup';
import { useEffect, useState } from 'react';

const App = (props: any) => {
    const user = localStorage.getItem('id');
    const [loginStatus, setStatus] = useState(user !== undefined);

    useEffect(() => {
        console.log('LS', loginStatus);
    }, []);

    const logout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('admin');
        localStorage.removeItem('token');
        const newStatus = false;
        setStatus(newStatus);
        console.log('logging out');
    };

    const update = (result: boolean) => {
        setStatus(result);
    }

    return (
        <div className="App">
            <AppHeader value={loginStatus} onChange={logout}/>
            <Route exact path='/' render={() => (<Home value={loginStatus}/>)}/>
            <Route path='/login' 
                render={() => (<Login onChange={update} />)}
            // component={Login}
             />
            <Route path='/users' component={UserList}/>
            <Route path='/signup' component={Signup}/>
        </div>
    );
}

export default App;

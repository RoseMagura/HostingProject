import './App.css';
import Home from './Home';
import Login from './Login';
import UserList from './UserList';
import { Route } from 'react-router-dom';
import { AppHeader } from './AppHeader';

function App() {
    return (
        <div className="App">
            <AppHeader />
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login}/>
            <Route path='/users' component={UserList}/>
        </div>
    );
}

export default App;

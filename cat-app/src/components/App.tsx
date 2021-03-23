import './App.css';
import Home from './Home';
import Login from './Login';
import { Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login}/>
        </div>
    );
}

export default App;

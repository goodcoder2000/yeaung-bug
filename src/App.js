import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import POSPage from './pages/POSPage';
import AddNewItem from './pages/AddNewItem';
import Payed from './pages/Payed';


function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/"><HomePage /></Route>
                <Route path="/pos"><POSPage /></Route>
                <Route path="/additem"><AddNewItem /></Route>
                <Route path="/Payed"><Payed/></Route>
            </Switch>
        </Router>
    );
}

export default App;
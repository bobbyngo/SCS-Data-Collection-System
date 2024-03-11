import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormList from './components/Form/FormList';
import FormDetail from './components/Form/FormDetail';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/signin' element={<Login />} />
                    <Route path='/form-list' element={<FormList />} />
                    <Route path='/form/:formId' element={<FormDetail />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

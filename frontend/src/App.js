import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import ClientList from './pages/ClientList';
import ClientForm from './pages/ClientForm';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/clients">Клиенты</Link></li>
                        <li><Link to="/accounts/logout/">Выход</Link></li>
                        <li><Link to="/accounts/login/">Вход</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/clients" element={<ClientList/>}/>
                    <Route path="/clients/add" element={<ClientForm/>}/>
                    <Route path="/clients/edit/:id" element={<ClientForm/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import ClientList from './pages/ClientList';
import ClientForm from './pages/ClientForm';
import Dashboard from './pages/Dashboard';
import {AppBar, Toolbar, Typography, Button, Box} from '@mui/material';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <AppBar position="static" sx={{backgroundColor: '#333', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="h6" sx={{color: '#fff'}}>
                            Маркетинговое агентство
                        </Typography>
                        <Box>
                            <Button color="inherit" component={Link} to="/"
                                    sx={{color: '#fff', '&:hover': {backgroundColor: '#555'}}}>
                                Главная
                            </Button>
                            <Button color="inherit" component={Link} to="/clients"
                                    sx={{color: '#fff', '&:hover': {backgroundColor: '#555'}}}>
                                Клиенты
                            </Button>
                            <Button
                                color="inherit"
                                href="/accounts/logout/"
                                sx={{color: '#fff', '&:hover': {backgroundColor: '#555'}}}
                            >
                                Выход
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={{mt: 2}}>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/employees" element={<ClientList/>}/> {/* Временный маршрут */}
                        <Route path="/services" element={<ClientList/>}/> {/* Временный маршрут */}
                        <Route path="/projects" element={<ClientList/>}/> {/* Временный маршрут */}
                        <Route path="/campaigns" element={<ClientList/>}/> {/* Временный маршрут */}
                        <Route path="/requests" element={<ClientList/>}/> {/* Временный маршрут */}
                        <Route path="/reports" element={<ClientList/>}/> {/* Временный маршрут */}
                        <Route path="/clients" element={<ClientList/>}/>
                        <Route path="/clients/add" element={<ClientForm/>}/>
                        <Route path="/clients/edit/:id" element={<ClientForm/>}/>
                    </Routes>
                </Box>
            </div>
        </Router>
    );
}

export default App;
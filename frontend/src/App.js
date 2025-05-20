import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import ClientList from './pages/ClientList';
import ClientForm from './pages/ClientForm';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import ServiceList from './pages/ServiceList';
import ServiceForm from './pages/ServiceForm';
import ProjectList from './pages/ProjectList';
import ProjectForm from './pages/ProjectForm';
import CampaignList from './pages/CampaignList';
import CampaignForm from './pages/CampaignForm';
import RequestList from './pages/RequestList';
import RequestForm from './pages/RequestForm';
import ReportList from './pages/ReportList';
import ReportForm from './pages/ReportForm';
import Dashboard from './pages/Dashboard';
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
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
                            <Button color="inherit" component={Link} to="/employees"
                                    sx={{color: '#fff', '&:hover': {backgroundColor: '#555'}}}>
                                Сотрудники
                            </Button>
                            <Button color="inherit" component={Link} to="/services"
                                    sx={{color: '#fff', '&:hover': {backgroundColor: '#555'}}}>
                                Услуги
                            </Button>
                            <Button color="inherit" component={Link} to="/projects"
                                    sx={{color: '#fff', '&:hover': {backgroundColor: '#555'}}}>
                                Проекты
                            </Button>
                            <Button color="inherit" component={Link} to="/campaigns"
                                    sx={{color: '#fff', '&:hover': {backgroundColor: '#555'}}}>
                                Кампании
                            </Button>
                            <Button color="inherit" component={Link} to="/requests"
                                    sx={{color: '#fff', '&:hover': {backgroundColor: '#555'}}}>
                                Заявки
                            </Button>
                            <Button color="inherit" component={Link} to="/reports"
                                    sx={{color: '#fff', '&:hover': {backgroundColor: '#555'}}}>
                                Отчёты
                            </Button>
                            <Button
                                color="inherit"
                                href="/accounts/logout/"
                                sx={{color: '#ff2e2e', '&:hover': {backgroundColor: '#555'}}}
                            >
                                Выход
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={{mt: 2}}>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/clients" element={<ClientList/>}/>
                        <Route path="/clients/add" element={<ClientForm/>}/>
                        <Route path="/clients/edit/:id" element={<ClientForm/>}/>
                        <Route path="/employees" element={<EmployeeList/>}/>
                        <Route path="/employees/add" element={<EmployeeForm/>}/>
                        <Route path="/employees/edit/:id" element={<EmployeeForm/>}/>
                        <Route path="/services" element={<ServiceList/>}/>
                        <Route path="/services/add" element={<ServiceForm/>}/>
                        <Route path="/services/edit/:id" element={<ServiceForm/>}/>
                        <Route path="/projects" element={<ProjectList/>}/>
                        <Route path="/projects/add" element={<ProjectForm/>}/>
                        <Route path="/projects/edit/:id" element={<ProjectForm/>}/>
                        <Route path="/campaigns" element={<CampaignList/>}/>
                        <Route path="/campaigns/add" element={<CampaignForm/>}/>
                        <Route path="/campaigns/edit/:id" element={<CampaignForm/>}/>
                        <Route path="/requests" element={<RequestList/>}/>
                        <Route path="/requests/add" element={<RequestForm/>}/>
                        <Route path="/requests/edit/:id" element={<RequestForm/>}/>
                        <Route path="/reports" element={<ReportList/>}/>
                        <Route path="/reports/add" element={<ReportForm/>}/>
                        <Route path="/reports/edit/:id" element={<ReportForm/>}/>
                    </Routes>
                </Box>
            </div>
        </Router>
    );
}

export default App;
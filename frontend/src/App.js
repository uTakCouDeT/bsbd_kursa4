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
    // Массив объектов для навигации
    const navItems = [
        {name: 'Главная', path: '/', listComponent: Dashboard},
        {name: 'Клиенты', path: '/clients', listComponent: ClientList, formComponent: ClientForm},
        {name: 'Сотрудники', path: '/employees', listComponent: EmployeeList, formComponent: EmployeeForm},
        {name: 'Услуги', path: '/services', listComponent: ServiceList, formComponent: ServiceForm},
        {name: 'Проекты', path: '/projects', listComponent: ProjectList, formComponent: ProjectForm},
        {name: 'Кампании', path: '/campaigns', listComponent: CampaignList, formComponent: CampaignForm},
        {name: 'Заявки', path: '/requests', listComponent: RequestList, formComponent: RequestForm},
        {name: 'Отчёты', path: '/reports', listComponent: ReportList, formComponent: ReportForm},
    ];

    return (
        <Router>
            <div className="App">
                <AppBar position="static" sx={{backgroundColor: '#333', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="h6" sx={{color: '#fff'}}>
                            Маркетинговое агентство
                        </Typography>
                        <Box>
                            {navItems.map((item) => (
                                <Button
                                    key={item.name}
                                    color="inherit"
                                    component={Link}
                                    to={item.path}
                                    sx={{color: '#fff', '&:hover': {backgroundColor: '#555'}}}
                                >
                                    {item.name}
                                </Button>
                            ))}
                            <Button color="inherit" href="/accounts/logout/"
                                    sx={{color: '#ff2e2e', '&:hover': {backgroundColor: '#555'}}}>
                                Выход
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={{mt: 2}}>
                    <Routes>
                        {navItems.map((item) => (
                            <React.Fragment key={item.name}>
                                <Route path={item.path} element={<item.listComponent/>}/>
                                {item.formComponent && (
                                    <>
                                        <Route path={`${item.path}/add`} element={<item.formComponent/>}/>
                                        <Route path={`${item.path}/edit/:id`} element={<item.formComponent/>}/>
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </Routes>
                </Box>
            </div>
        </Router>
    );
}

export default App;
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from '../axios';
import {Box, Typography, Paper, Grid} from '@mui/material';

const Dashboard = () => {
    const [tableData, setTableData] = useState({
        clients: 0,
        employees: 0,
        services: 0,
        projects: 0,
        campaigns: 0,
        requests: 0,
        reports: 0,
    });

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const endpoints = [
                    'clients',
                    'employees',
                    'services',
                    'projects',
                    'campaigns',
                    'requests',
                    'reports',
                ];

                const results = await Promise.all(
                    endpoints.map(async (endpoint) => {
                        try {
                            const response = await axios.get(`/api/${endpoint}/`);
                            return {[endpoint]: response.data.length};
                        } catch (error) {
                            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                                window.location.href = '/accounts/login/';
                                return {[endpoint]: 0};
                            }
                            console.error(`Ошибка при загрузке ${endpoint}:`, error);
                            return {[endpoint]: 0};
                        }
                    })
                );

                const newData = results.reduce((acc, curr) => ({...acc, ...curr}), {});
                setTableData(newData);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchTableData();
    }, []);

    const tables = [
        {name: 'Клиенты', key: 'clients', count: tableData.clients, path: '/clients'},
        {name: 'Сотрудники', key: 'employees', count: tableData.employees, path: '/employees'},
        {name: 'Услуги', key: 'services', count: tableData.services, path: '/services'},
        {name: 'Проекты', key: 'projects', count: tableData.projects, path: '/projects'},
        {name: 'Кампании', key: 'campaigns', count: tableData.campaigns, path: '/campaigns'},
        {name: 'Заявки', key: 'requests', count: tableData.requests, path: '/requests'},
        {name: 'Отчёты', key: 'reports', count: tableData.reports, path: '/reports'},
    ];

    return (
        <Box sx={{p: 3, maxWidth: 960, mx: 'auto'}}>
            <Typography variant="h4" gutterBottom sx={{color: '#333', fontWeight: 500}}>
                Общая информация о системе
            </Typography>
            <Grid container spacing={3}>
                {tables.map((table) => (
                    <Grid item xs={12} sm={6} md={4} key={table.key}>
                        <Paper
                            component={Link}
                            to={table.path}
                            elevation={3}
                            sx={{
                                p: 2,
                                minHeight: 100, // Устанавливаем минимальную высоту для одинакового размера карточек
                                borderRadius: 2,
                                backgroundColor: '#fff',
                                textDecoration: 'none', // Убираем подчёркивание ссылки
                                display: 'block', // Делаем Paper блочным элементом для корректного отображения
                                transition: 'box-shadow 0.3s ease, transform 0.1s ease',
                                '&:hover': {
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <Typography variant="h6" sx={{color: '#333'}}>
                                {table.name}
                            </Typography>
                            <Typography variant="body1" sx={{color: '#666', mt: 1}}>
                                Количество записей: {table.count}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboard;
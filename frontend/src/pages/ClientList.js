import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from '../axios';
import {DataGrid} from '@mui/x-data-grid';
import {IconButton, Box, Typography, Button} from '@mui/material';
import {Edit, Delete, Add} from '@mui/icons-material';

const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('/api/clients/');
                setClients(response.data);
            } catch (error) {
                if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                    window.location.href = '/accounts/login/';
                } else {
                    console.error('Ошибка при загрузке клиентов:', error);
                }
            }
        };
        fetchClients();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить клиента?')) {
            try {
                await axios.delete(`/api/clients/${id}/`);
                setClients(clients.filter(client => client.id !== id));
            } catch (error) {
                if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                    window.location.href = '/accounts/login/';
                } else {
                    console.error('Ошибка при удалении клиента:', error);
                }
            }
        }
    };

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.5},
        {field: 'name', headerName: 'Имя', flex: 1},
        {field: 'contact_info', headerName: 'Контактная информация', flex: 1.5},
        {field: 'interaction_history', headerName: 'История взаимодействий', flex: 2},
        {
            field: 'actions',
            headerName: 'Действия',
            flex: 1,
            renderCell: (params) => (
                <>
                    <IconButton component={Link} to={`/clients/edit/${params.row.id}`} color="primary">
                        <Edit/>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)} color="error">
                        <Delete/>
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Box sx={{p: 3}}>
            <Typography variant="h4" gutterBottom>
                Клиенты
            </Typography>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={clients}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {pageSize: 5},
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    disableRowSelectionOnClick
                />
            </div>
            <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-start'}}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add/>}
                    component={Link}
                    to="/clients/add"
                >
                    Добавить клиента
                </Button>
            </Box>
        </Box>
    );
};

export default ClientList;
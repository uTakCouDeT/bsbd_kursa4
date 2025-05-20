import React, {useState, useEffect} from 'react';
import TableView from '../components/TableView';
import axios from '../axios';

const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('/api/clients/');
                setClients(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке клиентов:', error);
            }
        };
        fetchClients();
    }, []);

    const handleDelete = async (id) => {
        // if (window.confirm('Вы уверены, что хотите удалить клиента?')) {
        try {
            await axios.delete(`/api/clients/${id}/`);
            setClients(clients.filter(client => client.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении клиента:', error);
        }
        // }
    };

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.5},
        {field: 'name', headerName: 'Имя', flex: 1},
        {field: 'contact_info', headerName: 'Контактная информация', flex: 1.5},
        {field: 'interaction_history', headerName: 'История взаимодействий', flex: 2},
    ];

    return (
        <TableView
            endpoint="/api/clients/"
            columns={columns}
            title="Клиенты"
            editPath="/clients/edit"
            addPath="/clients/add"
            onDelete={handleDelete}
            data={clients}
        />
    );
};

export default ClientList;
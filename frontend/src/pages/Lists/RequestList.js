import React, {useState, useEffect} from 'react';
import TableView from '../../components/TableView';
import axios from '../../axios';

const RequestList = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/requests/');
                setRequests(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке заявок:', error);
            }
        };
        fetchRequests();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/requests/${id}/`);
            setRequests(requests.filter(request => request.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении заявки:', error);
        }
    };

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.5},
        {field: 'client', headerName: 'Клиент', flex: 1, type: 'foreignKey'},
        {field: 'project', headerName: 'Проект', flex: 1, type: 'foreignKey'},
        {field: 'service', headerName: 'Услуга', flex: 1, type: 'foreignKey'},
        {field: 'created_at', headerName: 'Время создания', flex: 1, type: 'datetime'},
        {field: 'cost', headerName: 'Стоимость', flex: 1},
    ];

    return (
        <TableView
            endpoint="/api/requests/"
            columns={columns}
            title="Заявки"
            editPath="/requests/edit"
            addPath="/requests/add"
            onDelete={handleDelete}
            data={requests}
        />
    );
};

export default RequestList;
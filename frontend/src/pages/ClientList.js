import React, {useState, useEffect} from 'react';
import axios from '../axios';
import {Link, useNavigate} from 'react-router-dom';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('/api/clients/');
                setClients(response.data);
            } catch (error) {
                if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                    // Перенаправляем на страницу логина Django
                    window.location.href = '/accounts/login/';
                } else {
                    console.error('Ошибка при загрузке клиентов:', error);
                }
            }
        };
        fetchClients();
    }, [navigate]);

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

    return (
        <div>
            <h2>Список клиентов</h2>
            <Link to="/clients/add">Добавить клиента</Link>
            <table>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Контактная информация</th>
                    <th>История взаимодействий</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.contact_info}</td>
                        <td>{client.interaction_history}</td>
                        <td>
                            <Link to={`/clients/edit/${client.id}`}>Редактировать</Link>
                            {' | '}
                            <button onClick={() => handleDelete(client.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;
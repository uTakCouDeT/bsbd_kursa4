import React, {useState, useEffect} from 'react';
import axios from '../axios';
import {useParams, useNavigate} from 'react-router-dom';

const ClientForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        contact_info: '',
        interaction_history: ''
    });

    useEffect(() => {
        if (id) {
            const fetchClient = async () => {
                try {
                    const response = await axios.get(`/api/clients/${id}/`);
                    setFormData(response.data);
                } catch (error) {
                    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                        window.location.href = '/accounts/login/';
                    } else {
                        console.error('Ошибка при загрузке клиента:', error);
                    }
                }
            };
            fetchClient();
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`/api/clients/${id}/`, formData);
            } else {
                await axios.post('/api/clients/', formData);
            }
            navigate('/clients');
        } catch (error) {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                window.location.href = '/accounts/login/';
            } else {
                console.error('Ошибка при сохранении клиента:', error);
            }
        }
    };

    return (
        <div>
            <h2>{id ? 'Редактировать клиента' : 'Добавить клиента'}</h2>
            <form onSubmit={handleSubmit}>
                <label>Имя:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label>Контактная информация:</label>
                <input
                    type="text"
                    name="contact_info"
                    value={formData.contact_info}
                    onChange={handleChange}
                    required
                />
                <label>История взаимодействий:</label>
                <textarea
                    name="interaction_history"
                    value={formData.interaction_history}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
};

export default ClientForm;
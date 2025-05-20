import React, {useState, useEffect} from 'react';
import axios from '../axios';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, TextField, Button, Typography} from '@mui/material';

const FormView = ({endpoint, fields}) => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${endpoint}${id}/`);
                    setFormData(response.data);
                } catch (error) {
                    console.error('Ошибка при загрузке данных:', error);
                }
            }
        };
        fetchData();
    }, [id, endpoint]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`${endpoint}${id}/`, formData);
            } else {
                await axios.post(endpoint, formData);
            }
            navigate(-1); // Возвращаемся назад после сохранения
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error);
        }
    };

    return (
        <Box sx={{p: 3, maxWidth: 600, mx: 'auto'}}>
            <Typography variant="h5" gutterBottom>
                {id ? 'Редактировать клиента' : 'Добавить клиента'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <TextField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        fullWidth
                        required={field.required}
                        margin="normal"
                        variant="outlined"
                    />
                ))}
                <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
                    Сохранить
                </Button>
            </Box>
        </Box>
    );
};

export default FormView;
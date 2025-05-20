import React, {useState, useEffect} from 'react';
import axios from '../axios';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Typography, TextField, Button, Paper} from '@mui/material';

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
            navigate(-1);
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error);
        }
    };

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', p: 3}}>
            <Paper elevation={3} sx={{p: 4, maxWidth: '90%', width: 600, borderRadius: 2}}>
                <Typography variant="h5" gutterBottom sx={{color: '#333', fontWeight: 500}}>
                    {id ? 'Редактировать клиента' : 'Добавить клиента'}
                </Typography>
                <form onSubmit={handleSubmit}>
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
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: '#666',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#1976d2',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#ccc',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                },
                            }}
                        />
                    ))}
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', mt: 2}}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#1976d2',
                                '&:hover': {backgroundColor: '#1565c0'},
                            }}
                        >
                            Сохранить
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default FormView;
import React, {useState, useEffect} from 'react';
import axios from '../axios';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Typography, TextField, Button, Paper, Select, MenuItem, FormControl, InputLabel} from '@mui/material';

const FormView = ({endpoint, fields}) => {
    const [formData, setFormData] = useState({});
    const [selectOptions, setSelectOptions] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();

    // Форматирование даты из UTC в локальный формат для datetime-local
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    // Преобразование даты из локального формата в UTC для отправки на сервер
    const formatDateForServer = (dateString) => {
        if (!dateString) return null;
        // Разбираем строку в формате YYYY-MM-DDThh:mm
        const [datePart, timePart] = dateString.split('T');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);

        // Создаём дату в UTC, используя значения как есть (без смещения часового пояса)
        const date = new Date(Date.UTC(year, month - 1, day, hours, minutes));
        return date.toISOString();
    };

    // Загрузка данных для редактирования
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${endpoint}${id}/`);
                    const data = response.data;

                    // Преобразование данных для полей
                    const transformedData = {};
                    fields.forEach((field) => {
                        if (field.type === 'select' && data[field.name]) {
                            // Для ForeignKey берём только ID и добавляем поле с суффиксом _id
                            const foreignKeyId = data[field.name]?.id || data[`${field.name}_id`] || '';
                            transformedData[field.name] = foreignKeyId;
                            transformedData[`${field.name}_id`] = foreignKeyId;
                        } else if (field.type === 'datetime-local' && data[field.name]) {
                            // Для datetime-local преобразуем ISO-строку
                            transformedData[field.name] = formatDateForInput(data[field.name]);
                        } else {
                            // Для остальных полей берём значение как есть
                            transformedData[field.name] = data[field.name] || '';
                        }
                    });

                    setFormData(transformedData);
                } catch (error) {
                    console.error('Ошибка при загрузке данных:', error);
                }
            }
        };
        fetchData();
    }, [id, endpoint, fields]);

    // Загрузка данных для полей типа Select (ForeignKey)
    useEffect(() => {
        const fetchSelectOptions = async () => {
            const options = {};
            for (const field of fields) {
                if (field.type === 'select' && field.source) {
                    try {
                        const response = await axios.get(field.source);
                        options[field.name] = response.data;
                    } catch (error) {
                        console.error(`Ошибка при загрузке данных для ${field.name}:`, error);
                    }
                }
            }
            setSelectOptions(options);
        };
        fetchSelectOptions();
    }, [fields]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        const field = fields.find(f => f.name === name);
        if (field.type === 'select') {
            setFormData({...formData, [name]: value, [`${name}_id`]: value});
        } else {
            setFormData({...formData, [name]: value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Создаём копию formData для отправки
            const dataToSubmit = {...formData};
            fields.forEach((field) => {
                if (field.type === 'select') {
                    // Удаляем поле без суффикса _id, оставляем только _id
                    delete dataToSubmit[field.name];
                } else if (field.type === 'datetime-local' && dataToSubmit[field.name]) {
                    // Преобразуем дату в UTC перед отправкой
                    dataToSubmit[field.name] = formatDateForServer(dataToSubmit[field.name]);
                }
            });

            if (id) {
                await axios.put(`${endpoint}${id}/`, dataToSubmit);
            } else {
                await axios.post(endpoint, dataToSubmit);
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
                    {id ? 'Редактировать запись' : 'Добавить запись'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <FormControl key={field.name} fullWidth sx={{my: 1}}>
                            {field.type === 'select' ? (
                                <>
                                    <InputLabel>{field.label}</InputLabel>
                                    <Select
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        label={field.label}
                                    >
                                        <MenuItem value="">Выберите...</MenuItem>
                                        {selectOptions[field.name]?.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </>
                            ) : (
                                <TextField
                                    label={field.label}
                                    name={field.name}
                                    type={field.inputType || field.type}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    required={field.required}
                                    variant="outlined"
                                    multiline={field.type === 'textarea'}
                                    rows={field.type === 'textarea' ? 4 : undefined}
                                    placeholder={field.type === 'datetime-local' ? 'Выберите дату и время' : undefined}
                                    InputLabelProps={field.type === 'datetime-local' ? {shrink: true} : undefined}
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
                                        my: 0,
                                    }}
                                />
                            )}
                        </FormControl>
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
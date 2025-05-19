import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

const ClientForm = () => {
  const { id } = useParams();
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: '90%', width: 600, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 500 }}>
          {id ? 'Редактировать клиента' : 'Добавить клиента'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
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
          <TextField
            label="Контактная информация"
            name="contact_info"
            value={formData.contact_info}
            onChange={handleChange}
            fullWidth
            required
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
          <TextField
            label="История взаимодействий"
            name="interaction_history"
            value={formData.interaction_history}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' },
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

export default ClientForm;
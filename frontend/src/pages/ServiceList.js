import React, {useState, useEffect} from 'react';
import TableView from '../components/TableView';
import axios from '../axios';

const ServiceList = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('/api/services/');
                setServices(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке услуг:', error);
            }
        };
        fetchServices();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/services/${id}/`);
            setServices(services.filter(service => service.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении услуги:', error);
        }
    };

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.5},
        {field: 'name', headerName: 'Название', flex: 1},
        {field: 'category', headerName: 'Категория', flex: 1},
        {field: 'cost', headerName: 'Стоимость', flex: 1},
    ];

    return (
        <TableView
            endpoint="/api/services/"
            columns={columns}
            title="Услуги"
            editPath="/services/edit"
            addPath="/services/add"
            onDelete={handleDelete}
            data={services}
        />
    );
};

export default ServiceList;
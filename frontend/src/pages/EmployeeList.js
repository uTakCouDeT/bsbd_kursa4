import React, {useState, useEffect} from 'react';
import TableView from '../components/TableView';
import axios from '../axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('/api/employees/');
                setEmployees(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке сотрудников:', error);
            }
        };
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/employees/${id}/`);
            setEmployees(employees.filter(employee => employee.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении сотрудника:', error);
        }
    };

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.5},
        {field: 'name', headerName: 'Имя', flex: 1},
        {field: 'position', headerName: 'Должность', flex: 1},
        {field: 'contact_info', headerName: 'Контактная информация', flex: 1.5},
    ];

    return (
        <TableView
            endpoint="/api/employees/"
            columns={columns}
            title="Сотрудники"
            editPath="/employees/edit"
            addPath="/employees/add"
            onDelete={handleDelete}
            data={employees}
        />
    );
};

export default EmployeeList;
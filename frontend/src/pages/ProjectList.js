import React, {useState, useEffect} from 'react';
import TableView from '../components/TableView';
import axios from '../axios';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/projects/');
                setProjects(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке проектов:', error);
            }
        };
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/projects/${id}/`);
            setProjects(projects.filter(project => project.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении проекта:', error);
        }
    };

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.5},
        {field: 'name', headerName: 'Название', flex: 1},
        {field: 'deadline', headerName: 'Срок выполнения', flex: 1},
        {field: 'employee', headerName: 'Сотрудник', flex: 1, valueGetter: (params) => params.row.employee?.name},
        {field: 'budget', headerName: 'Бюджет', flex: 1},
    ];

    return (
        <TableView
            endpoint="/api/projects/"
            columns={columns}
            title="Проекты"
            editPath="/projects/edit"
            addPath="/projects/add"
            onDelete={handleDelete}
            data={projects}
        />
    );
};

export default ProjectList;
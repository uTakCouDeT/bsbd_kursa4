import React from 'react';
import FormView from '../components/FormView';

const fields = [
    {name: 'name', label: 'Название', type: 'text', required: true},
    {name: 'deadline', label: 'Срок выполнения', type: 'datetime-local', required: true},
    {name: 'employee', label: 'Сотрудник', type: 'select', source: '/api/employees/', required: true},
    {name: 'budget', label: 'Бюджет', type: 'number', required: true},
];

const ProjectForm = () => {
    return <FormView endpoint="/api/projects/" fields={fields} title="Запись проекта"/>;
};

export default ProjectForm;
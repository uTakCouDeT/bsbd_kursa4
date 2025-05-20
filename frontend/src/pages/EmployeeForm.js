import React from 'react';
import FormView from '../components/FormView';

const fields = [
    {name: 'name', label: 'Имя', type: 'text', required: true},
    {name: 'position', label: 'Должность', type: 'text', required: true},
    {name: 'contact_info', label: 'Контактная информация', type: 'text', required: true},
];

const EmployeeForm = () => {
    return <FormView endpoint="/api/employees/" fields={fields} title="Запись сотрудника"/>;
};

export default EmployeeForm;
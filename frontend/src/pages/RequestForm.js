import React from 'react';
import FormView from '../components/FormView';

const fields = [
    {name: 'client', label: 'Клиент', type: 'select', source: '/api/clients/', required: true},
    {name: 'project', label: 'Проект', type: 'select', source: '/api/projects/', required: false},
    {name: 'service', label: 'Услуга', type: 'select', source: '/api/services/', required: true},
    {name: 'cost', label: 'Стоимость', type: 'number', required: false},
];

const RequestForm = () => {
    return <FormView endpoint="/api/requests/" fields={fields} title="Запись заявки"/>;
};

export default RequestForm;
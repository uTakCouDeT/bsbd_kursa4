import React from 'react';
import FormView from '../components/FormView';

const fields = [
    {name: 'name', label: 'Имя', type: 'text', required: true},
    {name: 'contact_info', label: 'Контактная информация', type: 'text', required: true},
    {name: 'interaction_history', label: 'История взаимодействий', type: 'text'},
];

const ClientForm = () => {
    return <FormView endpoint="/api/clients/" fields={fields}/>;
};

export default ClientForm;
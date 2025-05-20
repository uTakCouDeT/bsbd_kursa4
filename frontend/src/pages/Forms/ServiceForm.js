import React from 'react';
import FormView from '../../components/FormView';

const fields = [
    {name: 'name', label: 'Название', type: 'text', required: true},
    {name: 'category', label: 'Категория', type: 'text', required: true},
    {name: 'cost', label: 'Стоимость', type: 'number', required: true},
];

const ServiceForm = () => {
    return <FormView endpoint="/api/services/" fields={fields}/>;
};

export default ServiceForm;
import React from 'react';
import FormView from '../components/FormView';

const fields = [
    {name: 'name', label: 'Название', type: 'text', required: true},
    {name: 'goal', label: 'Цель', type: 'text', required: true},
    {name: 'deadline', label: 'Срок выполнения', type: 'datetime-local', required: true},
    {name: 'budget', label: 'Бюджет', type: 'number', required: true},
];

const CampaignForm = () => {
    return <FormView endpoint="/api/campaigns/" fields={fields} title="Запись кампании"/>;
};

export default CampaignForm;
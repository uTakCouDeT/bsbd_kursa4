import React from 'react';
import FormView from '../components/FormView';

const fields = [
    {name: 'project', label: 'Проект', type: 'select', source: '/api/projects/', required: true},
    {name: 'campaign', label: 'Кампания', type: 'select', source: '/api/campaigns/', required: true},
    {name: 'employee', label: 'Сотрудник', type: 'select', source: '/api/employees/', required: true},
    {name: 'performance_metrics', label: 'Показатель эффективности', type: 'text', required: true},
    {name: 'financial_flow', label: 'Движение денежных средств', type: 'text', required: true},
    {name: 'conclusions', label: 'Выводы и рекомендации', type: 'text', required: true},
];

const ReportForm = () => {
    return <FormView endpoint="/api/reports/" fields={fields} title="Запись отчёта"/>;
};

export default ReportForm;
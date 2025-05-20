import React, {useState, useEffect} from 'react';
import TableView from '../../components/TableView';
import axios from '../../axios';

const ReportList = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('/api/reports/');
                setReports(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке отчётов:', error);
            }
        };
        fetchReports();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/reports/${id}/`);
            setReports(reports.filter(report => report.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении отчёта:', error);
        }
    };

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.5},
        {field: 'project', headerName: 'Проект', flex: 1, type: 'foreignKey'},
        {field: 'campaign', headerName: 'Кампания', flex: 1, type: 'foreignKey'},
        {field: 'employee', headerName: 'Сотрудник', flex: 1, type: 'foreignKey'},
        {field: 'performance_metrics', headerName: 'Показатель эффективности', flex: 1.5},
        {field: 'financial_flow', headerName: 'Движение денежных средств', flex: 1.5},
        {field: 'conclusions', headerName: 'Выводы и рекомендации', flex: 2},
    ];

    return (
        <TableView
            endpoint="/api/reports/"
            columns={columns}
            title="Отчёты"
            editPath="/reports/edit"
            addPath="/reports/add"
            onDelete={handleDelete}
            data={reports}
        />
    );
};

export default ReportList;
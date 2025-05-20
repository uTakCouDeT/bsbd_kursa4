import React, {useState, useEffect} from 'react';
import TableView from '../../components/TableView';
import axios from '../../axios';

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get('/api/campaigns/');
                setCampaigns(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке кампаний:', error);
            }
        };
        fetchCampaigns();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/campaigns/${id}/`);
            setCampaigns(campaigns.filter(campaign => campaign.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении кампании:', error);
        }
    };

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.5},
        {field: 'name', headerName: 'Название', flex: 1},
        {field: 'goal', headerName: 'Цель', flex: 1.5},
        {field: 'deadline', headerName: 'Срок выполнения', flex: 1, type: 'datetime'},
        {field: 'budget', headerName: 'Бюджет', flex: 1},
    ];

    return (
        <TableView
            endpoint="/api/campaigns/"
            columns={columns}
            title="Кампании"
            editPath="/campaigns/edit"
            addPath="/campaigns/add"
            onDelete={handleDelete}
            data={campaigns}
        />
    );
};

export default CampaignList;
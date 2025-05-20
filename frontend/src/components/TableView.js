import React from 'react';
import {Link} from 'react-router-dom';
import {DataGrid} from '@mui/x-data-grid';
import {IconButton, Box, Typography, Button} from '@mui/material';
import {Edit, Delete, Add} from '@mui/icons-material';

const TableView = ({endpoint, columns, title, editPath, addPath, onDelete, data}) => {
    // Форматирование даты в читаемый вид (используем UTC-методы)
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    // Преобразование столбцов для корректного отображения ForeignKey и дат
    const processedColumns = columns.map((col) => {
        if (col.type === 'foreignKey') {
            return {
                ...col,
                valueGetter: (value) => value?.name || value?.id || '-',
            };
        }
        if (col.type === 'datetime') {
            return {
                ...col,
                valueGetter: (value) => (value ? formatDate(value) : '-'),
            };
        }
        return col;
    });

    const actionColumn = {
        field: 'actions',
        headerName: 'Действия',
        flex: 1,
        renderCell: (params) => (
            <>
                <IconButton component={Link} to={`${editPath}/${params.row.id}`} color="primary">
                    <Edit/>
                </IconButton>
                <IconButton onClick={() => onDelete(params.row.id)} color="error">
                    <Delete/>
                </IconButton>
            </>
        ),
    };

    const allColumns = [...processedColumns, actionColumn];

    return (
        <Box sx={{p: 3}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                <Typography variant="h4">
                    {title}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add/>}
                    component={Link}
                    to={addPath}
                >
                    Добавить
                </Button>
            </Box>
            <div style={{height: 'auto', width: '100%'}}>
                <DataGrid
                    rows={data}
                    columns={allColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    autoHeight
                    disableSelectionOnClick
                />
            </div>
        </Box>
    );
};

export default TableView;
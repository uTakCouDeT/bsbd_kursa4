import React from 'react';
import {Link} from 'react-router-dom';
import {DataGrid} from '@mui/x-data-grid';
import {IconButton, Box, Typography, Button} from '@mui/material';
import {Edit, Delete, Add} from '@mui/icons-material';

const TableView = ({endpoint, columns, title, editPath, addPath, onDelete, data}) => {
    // Форматирование даты в читаемый вид
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Преобразование столбцов для корректного отображения ForeignKey и дат
    const processedColumns = columns.map((col) => {
        if (col.type === 'foreignKey') {
            return {
                ...col,
                valueGetter: (value) => {
                    return value?.name || value?.id || '-';
                }
            };
        }
        if (col.type === 'datetime') {
            return {
                ...col,
                valueGetter: (value) => {
                    return value ? formatDate(value) : '-';
                }
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
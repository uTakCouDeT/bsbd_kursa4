import React from 'react';
import {Link} from 'react-router-dom';
import {DataGrid} from '@mui/x-data-grid';
import {IconButton, Box, Typography, Button} from '@mui/material';
import {Edit, Delete, Add} from '@mui/icons-material';

const TableView = ({endpoint, columns, title, editPath, addPath, onDelete, data}) => {
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

    const allColumns = [...columns, actionColumn];

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
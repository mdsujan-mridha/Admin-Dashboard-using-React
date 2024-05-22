

import { Box, Button, useTheme } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { blue, pink } from '@mui/material/colors';

const Property = () => {
    const [adminProperties, setAdminProperties] = useState([]);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {

        fetch(`https://rental-property-mobile-apps.vercel.app/api/v1/properties/admin`)
            .then(res => res.json())
            .then(data => setAdminProperties(data.properties));

    }, []);

    const deleteProductHandler = (id) => {
        try {

            fetch(`https://rental-property-mobile-apps.vercel.app/api/v1/property/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        alert(data.message);
                        window.location.reload();
                    }
                    else {
                        alert(data.message);
                    }
                })

        } catch (error) {
            alert("Error When try to delete Property", error)

        }
    }

    function generateRandom() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    const columns = [
        { field: "_id", headerName: "ID" },
        {
            field: "title",
            headerName: "Title",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "rentPrice",
            headerName: "Rent Price",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "location",
            headerName: "Location",
            flex: 1,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to="/">
                            <Edit sx={{ color: blue[500] }} />
                        </Link>

                        <Button
                            onClick={() => deleteProductHandler(params.row._id)}
                        >
                            <Delete sx={{ color: pink[500] }} />
                        </Button>
                    </Fragment>
                );
            },
        },

    ];
    return (
        <Box m="20px">
            <Header title="ALL-PROPERTIES" subtitle="Managing the properties" />
            <Box
                m="40px 0 0 0"
                height="75vh"

                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={adminProperties} columns={columns}
                    getRowId={(row) => generateRandom()}
                    row={adminProperties} />
            </Box>
        </Box>
    );
};

export default Property;
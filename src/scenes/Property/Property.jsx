

import { Box, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { mockDataTeam } from '../../data/mockData';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';

const Property = () => {
    const [adminProperties, setAdminProperties] = useState([]);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {

        fetch(`https://rental-property-mobile-apps.vercel.app/api/v1/properties/admin`)
            .then(res => res.json())
            .then(data => setAdminProperties(data.properties));

    }, []);

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
            field: "accessLevel",
            headerName: "Access Level",
            flex: 1,
            renderCell: ({ row: { access } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            access === "admin"
                                ? colors.greenAccent[600]
                                : access === "manager"
                                    ? colors.greenAccent[700]
                                    : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                        {access === "manager" && <SecurityOutlinedIcon />}
                        {access === "user" && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {access}
                        </Typography>
                    </Box>
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
                getRowId={(row) =>  generateRandom()}
                row={adminProperties}/>
            </Box>
        </Box>
    );
};

export default Property;
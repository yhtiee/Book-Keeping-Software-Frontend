import React from 'react';
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from '../../Components/Header';
import FlexBetween from '../../Components/FlexBetween';
import { CreateOutlined, DeleteOutline, DeleteOutlined, EditOffOutlined, EditOutlined, PointOfSale, PointOfSaleOutlined } from '@mui/icons-material';

const Sales = () => {
    const theme = useTheme();  
    const columns = [
      {
        field: "_id",
        headerName: "ID",
        flex: 0.4,
      },
      {
        field: "product_name",
        headerName: "Product Name",
        flex: 0.7,
      },
      {
        field: "category",
        headerName: "Product Category",
        flex: 0.7,
      },
      {
        field: "price",
        headerName: "Price",
        flex: 0.5,
      },
      {
        field: "quantity_sold",
        headerName: "Quantity Sold",
        flex: 0.5,
      },
      {
        field: "selling_price",
        headerName: "Selling Price",
        flex: 0.5,
      },
      {
        field: "total",
        headerName: "Total",
        flex: 0.5,
      },
      {
        field: "date_sold",
        headerName: "Date",
        flex: 0.5,
      },
      {
        field: "action",
        headerName: "Actions",
        flex: 1,
        renderCell: (params) => {
            return (
                <>
                    <Box> 
                          <button onClick={event => view(event, params)} className='view'>
                            View
                          </button>
                        <button onClick={event => handleDeleteClick(event, params)} className='delete'>
                            Delete
                        </button>
                          <button onClick={event => edit(event, params)} className='edit'>
                            Edit
                          </button>
                    </Box>
                </>
            )
        }
      },
    ];

  return (
    <Box m="1.5rem 2.5rem">
        <FlexBetween>
            <Header title="SALES" subtitle="Sales Record" />
            <Box>
          <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                
              }}
            >
              <PointOfSaleOutlined  sx={{fontSize: "28px" }} onClick = {() => {console.log("hello")}} />
              Add Sales
          </Button>
        </Box>
            
        </FlexBetween>
        <Box
        mt="40px"
        height="70vh"
        sx={{
            "& .MuiDataGrid-root": {
            border: "none",
            },
            "& .MuiDataGrid-cell": {
            borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
            },
        }}
        >
        <DataGrid
            // loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={[]}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
        />
        </Box>
    </Box>
  )
}

export default Sales
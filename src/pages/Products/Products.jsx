import React from 'react';
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from '../../Components/Header';
import FlexBetween from '../../Components/FlexBetween';
import { AddBusiness, AddShoppingCartOutlined, CreateOutlined, CreateRounded, ShoppingCartOutlined } from '@mui/icons-material';

const Products = () => {
    const theme = useTheme();  
    const columns = [
      {
        field: "id",
        headerName: "ID",
        flex: 0.5,
      },
      {
        field: "product_name",
        headerName: "Product Name",
        flex: 1,
      },
      {
        field: "category",
        headerName: "Product Category",
        flex: 1,
      },
      {
        field: "price",
        headerName: "Price",
        flex: 0.5,
      },
      {
        field: "quantity",
        headerName: "Quantity",
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
        <Box> 
        <FlexBetween>
        <Header title="PRODUCTS" subtitle="List of Products" />
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
              <AddShoppingCartOutlined sx={{fontSize: "28px" }}/>
              Add Products
          </Button>
        </Box>
        </FlexBetween>
        </Box>
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

export default Products
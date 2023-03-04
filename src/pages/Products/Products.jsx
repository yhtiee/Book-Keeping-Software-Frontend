import React from 'react';
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from '../../Components/Header';
import FlexBetween from '../../Components/FlexBetween';
import { AddBusiness, AddShoppingCartOutlined, CreateOutlined, CreateRounded, ShoppingCartOutlined } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';

const Products = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handelSubmit = () => {
      console.log("hi")
    }

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
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              backgroundColor: theme.palette.background.alt,
              boxShadow: 24,
              p: 4,
            }}>
              <Typography id="transition-modal-title" variant="h4" component="h1" color={theme.palette.secondary.light} marginBottom="1rem">
                NEW PRODUCT
              </Typography>
              <form onSubmit={handelSubmit}>
                <Box
                  sx={{
                    '& > :not(style)': {width: '100%' },
                    
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Box sx={{ display:"flex", width:700, justifyContent:"space-between", flexWrap:"wrap", gap: "1rem"}}>
                  <TextField required type="text" id="outlined-basic" label="Product Name" variant="outlined" color='secondary' />
                  <TextField required type="text" id="outlined-basic" label="Product Category" variant="outlined" color='secondary' />
                  <TextField required type="number" id="outlined-basic" label="Quantity" variant="outlined" color='secondary' />
                  <TextField required type="number" id="outlined-basic" label="Price" variant="outlined" color='secondary' />
                  <Button
                    sx={{
                      backgroundColor: theme.palette.secondary.light,
                      color: theme.palette.background.alt,
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      '&:hover': {
                        border: `1px solid ${theme.palette.secondary.light}`,
                        color: theme.palette.secondary.light,
                      }
                    }}
                    onClick={handelSubmit}
                  >
                    Submit
                  </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Fade>
        </Modal>
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
                '&:hover': {
                  border: `1px solid ${theme.palette.secondary.light}`,
                  color: theme.palette.secondary.light,
                }
              }}
              onClick={handleOpen}
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
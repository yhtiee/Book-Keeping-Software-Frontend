import React from 'react';
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from '../../Components/Header';
import FlexBetween from '../../Components/FlexBetween';
import { CreateOutlined, ReceiptLongOutlined } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';


const Expenses = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handelSubmit = () => {
      console.log("hi")
    }

    const theme = useTheme();  
    const columns = [
      {
        field: "_id",
        headerName: "ID",
        flex: 0.4,
      },
      {
        field: "expense",
        headerName: "Expense",
        flex: 0.7,
      },
      {
        field: "expenses_description",
        headerName: "Description",
        flex: 0.5,
      },
      {
        field: "amount",
        headerName: "Amount",
        flex: 0.5,
      },
      {
        field: "date",
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
              {/* <Typography id="transition-modal-title" variant="h6" component="h2">
                NEW EXPENSE
              </Typography> */}
              <form onSubmit={handelSubmit}>
                <Box
                  sx={{
                    '& > :not(style)': {width: '100%' },
                    
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Box sx={{ display:"flex", width:700, justifyContent:"space-between", flexWrap:"wrap", gap: "1rem"}}>
                  <TextField required type="text" id="outlined-basic" label="Expense" variant="outlined" />
                  <TextField required type="number" id="outlined-basic" label="Amount" variant="outlined" />
                  <TextField required type="text" id="outlined-multiline-static" label="Description" variant="outlined" sx={{width:"50rem"}} multiline rows={4}/>
                  <Button
                    sx={{
                      backgroundColor: theme.palette.secondary.light,
                      color: theme.palette.background.alt,
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
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
        <FlexBetween>
            <Header title="EXPENSES" subtitle="Expenses Record" />
            <Box>
              <Button
                  sx={{
                    backgroundColor: theme.palette.secondary.light,
                    color: theme.palette.background.alt,
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                  onClick={handleOpen}
                >
                  <ReceiptLongOutlined sx={{fontSize: "28px" }}/>
                  Add Expenses
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

export default Expenses
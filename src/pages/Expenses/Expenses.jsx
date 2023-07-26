import React, {useContext, useEffect, useState, useRef} from 'react';
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from '../../Components/Header';
import FlexBetween from '../../Components/FlexBetween';
import { CreateOutlined, ReceiptLongOutlined, DeleteOutline, EditOutlined } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import "../../../flow/config"
import * as fcl from "@onflow/fcl"
import ExpenseContext from '../../Context APIs/ExpensesContext';

const Expenses = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openupdate, setOpenUpdate] = React.useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);
    const [opendelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    const [user, setUser] = useState({loggedIn: null})
    const [inputDefault, setDefault] = useState(null)
    const [delExpense, setDelete] = useState(null)
    useEffect(() => fcl.currentUser.subscribe(setUser), [])
    let {createExpenses, retrieveListExpenses, listExpenses, updateExpenses, deleteExpenses} = useContext(ExpenseContext)

    const expense = useRef()
    const amount = useRef()
    const description = useRef()
  
    const handelSubmit = (e) => {
      e.preventDefault()
      let business = JSON.parse(localStorage.getItem("businessName"))
      const Expenses = expense.current.value
      const Amount = amount.current.value
      const Description = description.current.value
      createExpenses(user, business, Expenses, Amount, Description)
      retrieveListExpenses(user)
      retrieveListExpenses(user)
      handleClose()
    }

    const handelUpdate = (e) => {
      e.preventDefault()
      let business = JSON.parse(localStorage.getItem("businessName"))
      const Expenses = expense.current.value
      const Amount = amount.current.value
      const Description = description.current.value
      updateExpenses(user, business, Expenses, Amount, Description, inputDefault?.pk)
      retrieveListExpenses(user)
      retrieveListExpenses(user)
      handleCloseUpdate()
    }

    let showModal = (event, params) => {
      handleOpenUpdate()
      console.log(params.row)
      setDefault(params.row)
    }

    const handleDeleteClick = (event, params) => {
      handleOpenDelete()
      setDelete(params.row)
    }

    const handleDelete = () => {
      deleteExpenses(delExpense?.pk)
      retrieveListExpenses(user)
      retrieveListExpenses(user)
      handleCloseDelete()
    }

    useEffect(() => {
      retrieveListExpenses(user)
      console.log(listExpenses)
    }, [user, listExpenses])


    const theme = useTheme();  
    const columns = [
      {
        field: "expense",
        headerName: "Expense",
        flex: 1,
      },
      {
        field: "description",
        headerName: "Description",
        flex: 2,
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
                    <Box sx={{
                      display:"flex",
                      gap:"2rem"
                    }}> 
                      <DeleteOutline onClick={event => handleDeleteClick(event, params)} sx={{
                        '&:hover':{
                          cursor: "pointer"
                        }
                      }}/>
                      <EditOutlined onClick={event => showModal(event, params)} sx={{
                        '&:hover':{
                          cursor: "pointer"
                        }
                      }}/>
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
          open={openupdate}
          onClose={handleCloseUpdate}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openupdate}>
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
                UPDATE EXPENSE
              </Typography>
              <form >
                <Box
                  sx={{
                    '& > :not(style)': {width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Box sx={{ display:"flex", width:700, justifyContent:"space-between", flexWrap:"wrap", gap: "1rem"}}>
                  <TextField required type="text" id="outlined-basic" label="Expense" variant="outlined" color='secondary' defaultValue={inputDefault?.expense} inputRef={expense}/>
                  <TextField required type="number" id="outlined-basic" label="Amount" variant="outlined" color='secondary' defaultValue={inputDefault?.amount} inputRef={amount}/>
                  <TextField required type="text" id="outlined-multiline-static" label="Description" variant="outlined" sx={{width:"50rem"}} multiline rows={4} color='secondary' defaultValue={inputDefault?.description} inputRef={description}/>
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
                    onClick={handelUpdate}
                  >
                    Update
                  </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Fade>
        </Modal>
       <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={opendelete}
          onClose={handleCloseDelete}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={opendelete}>
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
                DELETE EXPENSE
              </Typography>
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Typography id="transition-modal-title" variant="h4" component="h1" color={theme.palette.secondary.light} marginBottom="1rem">
                Confirm deleting expense
              </Typography>
              <Box sx={{
                display: "flex",
                gap: "3rem"
              }}>
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
                onClick={handleDelete}
              >
                DELETE
              </Button>
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
                onClick={handleCloseDelete}
              >
                CANCEL
              </Button>
              </Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
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
                NEW EXPENSE
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
                  <TextField required type="text" id="outlined-basic" label="Expense" variant="outlined" color='secondary' inputRef={expense}/>
                  <TextField required type="number" id="outlined-basic" label="Amount" variant="outlined" color='secondary' inputRef={amount} />
                  <TextField required type="text" id="outlined-multiline-static" label="Description" variant="outlined" sx={{width:"50rem"}} multiline rows={4} color='secondary' inputRef={description}/>
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
                    '&:hover': {
                      border: `1px solid ${theme.palette.secondary.light}`,
                      color: theme.palette.secondary.light,
                    }
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
            getRowId={(row) => row.pk}
            rows={listExpenses}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[6]}
        />
        </Box>
    </Box>
  )
}

export default Expenses
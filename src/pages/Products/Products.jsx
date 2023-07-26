import React, { useContext, useEffect, useState } from 'react';
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from '../../Components/Header';
import FlexBetween from '../../Components/FlexBetween';
import { AddBusiness, AddShoppingCartOutlined, CreateOutlined, CreateRounded, DeleteOutline, EditOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import { useRef } from "react";
import ProductContext from '../../Context APIs/ProductsContext';
import "../../../flow/config"
import * as fcl from "@onflow/fcl"

const Products = () => {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openupdate, setOpenUpdate] = React.useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);
    const [opendelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    let {createProduct, updateProduct, deleteProduct} = useContext(ProductContext)
    let {retrieveListProduct} = useContext(ProductContext)
    let {listProducts} = useContext(ProductContext)
    const [user, setUser] = useState({loggedIn: null})
    const [inputDefault, setDefault] = useState(null)
    const [delProduct, setDelete] = useState(null)
    useEffect(() => fcl.currentUser.subscribe(setUser), [])

    let productName = useRef()
    let productPrice = useRef()
    let productQuantity = useRef()
    let productCategory = useRef()

    console.log(user)
    
    const handelSubmit = (e) => {
      e.preventDefault()
      let business = JSON.parse(localStorage.getItem("businessName"))
      let productname = productName.current.value
      let productprice = productPrice.current.value
      let productquantity = productQuantity.current.value
      let productcategory = productCategory.current.value
      createProduct(user, business, productname, productprice, productquantity, productcategory)
      retrieveListProduct(user)
      retrieveListProduct(user)
      handleClose()
    }


    const handelUpdate = (e) => {
      e.preventDefault()
      let business = JSON.parse(localStorage.getItem("businessName"))
      let productname = productName.current.value
      let productprice = productPrice.current.value
      let productquantity = productQuantity.current.value
      let productcategory = productCategory.current.value
      updateProduct(user, business, productname, productprice, productquantity, productcategory, inputDefault?.pk)
      retrieveListProduct(user)
      retrieveListProduct(user)
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
      deleteProduct(delProduct?.pk)
      retrieveListProduct(user)
      handleCloseDelete()
    }

    useEffect(() => {
      retrieveListProduct(user)
      console.log(listProducts)
    }, [user, listProducts])

    useEffect(() => {
      retrieveListProduct(user)
      console.log(listProducts)
    }, [user, user])
    
    console.log(listProducts)

    const columns = [
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
                DELETE PRODUCT
              </Typography>
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Typography id="transition-modal-title" variant="h4" component="h1" color={theme.palette.secondary.light} marginBottom="1rem">
                Confirm deleting product
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
                NEW PRODUCT
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
                  <TextField required type="text" id="outlined-basic" label="Product Name" variant="outlined" color='secondary' inputRef={productName} />
                  <TextField required type="text" id="outlined-basic" label="Product Category" variant="outlined" color='secondary' inputRef={productCategory} />
                  <TextField required type="number" id="outlined-basic" label="Quantity" variant="outlined" color='secondary' inputRef={productQuantity}/>
                  <TextField required type="number" id="outlined-basic" label="Price" variant="outlined" color='secondary' inputRef={productPrice}/>
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
                UPDATE PRODUCT
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
                  <TextField required type="text" id="outlined-basic" label="Product Name" variant="outlined" color='secondary' inputRef={productName} defaultValue={inputDefault?.product_name} />
                  <TextField required type="text" id="outlined-basic" label="Product Category" variant="outlined" color='secondary' inputRef={productCategory} defaultValue={inputDefault?.category}/>
                  <TextField required type="number" id="outlined-basic" label="Quantity" variant="outlined" color='secondary' inputRef={productQuantity} defaultValue={inputDefault?.quantity}/>
                  <TextField required type="number" id="outlined-basic" label="Price" variant="outlined" color='secondary' inputRef={productPrice} defaultValue={inputDefault?.price}/>
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
        <div style={{ height: 500, width: '100%' }}>
        <DataGrid
            // loading={isLoading || !data}
            getRowId={(row) => row.pk}
            rows={listProducts}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[6]}
        />
        </div>
        </Box>
    </Box>
  )
}

export default Products
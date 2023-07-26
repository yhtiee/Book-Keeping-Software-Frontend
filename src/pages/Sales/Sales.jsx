import React, {useContext, useEffect, useRef, useState} from 'react';
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from '../../Components/Header';
import FlexBetween from '../../Components/FlexBetween';
import { CreateOutlined, DeleteOutline, DeleteOutlined, EditOffOutlined, EditOutlined, PointOfSale, PointOfSaleOutlined } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import ProductContext from '../../Context APIs/ProductsContext';
import "../../../flow/config"
import * as fcl from "@onflow/fcl"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SalesContext from '../../Context APIs/SalesContext';


const Sales = () => {

    const [product, setProduct] = useState('');
    const handleChange = (event) => {
      setProduct(event.target.value);
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [opendelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    const [openupdate, setOpenUpdate] = React.useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);
    const [user, setUser] = useState({loggedIn: null})
    useEffect(() => fcl.currentUser.subscribe(setUser), [])
    let {retrieveListProduct} = useContext(ProductContext)
    let {listProducts} = useContext(ProductContext)
    let {createSales, retrieveListSales, listSales, updateSales} = useContext(SalesContext)
    const [inputDefault, setDefault] = useState(null)

    let productName = useRef()
    let productCat = useRef()
    let price = useRef()
    let quantitySold = useRef()
    let sellingPrice = useRef()


    useEffect(() => {
      retrieveListSales(user)
      retrieveListProduct(user)
      console.log(listSales)
    }, [user, listSales])

    const handelSubmit = (e) => {
      e.preventDefault()
      let business = JSON.parse(localStorage.getItem("businessName"))
      let productname = productName.current.value
      let productprice = price.current.value
      let productquantity = quantitySold.current.value
      let productcategory = productCat.current.value
      let productSellingPrice = sellingPrice.current.value
      let total = parseInt(productSellingPrice) * parseInt(productquantity)
      createSales(user, business, productname, productprice, productquantity, productcategory, productSellingPrice, total)
      retrieveListSales(user)
      handleClose()
    }

    const handelUpdate = (e) => {
      e.preventDefault()
      let business = JSON.parse(localStorage.getItem("businessName"))
      let productname = productName.current.value
      let productprice = price.current.value
      let productquantity = quantitySold.current.value
      let productcategory = productCat.current.value
      let productSellingPrice = sellingPrice.current.value
      let total = parseInt(productSellingPrice) * parseInt(productquantity)
      updateSales(user, business, productname, productprice, productquantity, productcategory, productSellingPrice, total, inputDefault?.pk)
      retrieveListSales(user)
      handleCloseUpdate()
    }

    const handleDeleteClick = (event, params) => {
      handleOpenDelete()
      setDelete(params.row)
    }

    const handleDelete = () => {
      // deleteProduct(delProduct?.pk)
      retrieveListSales(user)
      handleCloseDelete()
    }

    let showModal = (event, params) => {
      handleOpenUpdate()
      console.log(params.row)
      setDefault(params.row)
    }

    const theme = useTheme();  
    const columns = [
      {
        field: "product_sold",
        headerName: "Product Name",
        flex: 0.7,
      },
      {
        field: "product_category",
        headerName: "Product Category",
        flex: 0.7,
      },
      {
        field: "price_of_product",
        headerName: "Price",
        flex: 0.7,
      },
      {
        field: "quantity_sold",
        headerName: "Quantity Sold",
        flex: 0.7,
      },
      {
        field: "price_sold_at",
        headerName: "Selling Price",
        flex: 0.7,
      },
      {
        field: "total",
        headerName: "Total",
        flex: 0.5,
      },
      {
        field: "date_sold",
        headerName: "Date",
        flex: 1,
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
                UPDATE SALES
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
                  <TextField required type="text" id="outlined-basic" label="Product" variant="outlined" color='secondary' inputRef={productName} defaultValue={inputDefault?.product_sold} />
                  <TextField required type="text" id="outlined-basic" label="Product Category" variant="outlined" color='secondary' inputRef={productCat} defaultValue={inputDefault?.product_category} />
                  <TextField required type="number" id="outlined-basic" label="Quantity Sold" variant="outlined" color='secondary' inputRef={quantitySold} defaultValue={inputDefault?.quantity_sold} />
                  <TextField required type="number" id="outlined-basic" label="Price" variant="outlined" color='secondary' inputRef={price} defaultValue={inputDefault?.price_of_product} />
                  <TextField required type="number" id="outlined-basic" label="Selling Price" variant="outlined" color='secondary' inputRef={sellingPrice} defaultValue={inputDefault?.price_sold_at}/>
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
                DELETE SALES
              </Typography>
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Typography id="transition-modal-title" variant="h4" component="h1" color={theme.palette.secondary.light} marginBottom="1rem">
                Confirm deleting sales
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
              minWidth: 120
            }}>
              <Typography id="transition-modal-title" variant="h4" component="h1" color={theme.palette.secondary.light} marginBottom="1rem">
                RECORD SALES
              </Typography>
              <form>
                <Box
                  sx={{
                    '& > :not(style)': {width: '100%' },
                    
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Box sx={{ display:"flex", width:700, justifyContent:"space-between", flexWrap:"wrap", gap: "1rem"}}>
                  <TextField required type="text" id="outlined-basic" label="Product" variant="outlined" color='secondary' inputRef={productName} />
                  <TextField required type="text" id="outlined-basic" label="Product Category" variant="outlined" color='secondary' inputRef={productCat} />
                  <TextField required type="number" id="outlined-basic" label="Quantity Sold" variant="outlined" color='secondary' inputRef={quantitySold} />
                  <TextField required type="number" id="outlined-basic" label="Price" variant="outlined" color='secondary' inputRef={price} />
                  <TextField required type="number" id="outlined-basic" label="Selling Price" variant="outlined" color='secondary' inputRef={sellingPrice}/>
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
            <Header title="SALES" subtitle="Sales Record" />
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
            getRowId={(row) => row.pk}
            rows={listSales}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[6]}
        />
        </Box>
    </Box>
  )
}

export default Sales
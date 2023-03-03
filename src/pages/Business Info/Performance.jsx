import React from 'react';
import { Box, useTheme, useMediaQuery, } from "@mui/material";
import Header from '../../Components/Header';
import FlexBetween from '../../Components/FlexBetween';
import Example from '../../Components/BreakDownChart';
import { DataGrid } from '@mui/x-data-grid';
const Performance = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
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
      field: "quantity_sold",
      headerName: "Quantity Sold",
      flex: 1,
    },
  ]
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PERFORMANCE" subtitle="Track Business Performance" />
      <Box
       mt="40px"
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
       >
        <FlexBetween>
          <Example/>
        </FlexBetween>
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
        >
          <Header subtitle="Popular Products"/>
          <Box
          height="60vh"
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
      </Box>
    </Box>
  )
}

export default Performance
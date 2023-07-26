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
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
       >
        <FlexBetween>
          <Example/>
        </FlexBetween>
      </Box>
    </Box>
  )
}

export default Performance
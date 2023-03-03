import { Box } from '@mui/material';
import React, { PureComponent } from 'react';
import { useTheme } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'JAN',
    Sales: 4000,
    Expense: 2400,
    Income: 2400,
  },
  {
    name: 'FEB',
    Sales: 3000,
    Expense: 1398,
    Income: 2210,
  },
  {
    name: 'MAR',
    Sales: 2000,
    Expense: 9800,
    Income: 2290,
  },
  {
    name: 'APR',
    Sales: 2780,
    Expense: 3908,
    Income: 2000,
  },
  {
    name: 'MAY',
    Sales: 1890,
    Expense: 4800,
    Income: 2181,
  },
  {
    name: 'JUN',
    Sales: 2390,
    Expense: 3800,
    Income: 2500,
  },
  {
    name: 'JUL',
    Sales: 3490,
    Expense: 4300,
    Income: 2100,
  },
  {
    name: 'AUG',
    Sales: 3490,
    Expense: 4300,
    Income: 2100,
  },
  {
    name: 'SEP',
    Sales: 3490,
    Expense: 4300,
    Income: 2100,
  },
  {
    name: 'OCT',
    Sales: 3490,
    Expense: 4300,
    Income: 2100,
  },
  {
    name: 'NOV',
    Sales: 3490,
    Expense: 4300,
    Income: 2100,
  },
  {
    name: 'DEC',
    Sales: 3490,
    Expense: 4300,
    Income: 2100,
  },
];

const Example = () => {
    const theme = useTheme();
    return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
      height="70vh"
    >
        <LineChart
          width={500}
          height={450}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Sales" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Expense" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Income" stroke="#82ca9d" />
        </LineChart>
    </Box>
    );
}

export default Example


import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import { Dashboard as DashboardIcon, MenuBook as MenuBookIcon, People as PeopleIcon, BarChart as BarChartIcon, Menu as MenuIcon } from '@mui/icons-material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock data for book rentals
const mockBookData = [
  { id: 1, title: '1984', author: 'George Orwell', year: 1949, status: 'Available' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, status: 'Rented' },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, status: 'Available' },
];

// Mock data for charts
const mockChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  revenue: [12000, 15000, 10000, 18000, 20000, 22000, 24000, 26000, 28000, 30000, 32000, 34000],
  costs: [8000, 9000, 7000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000],
  booksRented: [30, 40, 35, 50, 60, 70, 80, 90, 100, 110, 120, 130],
  customerGains: [5, 10, 7, 15, 20, 25, 30, 35, 40, 45, 50, 55],
};

const drawerWidth = 240;

const Dashboard: React.FC = () => {
  interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    status: string;
  }

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => setBooks(mockBookData), 1000);
  }, []);

  const combinedRevenueCostData = {
    labels: mockChartData.labels,
    datasets: [
      {
        label: 'Monthly Revenue',
        data: mockChartData.revenue,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      {
        label: 'Monthly Operational Costs',
        data: mockChartData.costs,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
    ],
  };

  const combinedBooksRentedCustomerGainsData = {
    labels: mockChartData.labels,
    datasets: [
      {
        label: 'Monthly Books Rented',
        data: mockChartData.booksRented,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
      {
        label: 'Customer Gains per Month',
        data: mockChartData.customerGains,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
      },
    ],
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Book Rental Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {['Dashboard', 'Books', 'Customers', 'Reports'].map((text, index) => (
            <ListItem>
              <ListItemIcon>
                {index === 0 && <DashboardIcon />}
                {index === 1 && <MenuBookIcon />}
                {index === 2 && <PeopleIcon />}
                {index === 3 && <BarChartIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>Book Rental Dashboard</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flex: '1 1 60%' }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Monthly Revenue and Operational Costs</Typography>
                <Line data={combinedRevenueCostData} />
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 35%' }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Monthly Books Rented and Customer Gains</Typography>
                <Line data={combinedBooksRentedCustomerGainsData} />
              </CardContent>
            </Card>
          </Box>
        </Box>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map(book => (
                <TableRow key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.year}</TableCell>
                  <TableCell>{book.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
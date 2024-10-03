import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, CssBaseline, Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { People, School } from '@mui/icons-material';
import AdminUsersPage from './AdminUsersPage'; 
import AdminCoursesPage from './AdminCoursesPage'; 

const Dashboard = () => {
    const drawerWidth = 240;

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <h6>Admin Dashboard</h6>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0 }}>
                <List>
                    <ListItem button component={Link} to="/AdminUsersPage">
                        <ListItemIcon>
                            <People />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem button component={Link} to="/AdminCoursesPage">
                        <ListItemIcon>
                            <School />
                        </ListItemIcon>
                        <ListItemText primary="Courses" />
                    </ListItem>
                </List>
            </Drawer>

            <Container
                component="main"
                sx={{ marginLeft: `${drawerWidth}px`, paddingTop: '64px', paddingBottom: '16px' }}
            >
                <Routes>
                    <Route path="/" element={<h2>Welcome to admin panel!</h2>} />
                    <Route path="/AdminUsersPage" element={<AdminUsersPage />} />
                    <Route path="/AdminCoursesPage" element={<AdminCoursesPage />} />
                </Routes>
            </Container>
        </>
    );
};

export default Dashboard;

import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Container, CssBaseline, Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { People, School, ExitToApp } from '@mui/icons-material';

const Dashboard = () => {
    const drawerWidth = 240;
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/LoginPage');
    };

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
                    <ListItem button component={Link} to="AdminUsersPage">
                        <ListItemIcon>
                            <People />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem button component={Link} to="AdminCoursesPage">
                        <ListItemIcon>
                            <School />
                        </ListItemIcon>
                        <ListItemText primary="Courses" />
                    </ListItem>


                    <ListItem button onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToApp />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>

            <Container
                component="main"
                sx={{ marginLeft: `${drawerWidth}px`, paddingTop: '64px', paddingBottom: '16px' }}
            >
                <Outlet />
            </Container>
        </>
    );
};

export default Dashboard;

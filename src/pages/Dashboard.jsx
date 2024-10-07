import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Container, CssBaseline, Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { People, School, ExitToApp } from '@mui/icons-material';
import useLogout from '../components/Logout/Logout';
/* This page is a dashboard for the admin. It has the courses and users pages and logout option */

const Dashboard = () => {
    const drawerWidth = 240;
    const navigate = useNavigate();
    
    const [navigated, setNavigated] = useState(false);

    const handleLogout = useLogout();
    const handleNavigation = () => {
        setNavigated(true);
    };

    return (
        <>
            <CssBaseline />
            <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0 }}>
                <List>
                    <ListItem button component={Link} to="AdminUsersPage" onClick={handleNavigation}>
                        <ListItemIcon>
                            <People />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem button component={Link} to="AdminCoursesPage" onClick={handleNavigation}>
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
                {!navigated && (
                    <Typography variant="h4" align="center" gutterBottom>
                        Welcome to Admin Dashboard
                    </Typography>
                )}
                <Outlet />
            </Container>
        </>
    );
};

export default Dashboard;

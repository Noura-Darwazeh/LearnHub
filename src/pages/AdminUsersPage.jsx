import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Pagination,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    InputAdornment,
    CircularProgress,
    IconButton,
} from '@mui/material';
import { Add, Search, Edit, Delete, FilterList } from '@mui/icons-material';
import { deleteUser, getAllUsers, searchUserByUsername, searchUserByEmail } from '../services/AdminUserService';
import SnackbarAlert from '../components/SnackBar/SnackbarAlert';
import AddUserDialog from '../components/AdminUserDialog/AddUserDialog';
import EditUserDialog from '../components/AdminUserDialog/EditUserDialog';

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [page, setPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [searchType, setSearchType] = useState('username'); // Updated to use a string value
    const token = localStorage.getItem('token');

    const loadUsers = async () => {
        setLoading(true);
        try {
            const fetchedUsers = await getAllUsers(token);
            setUsers(fetchedUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
            setSnackbar({ open: true, message: 'Failed to load users', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [page]);

    const handleSearch = async () => {
        if (!searchTerm) {
            await loadUsers(); // Load all users if search term is empty
            return;
        }

        setLoading(true);
        try {
            let fetchedUsers;
            if (searchType === 'email') {
                fetchedUsers = await searchUserByEmail(searchTerm, token);
            } else {
                fetchedUsers = await searchUserByUsername(searchTerm, token);
            }
            setUsers(fetchedUsers);
        } catch (error) {
            console.error("Error searching users:", error);
            setSnackbar({ open: true, message: 'Failed to search users', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users; // Updated to use fetched users from search

    const indexOfLastUser = page * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handleDelete = async (id) => {
        if (!token) {
            setSnackbar({ open: true, message: 'Unauthorized: No token found', severity: 'error' });
            return;
        }

        setDeleting(true);
        const prevUsers = [...users];

        try {
            setUsers(prevUsers.filter(user => user._id !== id));  // Optimistic UI update
            await deleteUser(id, token);  // Pass the token to the deleteUser function
            setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
        } catch (error) {
            setUsers(prevUsers);  // Revert UI update on error
            console.error("Error deleting user:", error);
            setSnackbar({ open: true, message: 'Failed to delete user', severity: 'error' });
        } finally {
            setDeleting(false);  // Stop the loading spinner
        }
    };

    const handleDialogClose = async () => {
        setDialogOpen(false);
        setSelectedUser(null);
        await loadUsers();
    };

    const handleEditDialogClose = async () => {
        setEditDialogOpen(false);
        setSelectedUser(null); // Clear the selected user
        await loadUsers(); // Reload the users after update
    };

    const toggleSearchType = () => {
        setSearchType(prevType => (prevType === 'username' ? 'email' : 'username'));
    };

    // Function to handle key down event
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // Trigger search on Enter key
        }
    };

    return (
        <Container maxWidth="lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', width: '100%' }}>
                <TextField
                    label={`Search by ${searchType}`}
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown} // Add key down event
                    style={{ width: '300px' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={toggleSearchType}>
                                    <FilterList />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    style={{ height: '40px', fontSize: '0.875rem', marginLeft: '16px' }}
                    onClick={() => setDialogOpen(true)}
                >
                    Add User
                </Button>
            </div>

            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Password</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell style={{ paddingLeft: '60px' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentUsers.length > 0 ? (
                                currentUsers.map(user => (
                                    <TableRow key={user._id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <input
                                                type="password"
                                                value={user.password}
                                                readOnly
                                                style={{ border: 'none', background: 'transparent' }}
                                            />
                                        </TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <Button size="small" onClick={() => {
                                                    setSelectedUser(user); // Set the selected user
                                                    setEditDialogOpen(true); // Open the edit dialog
                                                }}>
                                                    <Edit fontSize="small" />
                                                </Button>
                                                <Button
                                                    onClick={() => handleDelete(user._id)}  // Call handleDelete with user ID
                                                    size="small"
                                                    sx={{
                                                        color: 'inherit',
                                                        '&:hover': {
                                                            color: 'red',
                                                        },
                                                    }}
                                                    disabled={deleting}  // Disable the button if deleting
                                                >
                                                    {deleting ? <CircularProgress size={24} /> : <Delete fontSize="small" />}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">No users found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                variant="outlined"
                shape="rounded"
                style={{ marginTop: '16px' }}
                disabled={totalPages === 0}
            />

            <SnackbarAlert
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
            <AddUserDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                token={token}
                user={selectedUser}
            />
            <EditUserDialog
                open={editDialogOpen}
                onClose={handleEditDialogClose}
                token={token}
                user={selectedUser}
            />
        </Container>
    );
};

export default AdminUsersPage;

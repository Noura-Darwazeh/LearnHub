import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CourseGrid from '../components/ProfileCourseCard/CourseGrid';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';
import SnackbarAlert from '../components/SnackBar/SnackbarAlert';
import { fetchUserProfile, updatePassword, updateUser, deleteUserAccount, fetchUserCourses } from '../services/userService';
import EmailIcon from '@mui/icons-material/Email';
import FormInput from '../components/Forms/FormInput'
import passwordValidationSchema from '../components/PasswordValidation/passwordValidationSchema';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PasswordChangeDialog from '../components/PasswordChangeDialog/PasswordChangeDialog';
import BackToHomeButton from '../components/HomeButton/BackToHomeButton';  // Import the new button


/* This page is a profile for the user on the website , it has options to edit the username,
and to change password, delete account and to see the list of courses that the user enrolled in and 
he can see details about these courses by click on the course card */


const ProfilePage = () => {
    const [user, setUser] = useState({ username: '', email: '', courses: [] });
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [passwordError, setPasswordError] = useState("");
    const [openUsernameDialog, setOpenUsernameDialog] = useState(false);
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserProfile(token)
                .then(profile => {
                    if (profile.user) {
                        setUser({
                            username: profile.user.username,
                            email: profile.user.email,
                            courses: []
                        });
                        setNewUsername(profile.user.username);
                        return fetchUserCourses(token);
                    }
                })
                .then(courses => {
                    if (courses) {

                        setUser(prev => ({ ...prev, courses }));
                    }
                })
                .catch(error => {
                    console.error('Error fetching profile:', error.message);
                });
        }
    }, []);


    const handleSaveUsername = async () => {
        const token = localStorage.getItem('token');
        try {
            if (!token) throw new Error("You are not logged in.");
            await updateUser(newUsername, token);
            setUser(prev => ({ ...prev, username: newUsername }));
            setIsEditingUsername(false);
            setSnackbarMessage("Username updated successfully");
            setSnackbarSeverity("success");
        } catch (error) {
            setSnackbarMessage(error.message);
            setSnackbarSeverity("error");
        } finally {
            setSnackbarOpen(true);
            setOpenUsernameDialog(false);
        }
    };


    const handleSavePassword = async () => {
        const token = localStorage.getItem('token');

        const { error } = passwordValidationSchema.validate(newPassword);

        if (error) {
            setPasswordError(error.message);
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        } else {
            setPasswordError("");
        }

        try {
            if (!token) throw new Error("You are not logged in.");
            await updatePassword(oldPassword, newPassword, token);
            setSnackbarMessage("Password updated successfully");
            setSnackbarSeverity("success");
        } catch (error) {
            setSnackbarMessage(error.message);
            setSnackbarSeverity("error");
        } finally {
            setSnackbarOpen(true);
            setOpenPasswordDialog(false);
        }

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsEditingPassword(false);
    };




    const handleDeleteAccount = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setSnackbarMessage("You are not logged in.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        try {
            await deleteUserAccount(token);
            setSnackbarMessage("Account deleted successfully.");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate('/LoginPage');
            }, 2000);
        } catch (error) {
            setSnackbarMessage(error.message);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };



    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleNext = () => {
        if (currentPage < Math.ceil(user.courses.length / coursesPerPage) - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleCourseClick = (courseId) => {
        navigate(`/courses/${courseId}`);
    };


    const [currentPage, setCurrentPage] = useState(0);
    const coursesPerPage = 5;
    const indexOfLastCourse = (currentPage + 1) * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = user.courses.slice(indexOfFirstCourse, indexOfLastCourse);


    return (
        <React.Fragment>
            <Box
                sx={{
                    position: 'relative',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    color: 'white',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        zIndex: 1,
                    }}
                />
                <Box

                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 2,
                    }}
                >
                    <BackToHomeButton sx={{ color: 'white' }} />
                </Box>

                <Box
                    sx={{
                        zIndex: 2,
                        flex: '1 0 auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        mt: 2,
                    }}
                >
                    <Typography variant="h2" fontWeight="bold">
                        Hello, {user.username || 'Guest'}!
                    </Typography>

                    <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                        Welcome to your profile! You can edit your password, username, and view the courses you're enrolled in.
                    </Typography>

                    <Paper
                        elevation={10}
                        sx={{
                            p: 4,
                            borderRadius: '20px',
                            width: '400px',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            color: 'black',
                            margin: '20px 0',
                            position: 'relative',
                        }}
                    >
                        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}>
                            <Tooltip title="Delete your account" arrow>
                                <IconButton
                                    color="default"
                                    onClick={handleDeleteAccount}
                                    sx={{
                                        '&:hover': {
                                            color: 'red',
                                        },
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Typography variant="h5" mb={2} fontWeight="bold">My Profile</Typography>

                        <Typography variant="body1" mb={2}>
                            <PersonOutlineIcon sx={{ marginRight: 1 }} />
                            Username: {user.username}
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<EditIcon />}
                                onClick={() => setOpenUsernameDialog(true)}
                                sx={{ ml: 2 }}
                            >
                                Edit
                            </Button>
                        </Typography>

                        <Dialog open={openUsernameDialog} onClose={() => setOpenUsernameDialog(false)}>
                            <DialogTitle>Edit Username</DialogTitle>
                            <DialogContent>
                                <FormInput
                                    type="text"
                                    name="username"
                                    label="Username"
                                    value={newUsername}
                                    onChange={e => setNewUsername(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenUsernameDialog(false)} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleSaveUsername} color="primary">
                                    Save
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Typography variant="body1" mb={2}>
                            <EmailIcon sx={{ marginRight: 1 }} />
                            Email: {user.email}
                        </Typography>


                        <Typography variant="body1" mb={2}>
                            <LockIcon sx={{ marginRight: 1 }} />
                            Password:
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<LockIcon />}
                                onClick={() => setOpenPasswordDialog(true)}
                                sx={{ ml: 2 }}
                            >
                                Change Password
                            </Button>
                        </Typography>
                        <PasswordChangeDialog
                            openPasswordDialog={openPasswordDialog}
                            setOpenPasswordDialog={setOpenPasswordDialog}
                            oldPassword={oldPassword}
                            setOldPassword={setOldPassword}
                            newPassword={newPassword}
                            setNewPassword={setNewPassword}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                            passwordError={passwordError}
                            handleSavePassword={handleSavePassword}
                        />

                    </Paper>



                </Box>
                <Box
                    sx={{
                        zIndex: 2,
                        flex: '1 0 auto',
                        width: '100%',
                        overflow: 'auto',
                        pt: 4,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">My Courses</Typography>
                    {user.courses.length === 0 ? (
                        <Typography
                            variant="body1"
                            color="white"
                            sx={{ textAlign: 'center', mt: 2 }}
                        >
                            You didn't enroll in any courses yet.
                        </Typography>
                    ) : (
                        <>
                            <CourseGrid courses={currentCourses} onCourseClick={handleCourseClick} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Button
                                    variant="text"
                                    color="inherit"
                                    onClick={handlePrevious}
                                    disabled={currentPage === 0}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="text"
                                    color="inherit"
                                    onClick={handleNext}
                                    disabled={currentPage >= Math.ceil(user.courses.length / coursesPerPage) - 1}
                                >
                                    Next
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
            <SnackbarAlert
                open={snackbarOpen}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </React.Fragment>
    );
};

export default ProfilePage;

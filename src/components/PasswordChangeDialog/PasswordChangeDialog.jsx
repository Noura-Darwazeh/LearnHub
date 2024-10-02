import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from '@mui/material';
import FormInput from '../Forms/FormInput';

const PasswordChangeDialog = ({ openPasswordDialog, setOpenPasswordDialog, oldPassword, setOldPassword, newPassword, setNewPassword, confirmPassword, setConfirmPassword, passwordError, handleSavePassword }) => {
    return (
        <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormInput
                            label="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            type="password" 
                            isPassword={true} 
                            fullWidth
                            name="old password"
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <FormInput
                            label="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            error={!!passwordError}
                            type="password" 
                            isPassword={true} 
                            name="new password"
                            helperText={passwordError}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormInput
                            label="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password" 
                            isPassword={true} 
                            fullWidth
                            name="confirm password"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenPasswordDialog(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSavePassword} color="primary">
                    Save Password
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PasswordChangeDialog;

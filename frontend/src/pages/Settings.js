import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    Snackbar,
    Alert,
    CircularProgress
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const Settings = () => {
    const [keys, setKeys] = useState({ dext: '', vision: '', xero: '' });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const fetchSettings = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/settings');
            console.log('Fetched settings:', response.data);
            setKeys(response.data);
        } catch (error) {
            console.error('Error fetching settings:', error);
            const errorMessage = error.response?.data?.message || 'Error loading settings';
            showSnackbar(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const handleSave = async () => {
        try {
            setLoading(true);
            console.log('Saving settings:', keys);
            const response = await axios.post('/api/settings', keys);
            console.log('Save response:', response.data);
            showSnackbar('Settings saved successfully', 'success');
        } catch (error) {
            console.error('Error saving settings:', error);
            const errorMessage = error.response?.data?.message || 'Error saving settings';
            showSnackbar(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field) => (event) => {
        setKeys(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h1" gutterBottom>
                API Settings
            </Typography>
            <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Dext API Key"
                            variant="outlined"
                            type="password"
                            value={keys.dext}
                            onChange={handleChange('dext')}
                            helperText="Enter your Dext API key for invoice processing"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Google Vision API Key"
                            variant="outlined"
                            type="password"
                            value={keys.vision}
                            onChange={handleChange('vision')}
                            helperText="Enter your Google Vision API key for OCR processing"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Xero API Key"
                            variant="outlined"
                            type="password"
                            value={keys.xero}
                            onChange={handleChange('xero')}
                            helperText="Enter your Xero API key for accounting integration"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                            disabled={loading}
                        >
                            Save Settings
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Settings; 
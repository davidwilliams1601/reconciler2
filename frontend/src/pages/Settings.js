import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/settings');
            setKeys(response.data);
        } catch (error) {
            console.error('Error fetching settings', error);
            showSnackbar('Error loading settings', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!validateKeys()) {
            showSnackbar('Please fill in all API keys', 'warning');
            return;
        }

        try {
            setLoading(true);
            await axios.post('/api/settings', keys);
            showSnackbar('Settings saved successfully', 'success');
        } catch (error) {
            console.error('Error saving settings', error);
            showSnackbar('Error saving settings', 'error');
        } finally {
            setLoading(false);
        }
    };

    const validateKeys = () => {
        return Object.values(keys).every(key => key.trim().length > 0);
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
                            onChange={(e) => setKeys({ ...keys, dext: e.target.value })}
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
                            onChange={(e) => setKeys({ ...keys, vision: e.target.value })}
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
                            onChange={(e) => setKeys({ ...keys, xero: e.target.value })}
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
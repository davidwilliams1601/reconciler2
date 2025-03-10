import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Grid,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
    CircularProgress
} from '@mui/material';
import {
    Description as DescriptionIcon,
    Timer as TimerIcon,
    AttachMoney as MoneyIcon,
    Assessment as AssessmentIcon
} from '@mui/icons-material';

const Dashboard = () => {
    const [stats, setStats] = useState({ totalInvoices: 0, pendingReview: 0, totalValue: 0 });
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
        const interval = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/dashboard/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats', error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, icon: Icon }) => (
        <Card elevation={3}>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <Icon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                    <Typography variant="h6" color="textSecondary">
                        {title}
                    </Typography>
                </Box>
                <Typography variant="h4">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );

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
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Invoices"
                        value={stats.totalInvoices}
                        icon={DescriptionIcon}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Pending Review"
                        value={stats.pendingReview}
                        icon={AssessmentIcon}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Value"
                        value={`$${stats.totalValue.toLocaleString()}`}
                        icon={MoneyIcon}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Minutes Since Last"
                        value={timer}
                        icon={TimerIcon}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard; 
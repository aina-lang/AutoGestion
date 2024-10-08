import {
    Box,
    Button,
    Divider,
    Drawer,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { palette } from '@/constants/palette';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Moon, SettingsIcon, Sun } from 'lucide-react';
import SecondaryButton from './SecondaryButton';

export default function Settings() {
    const { changePalette, paletteName } = useThemeContext();
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen((prevState) => !prevState);
    };
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('dark-mode') === 'true';
    });

    useEffect(() => {
        const darkMode = localStorage.getItem('dark-mode');

        if (darkMode === 'false' || !darkMode) {
            document.querySelector('html').classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        } else {
            document.querySelector('html').classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        }
    }, [isDarkMode]);

    const toDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('dark-mode', newMode.toString());
            return newMode;
        });
    };
    const toLightMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('dark-mode', newMode.toString());
            return newMode;
        });
    };

    return (
        <>
            <IconButton
                onClick={toggleDrawer}
                sx={{
                    position: 'fixed',
                    right: 16,
                    bottom: 16,
                    backgroundColor: palette[paletteName][500],
                    color: 'white',
                    '&:hover': {
                        backgroundColor: palette[paletteName][600],
                    },
                    boxShadow: 3,
                    borderRadius: '50%',
                    padding: 1.5,
                }}
            >
                <SettingsIcon />
            </IconButton>

            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
                <Box
                    sx={{
                        width: 400, // Adjusted width for more space
                        padding: 3,
                    }}
                    role="presentation"
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Paramètres
                    </Typography>
                    <Divider />
                    <Box className="my-5" />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                Mode actuel : {isDarkMode ? 'sombre' : 'light'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className="grid grid-cols-2" gap={4}>
                            <SecondaryButton
                                onClick={toLightMode}
                                disabled={!isDarkMode}
                                className="flex h-24 items-center justify-center border p-10"
                            >
                                <Sun />
                            </SecondaryButton>
                            <SecondaryButton
                                onClick={toDarkMode}
                                disabled={isDarkMode}
                                className="flex items-center justify-center border p-10"
                            >
                                <Moon />
                            </SecondaryButton>
                            {/* <Button
                                variant="contained"
                                onClick={toggleDarkMode}
                                sx={{ width: "100%" }}
                            >
                                Basculer entre mode clair/sombre
                            </Button> */}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                Palette actuelle : {paletteName}
                            </Typography>
                        </Grid>
                        {Object.entries(palette).map(([key, value]) => (
                            <Grid item xs={3} key={key}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: value[500],
                                        color: 'white',
                                        width: '100%',
                                        '&:hover': {
                                            backgroundColor: value[600],
                                        },
                                    }}
                                    onClick={() => changePalette(key)}
                                >
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Drawer>
        </>
    );
}

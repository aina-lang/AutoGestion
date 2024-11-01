import React from 'react';
import { Button } from '@mui/material';
import { palette } from '@/constants/palette';
import { useThemeContext } from '@/contexts/ThemeContext';

export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    const { paletteName } = useThemeContext(); // Get palette name

    // Access the current palette
    const currentPalette = palette[paletteName];

    return (
        <Button
            {...props}
            variant="contained" // Use appropriate MUI variant
            sx={{
                background :`linear-gradient(to right ,${currentPalette[500]},${currentPalette[400]})`, // Main color from palette
                color: '#fff', // Text color
                border: 'none', // No border for MUI style
                fontSize: "0.875rem", // Smaller font size (14px)
                padding: '7px 16px', // Adjust padding for smaller size
                borderRadius: '8px', // Rounded corners for modern look
                textTransform: 'none', // Prevent text from being uppercase
                minWidth: '120px', // Set minimum button width
                '&:hover': {
                    backgroundColor: currentPalette[600], // Hover color
                },
                '&:disabled': {
                    opacity: 0.5, // Handle opacity when disabled
                },
                transition: 'background-color 0.2s ease-in-out',
                boxShadow: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`, // Subtle shadow using current palette
            }}
            disabled={disabled}
            className={className}
        >
            {children}
        </Button>
    );
}

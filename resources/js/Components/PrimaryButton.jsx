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
                backgroundColor: currentPalette[500], // Main color from palette
                color: '#fff', // Text color
                border: 'none', // No border for MUI style
                fontSize: '0.7rem', // Smaller font size (14px)
                padding: '8px 16px', // Adjust padding for smaller size
                // borderRadius: '8px', // Rounded corners for modern look
                // textTransform: 'none', // Prevent text from being uppercase
                minWidth: '120px', // Set minimum button width
                '&:hover': {
                    backgroundColor: currentPalette[700], // Hover color
                },
                '&:disabled': {
                    opacity: 0.5, // Handle opacity when disabled
                },
                transition: 'background-color 0.2s ease-in-out',
                boxShadow: `0 5px 10px rgba(0,0,0,0.1)`, // Subtle shadow using current palette
            }}
            disabled={disabled}
            className={className}
        >
            {children}
        </Button>
    );
}

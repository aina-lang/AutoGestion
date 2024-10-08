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
    const { paletteName } = useThemeContext(); // Obtenez le nom de la palette

    // Accédez à la palette actuelle
    const currentPalette = palette[paletteName];

    return (
        <Button
            {...props}
            variant="contained" // Utilisez le variant MUI approprié
            sx={{
                backgroundColor: currentPalette[500], // Couleur principale de la palette
                color: '#fff', // Couleur du texte
                border: 'none', // Aucun bord pour un style MUI
                '&:hover': {
                    backgroundColor: currentPalette[700], // Couleur au survol
                },
                '&:disabled': {
                    opacity: 0.5, // Gérer l'opacité si désactivé
                },
                transition: 'background-color 0.2s ease-in-out',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Ombre
            }}
            disabled={disabled}
            className={className}
        >
            {children}
        </Button>
    );
}

import { palette } from "@/constants/palette";
import { useThemeContext } from "@/contexts/ThemeContext";
import { Button } from "@mui/material";
import React from "react";

export default function SecondaryButton({
    type = "button",
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
            type={type}
            variant="outlined" // Choisissez le variant que vous préférez
            sx={{
                border: `1px solid ${palette.gray[500]}`, // Utiliser une bordure
                color: palette.gray[500], // Couleur du texte
                backgroundColor: "transparent", // Fond transparent pour le style
                // "&:hover": {
                //     backgroundColor: currentPalette[50], // Couleur de fond au survol
                //     boxShadow: `0 2px 4px ${currentPalette[600]}`, // Ombre au survol
                // },
                opacity: disabled ? 0.5 : 1, // Gérer l'opacité si désactivé
                transition:
                    "background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                fontSize: "15px",
            }}
            disabled={disabled}
            className={className}
        >
            {children}
        </Button>
    );
}

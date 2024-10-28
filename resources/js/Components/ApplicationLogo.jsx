import { palette } from '@/constants/palette';
import { useThemeContext } from '@/contexts/ThemeContext';
import { router } from '@inertiajs/react';

export default function ApplicationLogo({ className }) {
    const { paletteName } = useThemeContext(); // Obtenez le nom de la palette

    // Accédez à la palette actuelle
    const currentPalette = palette[paletteName];

    return (
        <div
            style={{ fontSize: '2rem', fontWeight: 'bold' }}
            className={`cursor-pointer ${className}`}
            onClick={() => router.visit('/')}
        >
            {/* "Vezo" stylisé avec une couleur, et "Tours" avec une autre */}
            <span style={{ color: currentPalette[500] }}>Vezo</span>
            <span style={{ color: palette["gray"][500] }}>Tours</span>
        </div>
    );
}

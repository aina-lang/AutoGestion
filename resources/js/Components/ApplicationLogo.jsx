import { palette } from '@/constants/palette';
import { useThemeContext } from '@/contexts/ThemeContext';
import { router } from '@inertiajs/react';

export default function ApplicationLogo(props) {
    const { paletteName } = useThemeContext(); // Obtenez le nom de la palette

    // Accédez à la palette actuelle
    const currentPalette = palette[paletteName];

    return (
        <div
            style={{ fontSize: '2rem', fontWeight: 'bold' }}
            className="cursor-pointer"
            onClick={() => router.visit('/')}
        >
            {/* "Vezo" stylisé avec une couleur, et "Tours" avec une autre */}
            <span style={{ color: currentPalette[500] }}>Vezo</span>
            <span style={{ color: currentPalette.secondary }}>Tours</span>
        </div>
    );
}

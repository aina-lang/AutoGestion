import { palette } from '@/constants/palette';
import { useThemeContext } from '@/contexts/ThemeContext';
import { router } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronFirst,
    ChevronLast,
    MoreVertical,
} from 'lucide-react';
import React, { createContext, useContext, useState } from 'react';
import ApplicationLogo from './ApplicationLogo';

const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    const { paletteName } = useThemeContext(); // Obtenez le nom de la palette

    // Palette active selon le thème
    const currentPalette = palette[paletteName];

    return (
        <aside
            className={`h-screen bg-white dark:bg-gray-800 shadow-lg rounded-tr-[30px] ${expanded ? 'w-60' : ''}`}
        >
            {/* sm:w-64 md:w-72 lg:W-80 xl:w-96 */}

            <nav
                className={`flex h-full flex-col  bg-[${currentPalette[500]}]`}
            >
                <div className="mb-5 flex items-center justify-between p-4 pb-2 space-x-2">
                    {expanded && <ApplicationLogo />}
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="rounded-lg bg-gray-50 p-2 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                <div className="flex border-t p-3">
                    <div
                        className={`flex items-center justify-between overflow-hidden transition-all ${
                            expanded ? 'ml-3 w-56' : 'w-0'
                        } `}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold">constGenius</h4>
                            <span className="text-xs text-gray-600">
                                constgenius@gmail.com
                            </span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, active, alert, children, link }) {
    const { expanded } = useContext(SidebarContext);
    const [isActive, setIsActive] = useState(active);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const { paletteName } = useThemeContext(); // Obtenez le nom de la palette

    // Palette actuelle selon le thème
    const currentPalette = palette[paletteName];

    // Gestion des enfants actifs
    const hasActiveChild =
        children &&
        React.Children.toArray(children).some((child) => child.props.active);

    // Function to handle navigation with Inertia
    const handleNavigation = () => {
        if (link) {
            router.visit(link); // Inertia's navigation function
        } else {
            setIsSubMenuOpen((prev) => !prev); // Toggle submenu if no link provided
        }
    };

    return (
        <>
            <li
                className={`group relative my-1 flex cursor-pointer flex-col items-start rounded-md px-3 py-2 font-medium transition-colors dark:text-gray-200`}
                onClick={handleNavigation} // Use handleNavigation for onclick event
                style={{
                    backgroundColor: isActive
                        ? currentPalette[50]
                        : 'transparent',
                    color: isActive
                        ? currentPalette[600]
                        : palette['gray'][600],
                        
                }}
            >
                <div className="flex w-full items-center">
                    <span>{icon}</span>
                    <span
                        className={`overflow-hidden transition-all ${
                            expanded ? 'ml-3 w-52' : 'hidden w-0'
                        }`}
                    >
                        {text}
                    </span>
                    {children && expanded && (
                        <ChevronDown
                            className={`ml-auto transform transition-transform ${
                                isSubMenuOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                    )}
                    {alert && (
                        <div
                            className={`absolute right-2 h-2 w-2 rounded bg-blue-500 ${expanded ? '' : 'top-2'}`}
                        ></div>
                    )}
                </div>

                {/* Tooltip lorsque le menu est réduit */}
                {!children && !expanded && (
                    <div
                        className={`invisible absolute left-full ml-6 -translate-x-3 rounded-md bg-indigo-100 px-2 py-1 text-sm text-[${paletteName[800]}] opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
                    >
                        {text}
                    </div>
                )}

                {children && !expanded && (
                    <ul
                        className={`invisible absolute left-full ml-6 -translate-x-3 rounded-md bg-indigo-100 px-2 py-1 text-sm text-[${paletteName[800]}] opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
                    >
                        {children}
                    </ul>
                )}
            </li>

            {/* Expanded submenu when sidebar is expanded */}
            {children && isSubMenuOpen && expanded && (
                <ul className="pl-6 ">{children}</ul>
            )}
        </>
    );
}

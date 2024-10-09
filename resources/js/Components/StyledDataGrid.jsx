import { palette } from '@/constants/palette';
import { useThemeContext } from '@/contexts/ThemeContext';
import { styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const StyledDataGrid = styled(DataGrid)(({ theme }) => {
    const { paletteName } = useThemeContext(); // Obtenez le nom de la palette

    // Accédez à la palette actuelle
    const currentPalette = palette[paletteName];

    return {
        border: 0,
        overflow: 'hidden',
        color: 'rgba(255,255,255,0.85)',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        WebkitFontSmoothing: 'auto',
        letterSpacing: 'normal',

        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#1d1d1d',
            ...theme.applyStyles('light', {
                backgroundColor: '#fafafa',
            }),
        },
        '& .MuiDataGrid-columnHeader': {
            paddingHorizontal: 18,
            backgroundColor: currentPalette[500],
            color: 'white',
        },
        '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
            borderRight: '0px solid #303030',
            ...theme.applyStyles('light', {
                borderRightColor: '#f0f0f0',
            }),
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
            border: '0px solid #303030',

            ...theme.applyStyles('light', {
                // borderBottomColor: "#f0f0f0",
            }),
        },
        '& .MuiDataGrid-cell': {
            color: '#303030',
            ...theme.applyStyles('light', {
                color: '#303030',
            }),
            //    boxShadow: '2px 2px black',
            // marginBottom: 2,
        },
        '& .MuiPaginationItem-root': {
            borderRadius: 0,
        },

        // Style for odd rows
        '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#2d2d2d',
            ...theme.applyStyles('light', {
                backgroundColor: '#f9f9f9',
            }),
         
        },
        // Style for even rows
        '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#1d1d1d',
            ...theme.applyStyles('light', {
                backgroundColor: '#ffffff',
            }),
        },

        // Styles for checkboxes in each row except header
        '& .MuiDataGrid-cellCheckbox': {
            '& .MuiCheckbox-root': {
                color: currentPalette[500], // Tailwind indigo-500
                // boxShadow: "0px 4px 6px -1px rgba(99, 102, 241, 0.7)", // Shadow indigo
                '&:hover': {
                    backgroundColor: currentPalette[200], // Light indigo hover
                },
            },
        },

        // Exclude the header checkbox from styling
        '& .MuiDataGrid-columnHeaderCheckbox': {
            '& .MuiCheckbox-root': {
                color: 'inherit', // Keep header checkbox color as default
                boxShadow: 'none', // No shadow for the header checkbox
            },
        },

        '.MuiDataGrid-columnHeaderTitleContainer': {
            color: 'white',
            '.MuiSvgIcon-root': {
                color: 'white',
            },
        },

        '& .MuiDataGrid-toolbarContainer': {
            // backgroundColor: "#3b82f6", // Tailwind 'blue-500' color for toolbar
            // color: "#ffffff", // White text color
            padding: '8px',
            '& .MuiButtonBase-root': {
                color: palette['gray'][500], // Make buttons white inside the toolbar
                // backgroundColor: "#6366F1", // Tailwind 'indigo-500' for buttons
                // "&:hover": {
                //     backgroundColor: "#4F46E5", // Darker indigo on hover
                // },
            }, // Add some padding to the toolbar
        },

        // Buttons inside the toolbar

        // Export Icon in toolbar

        // Pagination customization
        // "& .MuiTablePagination-root": {
        //     backgroundColor: "#1f2937", // Tailwind 'gray-800' for pagination
        //     color: "#ffffff", // White text color
        // },
        '& .MuiTablePagination-actions': {
            '& .MuiButtonBase-root': {
                color: '#ffffff', // White color for pagination buttons
                '&:hover': {
                    backgroundColor: currentPalette[500], // Tailwind 'gray-500' on hover
                },
            },
        },

        '& .MuiPaginationItem-root': {
            borderRadius: 0,
        },

        ...theme.applyStyles('light', {
            color: 'rgba(0,0,0,.85)',
            '& .MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: '#f9f9f9',
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: '#ffffff',
            },
        }),
    };
});

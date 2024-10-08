import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Warning } from "@mui/icons-material";

const ConfirmModal = ({ open, onClose, onConfirm, title, content }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="custom-confirmation-dialog-title"
            aria-describedby="custom-confirmation-dialog-description"
        >
            <DialogTitle
                id="custom-confirmation-dialog-title"
                className="flex items-center justify-between"
            >
                {title}
                <Warning
                    fontSize="large"
                    className="p-2 bg-gray-200 rounded-full h-8 w-8"
                />
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="custom-confirmation-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button
                    onClick={onConfirm}
                    className="inline-flex items-center px-4  text bg-red-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150  py-2 mb-2"
                >
                    Confirmer
                </button>
                <button
                    onClick={onClose}
                    className="inline-flex items-center px-4  bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 py-2 mb-2"
                    autoFocus
                >
                    Annuler
                </button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmModal;

import React from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useConfirmDialog } from "../../hooks/useConfirmDialog"
import { styles } from "./styles"

interface ConfirmDialogProps {}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({}) => {
    const { open, setOpen, title, content, onConfirm } = useConfirmDialog()

    const handleClose = () => {
        setOpen(false)
    }

    const confirm = () => {
        onConfirm()
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={styles.dialog}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" onClick={confirm} autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

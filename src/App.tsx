import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./sass/App.scss"
import "./sass/_input.scss"
import "./sass/_button.scss"
import { NotFound } from "./pages/NotFound"
import { ClientProvider } from "./contexts/clientContext"
import { Login } from "./pages/Login"
import { UserProvider } from "./contexts/userContext"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { ThemeProvider } from "@mui/material"
import { AttachmentsProvider } from "./contexts/attachmentsContext"
import { PdfProvider } from "./contexts/pdfContext"
import { StageProvider } from "./contexts/stageContext"
import { Dashboard } from "./pages/Dashboard"
import { SettingsProvider } from "./contexts/settingsContext"
import { ConfirmDialogProvider } from "./contexts/confirmDialogContext"
import { ConfirmDialog } from "./components/ConfirmDialog"
import { Snackbar, SnackbarProvider } from "burgos-snackbar"

function App() {
    const muiTheme = useMuiTheme()

    return (
        <SettingsProvider>
            <UserProvider>
                <BrowserRouter>
                    <ThemeProvider theme={muiTheme}>
                        <ConfirmDialogProvider>
                            <SnackbarProvider>
                                <ClientProvider>
                                    <AttachmentsProvider>
                                        <PdfProvider>
                                            <StageProvider>
                                                <Snackbar />
                                                <ConfirmDialog />
                                                <Routes>
                                                    {/* <Route index element={<Home />} /> */}
                                                    <Route index element={<Login />} />
                                                    <Route path="/login" element={<Login />} />
                                                    <Route path="/dashboard/*" element={<Dashboard />} />
                                                    <Route path="*" element={<NotFound />} />
                                                </Routes>
                                            </StageProvider>
                                        </PdfProvider>
                                    </AttachmentsProvider>
                                </ClientProvider>
                            </SnackbarProvider>
                        </ConfirmDialogProvider>
                    </ThemeProvider>
                </BrowserRouter>
            </UserProvider>
        </SettingsProvider>
    )
}

export default App

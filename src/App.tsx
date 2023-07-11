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
import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { ConfirmDialog, ConfirmDialogProvider } from "burgos-confirm"
import { ImagesProvider } from "./contexts/imagesContext"
import { ContractsProvider } from "./contexts/contractsContext"
import { SellersProvider } from "./contexts/sellersContext"
import { BoardsProvider } from "./contexts/boardsContext"
import { StatusesProvider } from "./contexts/statusesContext"
import { IoProvider } from "./contexts/ioContext"

function App() {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
            <BrowserRouter>
                <SnackbarProvider>
                    <ConfirmDialogProvider>
                        <IoProvider>
                            <ContractsProvider>
                                <SellersProvider>
                                    <StatusesProvider>
                                        <BoardsProvider>
                                            <UserProvider>
                                                <SettingsProvider>
                                                    <ImagesProvider>
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
                                                    </ImagesProvider>
                                                </SettingsProvider>
                                            </UserProvider>
                                        </BoardsProvider>
                                    </StatusesProvider>
                                </SellersProvider>
                            </ContractsProvider>
                        </IoProvider>
                    </ConfirmDialogProvider>
                </SnackbarProvider>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App

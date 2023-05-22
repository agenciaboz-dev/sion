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

function App() {
    const muiTheme = useMuiTheme()

    return (
        <UserProvider>
            <BrowserRouter>
                <ThemeProvider theme={muiTheme}>
                    <ClientProvider>
                        <AttachmentsProvider>
                            <PdfProvider>
                                <StageProvider>
                                    <Routes>
                                        {/* <Route index element={<Home />} /> */}
                                        <Route index element={<Login />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </StageProvider>
                            </PdfProvider>
                        </AttachmentsProvider>
                    </ClientProvider>
                </ThemeProvider>
            </BrowserRouter>
        </UserProvider>
    )
}

export default App

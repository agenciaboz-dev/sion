import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './sass/App.scss';
import './sass/_input.scss';
import './sass/_button.scss';
import { NotFound } from './pages/NotFound';
import { Cadastro } from './pages/Cadastro';
import { ClientProvider } from './contexts/clientContext';
import { Links } from './pages/Links';
import { Login } from './pages/Login';
import { UserProvider } from './contexts/userContext';
import { ControlPanel } from './pages/ControlPanel';
import { TextsProvider } from "./contexts/textsContext"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { ThemeProvider } from "@mui/material"

function App() {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
            <UserProvider>
                <BrowserRouter>
                    <ClientProvider>
                        <TextsProvider>
                            <Routes>
                                <Route index element={<Home />} />
                                <Route path="/cadastro/*" element={<Cadastro />} />
                                <Route path="/links" element={<Links />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/admin" element={<ControlPanel />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </TextsProvider>
                    </ClientProvider>
                </BrowserRouter>
            </UserProvider>
        </ThemeProvider>
    )
}

export default App;

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
import { useMuiTheme } from './hooks/useMuiTheme';
import { ThemeProvider } from '@mui/material';
import { AttachmentsProvider } from './contexts/attachmentsContext';
import { PdfProvider } from './contexts/pdfContext';
import { StageProvider } from './contexts/stageContext';
import { SignContract } from './pages/SignContract';
import { Contract } from './pages/Contract';

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
										<Route path="/login/:id" element={<Login signing />} />
										<Route path="/contract/:id" element={<Contract />} />
										<Route path="/contract/:id/:signing" element={<Contract />} />
										<Route path="/cadastro/*" element={<Cadastro />} />
										<Route path="/links" element={<Links />} />
										<Route path="/admin" element={<ControlPanel />} />
										<Route path="/sign/:id/:signing" element={<SignContract />} />
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

export default App;

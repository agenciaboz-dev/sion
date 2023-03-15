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

function App() {
  return (
    <UserProvider>
        <BrowserRouter>
            <ClientProvider>
                <Routes>
                        <Route index element={<Home />} />
                        <Route path='/cadastro/*' element={<Cadastro />} />
                        <Route path='/links' element={<Links />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/admin' element={<ControlPanel />} />
                        <Route path='*' element={<NotFound />} />
                </Routes>
            </ClientProvider>
        </BrowserRouter>
    </UserProvider>
  );
}

export default App;

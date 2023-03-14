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

function App() {
  return (
    <BrowserRouter>
        <ClientProvider>
            <Routes>
                    <Route index element={<Home />} />
                    <Route path='/cadastro/*' element={<Cadastro />} />
                    <Route path='/links' element={<Links />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='*' element={<NotFound />} />
            </Routes>
        </ClientProvider>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import './sass/App.scss';
import './sass/_input.scss';
import './sass/_button.scss';
import { NotFound } from './pages/NotFound';
import { Cadastro } from './pages/Cadastro';
import { useLayoutEffect } from 'react';

const ScrollTop = () => {
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return null
}

function App() {
  return (
    <BrowserRouter>
    {/* <ScrollTop /> */}
        <Routes>
                <Route index element={<Home />} />
                <Route path='/cadastro/*' element={<Cadastro />} />
                <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

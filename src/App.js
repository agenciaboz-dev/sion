import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './sass/App.scss';
import './sass/_input.scss';
import './sass/_button.scss';

function App() {
  return (
    <BrowserRouter>
        <Routes>
                <Route index element={<Home />} />
                {/* <Route path='/cadastrar/' element={<Cadastro />} /> */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;

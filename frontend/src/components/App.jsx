import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
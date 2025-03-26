import { Route, Routes } from 'react-router-dom';
import LoadingPage from './pages/loading-page';
import MainPage from './pages/main-page';
import LoginPage from './pages/login-page';
import SignupPage from './pages/signup-page';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoadingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/focus" element={<MainPage />} />
    </Routes>
  );
};

export default App;
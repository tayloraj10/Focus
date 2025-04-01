import { Route, Routes } from 'react-router-dom';
import LoadingPage from './pages/loading-page';
import MainPage from './pages/main-page';
import LoginPage from './pages/login-page';
import SignupPage from './pages/signup-page';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoadingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/focus" element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default App;
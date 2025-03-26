import { Route, Routes } from 'react-router-dom';
import LoadingPage from './pages/loading-page';
import MainPage from './pages/main-page';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoadingPage />} />
      <Route path="/focus" element={<MainPage />} />
    </Routes>
  );
};

export default App;
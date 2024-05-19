import { Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import EventsList from './pages/EventsList';
import ProfileList from './pages/ProfileList';
import SettingsProfile from './pages/SettingsProfile';
import NotFound from './pages/NotFound';
import DetailUser from './pages/DetailUser';

function App() {
   return (
      <>

         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events/:id" element={<EventsList />} />
            <Route path="/profiles" element={<ProfileList />} />
            <Route path="/profile/:id" element={<SettingsProfile />} />
            <Route path="/profile" element={<DetailUser />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </>
   );
}

export default App;

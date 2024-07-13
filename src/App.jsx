import {  Route, Routes} from 'react-router-dom';

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
import MessagesPage from './pages/MessagesPage';
import EventsInterested from './pages/EventsInterested'
import RecoverPage from './pages/RecoverPage';
import ChangePassPage from './pages/ChangePassPage';

function App() {

   return (
      <>

         <Routes >
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recoverpass" element={<RecoverPage/>} />
            <Route path="/reset-password/:tokenRecoveryparams" element={<ChangePassPage/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/events/:loggedUserId" element={<EventsInterested />} />
            <Route path="/location/:idLocalurl/events" element={<EventsList />} /> 
            <Route path="/profiles" element={<ProfileList />} />
            <Route path="/profile" element={<SettingsProfile />} />
            <Route path="/profile/:idUser" element={<DetailUser />} />
            <Route path="/messages" element={<MessagesPage/>} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </>
   );
}

export default App;

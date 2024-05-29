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
import { useContext } from 'react';
import { LoginContextP } from './context/loginContextPrueba';

function App() {

        const {isLoggedIn} =useContext(LoginContextP)
        return (

                <>

                        <Routes>

                                <Route path="/" element={<LandingPage />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/login" element={<Login />} />

                                {isLoggedIn ? (<>
                                        <Route path="/home" element={<Home />}/> 
                                        <Route path="/events/:id" element={<EventsList />} />
                                        <Route path="/profiles" element={<ProfileList />} />
                                        <Route path="/profile/:id" element={<SettingsProfile />} />
                                
                                </>
                                
                                ):<Route path="*" element={<NotFound/>} /> }
                              
                        </Routes>
                
                </>
                
        )
}

export default App;

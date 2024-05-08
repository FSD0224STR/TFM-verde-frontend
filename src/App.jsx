import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import EventsList from "./pages/EventsList";
import ProfileList from "./pages/ProfileList";
import SettingsProfile from "./pages/SettingsProfile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>

      
      {/* <h1>LISTADO DE USUARIOS</h1>
      
     {users.map((user,index) =>(
      <UsersList 
      user={user}
      key={index} ></UsersList>
    
      
    
    ))}  */}

    <p>Hola</p>

 
    <FormRegister />
          
    <LoginForm/>

 
 
     
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/:id" element={<EventsList />} />
        <Route path="/profiles" element={<ProfileList />} />
        <Route path="/profile/:id" element={<SettingsProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes, /* Navigate */ } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import SignupPage from './views/SignupPage/SignupPage';
import SigninPage from './views/SigninPage/SigninPage';
import LandingPage from './views/LandingPage/LandingPage';
// import Home from './views/Home/Home';
import About from './views/About/About';
import Error404 from './views/Error404/Error404';
// import UserProfile from './views/UserProfile/UserProfile';
import style from './App.module.css';
// import { useSelector } from 'react-redux';

function App() {
  // const currentUser = useSelector((state) => state.auth.user);

  return (
    <div className={style.appContainer}>
      <NavBar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/sign_up' element={<SignupPage />} />
        <Route path='/sign_in' element={<SigninPage />} />
        <Route path='/about' element={<About />} />

        {/* { currentUser ? <Route path='/home' element={<Home />} /> : <Route path="/home" element={<Navigate to="/" />} /> }
        { currentUser ? <Route path='/profile' element={<UserProfile />} /> : <Route path="/profile" element={<Navigate to="/" />} /> } */}

        <Route path='/*' element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;

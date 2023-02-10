import {BrowserRouter, Routes, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import Home from './components/Home'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/register" element={<RegistrationForm />} />
      <Route exact path="/master" element={<Home />} />
      <Route exact path="/student" element={<Home />} />
    </Routes>
  </BrowserRouter>
)

export default App

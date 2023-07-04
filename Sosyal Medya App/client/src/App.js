
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Navbar from './Component/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import {Container} from '@mui/material'

function App() {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Container maxWidth="lg">

      <BrowserRouter>
        <Navbar />
        <div >
          <Routes>
            <Route path="/" element={<Navigate to="/posts"/>} />
            <Route path="/posts" element={<Home/>} />
            <Route path="/posts/search" element={<Home/>} />
            <Route path="/signin" element={!user ? <Signin/>: <Navigate to="/posts"/>} />
            <Route path="/signup" element={!user ?<Signup/>: <Navigate to="/posts"/>} />
          </Routes>
        </div>
      </BrowserRouter>

    </Container>
  );
}

export default App;

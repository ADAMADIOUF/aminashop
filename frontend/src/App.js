import React from 'react'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App

import { useState } from 'react'

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import './App.css'
import Content from './Content'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Content />
      <Footer />
    </>
  )
}

export default App

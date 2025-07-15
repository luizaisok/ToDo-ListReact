import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Table from './components/Table'
import FormTask from './components/FormTask'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const url = "http://localhost:3000/api/tarefa"

function App() {
  return (
     <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route path="/" element={<Table url={url} />} />
          <Route path="/form-tarefa/:id?" element={<FormTask url={url} />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App
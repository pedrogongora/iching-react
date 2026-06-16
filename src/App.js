import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import AppContainer from './components/AppContainer'
import HomeScreen from './components/HomeScreen'
import TiradaScreen from './components/TiradaScreen'
import ResultadoScreen from './components/ResultadoScreen'
import Journal from './components/Journal'
import JournalEntry from './components/JournalEntry'
import HexagramList from './components/HexagramList'
import HexagramDetail from './components/HexagramDetail'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route index element={<HomeScreen />} />
          <Route path="tirada" element={<TiradaScreen />} />
          <Route path="resultado" element={<ResultadoScreen />} />
          <Route path="bitacora" element={<Journal />} />
          <Route path="bitacora/:timestamp" element={<JournalEntry />} />
          <Route path="hexagramas" element={<HexagramList />} />
          <Route path="hexagramas/:numero" element={<HexagramDetail />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App

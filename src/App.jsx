import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DecisionTree from './DecisionTree';
import Footer from './Footer';
import Title from './Title';

function App() {
  return (
    <>
    <div className="PageWrapper">
      <Title />
      <DecisionTree />
      <Footer />
      </div>
    </>
  )
}

export default App

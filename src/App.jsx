import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DecisionTree from './DecisionTree';
import Footer from './Footer';
import Title from './Title';
import MermaidGraphDisplay from './MermaidGraphDisplay';

function App() {
  return (
    <>
    <div className="PageWrapper">
      <Title />
      <DecisionTree />
      <MermaidGraphDisplay />
      <Footer />
      </div>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DecisionTree from './DecisionTree';

function App() {
  return (
    <>
      <DecisionTree />
      <p className="project-docs">
        Disclaimer: For reference only. Always consult the following documents.
      </p>
      <p>
        <a href='https://docs.google.com/document/d/1zdwfkbJdRrBSuWvTER0YmRHXFEfofd4SVH9sheMR0y0/edit?tab=t.0'>Project Instruction</a>
      </p>
    </>
  )
}

export default App

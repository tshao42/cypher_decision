import './App.css'
import DecisionTree from './DecisionTree';
import Footer from './Footer';
import Title from './Title';
import MermaidGraphDisplay from './MermaidGraphDisplay';
import BlockMarker from './BlockMarker/BlockMarker';
import blockSetsData from '../if-tf-chart.json';

const blockSets = blockSetsData.blockSets;
console.log(blockSets)

function App() {
  return (
    <>
    <div className="PageWrapper">
      <Title />
      <DecisionTree />
      <MermaidGraphDisplay />
      <BlockMarker blockSets={blockSets} />
      <Footer />
      </div>
    </>
  )
}

export default App

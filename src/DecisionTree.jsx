import React, { useState } from 'react';
import decisionNodesData from '../options.json';


const DecisionTree = () => {
  // Track current node and history
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [history, setHistory] = useState([]);
  const [conclusions, setConclusions] = useState([]);
  
  // Sample decision tree data structure
  // You can customize this with your own decision nodes
  const decisionNodes = decisionNodesData.decisionNodes;

  // Handle option selection
  const handleOptionClick = (nextNodeId) => {
    // Add current node to history
    setHistory([...history, { id: currentNodeId, selection: nextNodeId }]);
    
    // If this leads to a conclusion, add it to conclusions
    if (decisionNodes[nextNodeId]?.conclusion) {
      setConclusions([...conclusions, decisionNodes[nextNodeId].conclusion]);
    }
    
    // Move to the next node
    setCurrentNodeId(nextNodeId);
  };

  // Reset the tree
  const handleReset = () => {
    setCurrentNodeId('start');
    setHistory([]);
    setConclusions([]);
  };

  // Go back one step
  const handleBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      
      if (newHistory.length === 0) {
        setCurrentNodeId('start');
      } else {
        setCurrentNodeId(newHistory[newHistory.length - 1].id);
      }
      setHistory(newHistory); // Ensure history is updated correctly
      
      // Remove last conclusion if we're going back
      if (conclusions.length > 0 && decisionNodes[currentNodeId]?.conclusion) {
        const newConclusions = [...conclusions];
        newConclusions.pop();
        setConclusions(newConclusions);
      }
    }
  };

  const currentNode = decisionNodes[currentNodeId] || {};

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow">      
      {/* Current question or conclusion */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
        {currentNode.question ? (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">{currentNode.question}</h3>
            <div className="space-y-3">
              {currentNode.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option.nextNode)}
                  className="w-full p-3 text-left rounded-md bg-blue-50 hover:bg-blue-100 border border-blue-200 transition duration-150"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Conclusion:</h3>
            <p className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
              {currentNode.conclusion}
            </p>
          </div>
        )}
      </div>
      
      {/* Navigation controls */}
      <div className="flex justify-between mb-6">
        <button 
          onClick={handleBack} 
          disabled={history.length === 0}
          className={`px-4 py-2 rounded ${history.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          ← Back
        </button>
        <button 
          onClick={handleReset} 
          className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded"
        >
          Reset
        </button>
      </div>
      
      {/* Decision path */}
      {history.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Your Decision Path:</h3>
          <div className="p-4 bg-gray-100 rounded-md text-sm">
            <ol className="list-decimal pl-4">
              {history.map((item, index) => {
                const node = decisionNodes[item.id];
                const selectedOption = node.options.find(opt => opt.nextNode === item.selection);
                return (
                  <li key={index} className="mb-1">
                    <span className="font-medium">{node.question}</span>
                    {selectedOption && (
                      <span className="text-blue-600"> → {selectedOption.text}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
      
      {/* All conclusions reached */}
      {conclusions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Conclusions Reached:</h3>
          <div className="space-y-2">
            {conclusions.map((conclusion, index) => (
              <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800">
                {conclusion}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionTree;
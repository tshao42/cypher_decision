import React, { useState } from 'react';

const DecisionTree = () => {
  // Track current node and history
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [history, setHistory] = useState([]);
  const [conclusions, setConclusions] = useState([]);
  
  // Sample decision tree data structure
  // You can customize this with your own decision nodes
  const decisionNodes = {
    'start': {
      question: 'What\'s the decision today?',
      options: [
        { text: 'IF/TF for a certain type of task', nextNode: 'type-specific' },
        { text: 'Length Constraint', nextNode: 'length-constraint' },
        { text: 'Restatement Explanation', nextNode: 'restatement-test' },
        { text: 'Localization vs. Writing', nextNode: 'loc-vs-writing' }
      ]
    },
    'type-specific': {
        question: 'What is the prompt type?',
        options: [
          { text: 'Content Extraction', nextNode: 'extraction' },
          { text: 'Summarization', nextNode: 'summarization' },
          { text: 'Rewrite', nextNode: 'rewrite' },
          { text: 'Closed Q&A', nextNode: 'closedqa' },
          { text: 'Classification', nextNode: 'classification' },
          { text: 'Open Q&A', nextNode: 'openqa' },
          { text: 'Brainstorming', nextNode: 'brainstorming' },
          { text: 'Creative Writing', nextNode: 'creativewriting' },
          { text: 'Chatbot', nextNode: 'chatbot' }
        ]
      },
    'extraction': {
      question: 'Does it have reference text',
      options: [
        { text: 'Yes', nextNode: 'extraction_all_data' },
        { text: 'No', nextNode: 'conclusion_skip' }
      ]
    },
    'extraction_all_data': {
        question: 'Does it pull all data it should pull?',
        options: [
          { text: 'Yes', nextNode: 'extraction_accurate_data' },
          { text: 'No', nextNode: 'conclusion_if_tf_issue' }
        ]
      },
    'extraction_accurate_data': {
        question: 'Does it pull all data accurately?',
        options: [
            { text: 'Yes', nextNode: 'extraction_unneeded_detail' },
            { text: 'No', nextNode: 'conclusion_if_tf_issue' }
        ]
    },
    'extraction_unneeded_detail': {
        question: 'Does it add any significant detail beyond the text?',
        options: [
            { text: 'Yes', nextNode: 'conclusion_tf_issue' },
            { text: 'No', nextNode: 'restatement_test' }
        ]
    },
    'perf_speed': {
      question: 'When does the speed issue occur?',
      options: [
        { text: 'At peak usage times', nextNode: 'conclusion_1' },
        { text: 'Consistently throughout the day', nextNode: 'conclusion_2' },
        { text: 'Only during specific operations', nextNode: 'conclusion_3' }
      ]
    },
    'perf_resource': {
      question: 'Which resource is being over-utilized?',
      options: [
        { text: 'CPU', nextNode: 'conclusion_4' },
        { text: 'Memory', nextNode: 'conclusion_5' },
        { text: 'Disk I/O', nextNode: 'conclusion_6' }
      ]
    },
    'perf_scale': {
      question: 'At what threshold does performance degrade?',
      options: [
        { text: 'Low user count (0-100)', nextNode: 'conclusion_7' },
        { text: 'Medium user count (100-1000)', nextNode: 'conclusion_8' },
        { text: 'High user count (1000+)', nextNode: 'conclusion_9' }
      ]
    },
    'budget': {
      question: 'What is your budget concern?',
      options: [
        { text: 'Initial implementation cost', nextNode: 'budget_initial' },
        { text: 'Ongoing maintenance cost', nextNode: 'budget_maintenance' },
        { text: 'Total cost of ownership', nextNode: 'budget_tco' }
      ]
    },
    'budget_initial': {
      question: 'What is your implementation budget range?',
      options: [
        { text: 'Low ($0-$10K)', nextNode: 'conclusion_10' },
        { text: 'Medium ($10K-$50K)', nextNode: 'conclusion_11' },
        { text: 'High ($50K+)', nextNode: 'conclusion_12' }
      ]
    },
    'technical': {
      question: 'What technical limitation are you experiencing?',
      options: [
        { text: 'Integration challenges', nextNode: 'tech_integration' },
        { text: 'Legacy system compatibility', nextNode: 'tech_legacy' },
        { text: 'Security constraints', nextNode: 'tech_security' }
      ]
    },
    // Conclusions
    'conclusion_skip': {
      conclusion: 'Skip the task.',
      options: []
    },
    'conclusion_if_tf_no_issue': {
      conclusion: 'Neither Instruction Following nor Truthfulness is penalized.',
      options: []
    },
    'conclusion_if_issue': {
      conclusion: 'Penalize Instruction Following. Do not penalize Truthfulness.',
      options: []
    },
    'conclusion_tf_issue': {
      conclusion: 'Penalize Truthfulness. Do not penalize Instruction Following.',
      options: []
    },
    'conclusion_if_tf_issue': {
      conclusion: 'Penalize both Instruction Following and Truthfulness.',
      options: []
    }
  };

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
      
      // Remove last conclusion if we're going back
      if (conclusions.length > 0 && decisionNodes[currentNodeId]?.conclusion) {
        const newConclusions = [...conclusions];
        newConclusions.pop();
        setConclusions(newConclusions);
      }
    }
  };

  const currentNode = decisionNodes[currentNodeId];

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
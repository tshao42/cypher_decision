import React, { useState } from 'react';
import './BlockMarker.css'; // Import the CSS file

const BlockMarker = ({ blockSets = [] }) => {
    const [expandedBlocks, setExpandedBlocks] = useState([]);
    const [selectedSetIndex, setSelectedSetIndex] = useState(0); // State to track the selected set

    const handleBlockClick = (index) => {
        if (expandedBlocks.includes(index)) {
            setExpandedBlocks(expandedBlocks.filter((i) => i !== index));
        } else {
            setExpandedBlocks([...expandedBlocks, index]);
        }
    };

    const handleSetChange = (index) => {
        setSelectedSetIndex(index);
        setExpandedBlocks([]); // Reset expanded blocks when switching sets
    };

    const selectedSet = blockSets[selectedSetIndex];

    return (
        <div>
            <h3>Interactive IF vs. TF Chart w/ Annotations</h3>
            {/* Render buttons to select sets */}
            <div className="set-buttons">
                {blockSets.map((set, index) => (
                    <button
                        key={index}
                        onClick={() => handleSetChange(index)}
                        className={selectedSetIndex === index ? 'active' : ''}
                    >
                        {set.label}
                    </button>
                ))}
            </div>

            {/* Render blocks for the selected set */}
            <div>
                {selectedSet.blocks.map((block, index) => (
                    <div
                        key={index}
                        className="block-container"
                        onClick={() => handleBlockClick(index)}
                    >
                        <div className="block-content">
                            <strong>Block:</strong> {block.text}
                        </div>
                        <div
                            className={`block-annotation ${
                                expandedBlocks.includes(index) ? 'expanded' : ''
                            }`}
                        >
                            {expandedBlocks.includes(index) && block.annotation}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlockMarker;

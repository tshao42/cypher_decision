import React, { useState } from 'react';

const MermaidGraphDisplay = () => {
    const [activeSvg, setActiveSvg] = useState(null);
    const svgData = [
        { path: '/public/mermaids/chatbot.svg', property: 'Chatbot' },
        { path: '/public/mermaids/classification.svg', property: 'Classification' },
        { path: '/public/mermaids/closedqna.svg', property: 'Closed Q&A' },
        { path: '/public/mermaids/extraction.svg', property: 'Extractions' },
        { path: '/public/mermaids/length-constraint.svg', property: 'Length Constraint' },
        { path: '/public/mermaids/rewrite.svg', property: 'Rewrite' }
    ];

    const handleButtonClick = (svgName) => {
        setActiveSvg(svgName);
    };

    const closeModal = () => {
        setActiveSvg(null);
    };

    const handleModalClick = (e) => {
        if (e.target.className === 'modal') {
            closeModal();
        }
    };

    return (
        <>
        <h3>Flowcharts - Visual </h3>
            <div>
                {svgData.map((svg, index) => (
                    <button key={index} onClick={() => handleButtonClick(svg.property)}>
                        {svg.property}
                    </button>
                ))}
            </div>
            {activeSvg && (
                <div className="modal" onClick={handleModalClick}>
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        {svgData.map((svg, index) => (
                            activeSvg === svg.property && (
                                <img key={index} src={svg.path} alt={svg.property} style={{ width: '80vw', height: '80vh' }} />
                            )
                        ))}
                    </div>
                </div>
            )}
            <style jsx>{`
                .modal {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                }
                .modal-content {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    overflow: auto;
                }
                .modal-content img {
                    max-width: 100%;
                    max-height: 100%;
                }
                .close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 24px;
                    cursor: pointer;
                }
            `}</style>
        </>
    );
};

export default MermaidGraphDisplay;
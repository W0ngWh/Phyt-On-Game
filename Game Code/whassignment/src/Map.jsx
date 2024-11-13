import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Map.css';

const Map = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [currentNode, setCurrentNode] = useState(0);
  const [showFight, setShowFight] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null); 
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null); 
  const navigate = useNavigate();

  const paths = {
    easy: [
      { id: 0, label: 'Start' },
      { id: 1, label: 'Enemy' },
      { id: 2, label: 'Enemy' },
      { id: 3, label: 'Boss' },
      { id: 4, label: 'End' },
    ],
    medium: [
      { id: 0, label: 'Start' },
      { id: 1, label: 'Enemy' },
      { id: 2, label: 'Enemy' },
      { id: 3, label: 'Enemy' },
      { id: 4, label: 'Boss' },
      { id: 5, label: 'End' },
    ],
    hard: [
      { id: 0, label: 'Start' },
      { id: 1, label: 'Enemy' },
      { id: 2, label: 'Enemy' },
      { id: 3, label: 'Enemy' },
      { id: 4, label: 'Enemy' },
      { id: 5, label: 'Boss' },
      { id: 6, label: 'End' },
    ],
  };

  const nodes = difficulty ? paths[difficulty] : [];

  const startGame = (level) => {
    setDifficulty(level);
    setCurrentNode(0);
  };

  const fetchQuestion = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/questions', {
            params: { difficulty: difficulty },
        });

        if (response.data && response.data.length > 0) {
            const randomQuestionIndex = Math.floor(Math.random() * response.data.length);
            const randomQuestion = response.data[randomQuestionIndex];
            const shuffledAnswers = [...randomQuestion.answers].sort(() => Math.random() - 0.5);
            randomQuestion.answers = shuffledAnswers;

            setQuestionData([randomQuestion]); 
            setShowFight(true);
            setSelectedAnswer(null);
            setIsAnswerCorrect(null);
        } else {
            alert('No questions found for this difficulty.');
        }
    } catch (error) {
        console.error('Error fetching question:', error);
        alert('Failed to load questions. Please try again or skip the fight.');
    }
};

  const moveCharacter = () => {
    if (currentNode < nodes.length - 1) {
      const nextNode = nodes[currentNode + 1];
      setCurrentNode(currentNode + 1);

      if (nextNode.label === 'Enemy' || nextNode.label === 'Boss') {
        fetchQuestion(); 
      } else if (nextNode.label === 'End') {
        navigate('/End');
      }
    }
  };

  const endFight = () => {
    setShowFight(false);
    setQuestionData(null);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  const handleAnswerSelection = (answer) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
      setIsAnswerCorrect(answer.correct);
    }
  };

  const renderAnswerButtons = () => {
    return questionData[0].answers.map((answer) => {
      let answerClass = '';
  
      if (selectedAnswer) {
        if (answer.id === selectedAnswer.id) {
          answerClass = isAnswerCorrect ? 'correct' : 'incorrect';
        }
        if (answer.correct && answer.id !== selectedAnswer?.id) {
          answerClass = 'correct-answer';
        }
      }
  

      return (
        <button
          key={answer.id}
          onClick={() => handleAnswerSelection(answer)}
          className={answerClass}
          disabled={selectedAnswer} 
        >
          {answer.text}
        </button>
      );
    });
  };

  const renderNodes = () => {
    return nodes.map((node, index) => (
      <div key={node.id} className="node-container">
        <div className={`sprite ${node.label.toLowerCase()}-sprite`} />
        {currentNode === index && <div className="character-sprite" />}
        <div className={`node ${currentNode === index ? 'active' : ''}`}>
          {node.label}
        </div>
      </div>
    ));
  };

  return (
    <div className="body-Map">
      <div className="map-container fade-in">
        {!difficulty ? (
          <div className="difficulty-options">
            <h1>Select Difficulty!</h1>
            <button onClick={() => startGame('easy')}>Easy!</button>
            <button onClick={() => startGame('medium')}>Medium!</button>
            <button onClick={() => startGame('hard')}>Hard!</button>
          </div>
        ) : showFight && questionData ? (
          <div className="fight-display">
            <h2>{nodes[currentNode].label} Fight!</h2>
            <div className="question-container">
              <p>{questionData[0].text}</p>
              <div className="answers">
                {renderAnswerButtons()} 
              </div>
            </div>
            <button
              onClick={endFight}
              className="continue-button"
              disabled={selectedAnswer === null} 
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="map-box fade-in">
            <h1 className="map-title">Game Map!!</h1>
            <div className="map">{renderNodes()}</div>
            <button onClick={moveCharacter} disabled={currentNode === nodes.length - 1}>
              Move!!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;

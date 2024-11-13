import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Multiplayer.css';

const Multiplayer = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [questionData, setQuestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [lives, setLives] = useState({ player1: 3, player2: 3 });
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [activePlayer, setActivePlayer] = useState(null);
  const [playerSelected, setPlayerSelected] = useState(false);
  const [powerUps, setPowerUps] = useState({ player1: [], player2: [] });
  const [showPowerUpScreen, setShowPowerUpScreen] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState({ player1: 0, player2: 0 });
  const [showPowerUpInput, setShowPowerUpInput] = useState(false);
  const [powerUpInput, setPowerUpInput] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    if (difficulty) {
      fetchQuestions(difficulty);
    }
  }, [difficulty]);

  const fetchQuestions = async (level) => {
    try {
      const response = await axios.get('http://localhost:5000/api/questions', {
        params: { difficulty: level },
      });
      if (response.data && response.data.length > 0) {
        const shuffledQuestions = shuffleArray(response.data).map((question) => ({
          ...question,
          answers: question.answers.sort(() => Math.random() - 0.5),
        }));
        
        setQuestionData(shuffledQuestions);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        setLives({ player1: 3, player2: 3 });
        setScore({ player1: 0, player2: 0 });
        setGameOver(false);
      } else {
        alert('No questions found.');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handlePlayerSelection = (player) => {
    setActivePlayer(player);
    setPlayerSelected(true);
  };

  const handleAnswerSelection = (answer) => {
    if (!selectedAnswer) {
        setSelectedAnswer(answer);
        setIsAnswerCorrect(answer.correct);
        const currentPlayer = activePlayer;

        if (answer.correct) {
            setScore((prevScore) => ({
                ...prevScore,
                [currentPlayer]: prevScore[currentPlayer] + 100,
            }));
            setCorrectAnswers((prevCount) => ({
                ...prevCount,
                [currentPlayer]: prevCount[currentPlayer] + 1,
            }));

            if (correctAnswers[currentPlayer] % 2 === 1) {
                setShowPowerUpInput(true);
            }
        } else {
            setLives((prevLives) => {
                const updatedLives = { ...prevLives, [currentPlayer]: prevLives[currentPlayer] - 1 };
                if (updatedLives[currentPlayer] <= 0) {
                    setGameOver(true);
                }
                return updatedLives;
            });
        }
    }
};

  const handlePowerUpSelection = () => {
    const number = parseInt(powerUpInput);
    if (number >= 1 && number <= 6) {
      const powerUpOptions = [
        { type: 'Life', description: 'Add 1 Life' },
        { type: 'Mpoints50', description: 'Deduct 50 Points' },
        { type: 'Mpoints100', description: 'Deduct 100 Points' },
        { type: 'Mpoints200', description: 'Deduct 200 Points' },
        { type: 'Points100', description: 'Add 100 Points' },
        { type: 'Points200', description: 'Add 200 Points' },
      ];

      const shuffledPowerUps = powerUpOptions.sort(() => Math.random() - 0.5);
      const selectedPowerUp = shuffledPowerUps[0];
      
      setPowerUps((prevPowerUps) => ({
        ...prevPowerUps,
        [activePlayer]: [...prevPowerUps[activePlayer], selectedPowerUp],
      }));
      setPowerUpInput('');
      setShowPowerUpInput(false);
    } else {
      alert('Please enter a number between 1 and 6.');
    }
  };

  const handleUsePowerUp = (powerUp) => {
    const opponent = activePlayer === 'player1' ? 'player2' : 'player1';
    
    switch (powerUp.type) {
      case 'Life':
        setLives((prevLives) => ({
          ...prevLives,
          [activePlayer]: prevLives[activePlayer] + 1,
        }));
        break;
      case 'Mpoints50':
        setScore((prevScore) => ({
          ...prevScore,
          [opponent]: Math.max(0, prevScore[opponent] - 50),  
        }));
        break;
      case 'Mpoints100':
        setScore((prevScore) => ({
          ...prevScore,
          [opponent]: Math.max(0, prevScore[opponent] - 100), 
        }));
        break;
        case 'Mpoints200':
            setScore((prevScore) => ({
              ...prevScore,
              [opponent]: Math.max(0, prevScore[opponent] - 200),  
            }));
            break;
      case 'Points100':
        setScore((prevScore) => ({
          ...prevScore,
          [activePlayer]: prevScore[activePlayer] + 100,
        }));
        break;
      case 'Points200':
        setScore((prevScore) => ({
          ...prevScore,
          [activePlayer]: prevScore[activePlayer] + 200,
        }));
        break;
      default:
        break;
    }
  
    setPowerUps((prevPowerUps) => ({
      ...prevPowerUps,
      [activePlayer]: prevPowerUps[activePlayer].filter((p) => p !== powerUp),
    }));
    setShowPowerUpScreen(false);
  };
  

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questionData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      setActivePlayer(activePlayer === 'player1' ? 'player2' : 'player1');
    } else {
      setGameOver(true);
    }
  };

  const togglePowerUpScreen = () => {
    setShowPowerUpScreen((prev) => !prev);
  };

  const handleGameOver = () => {
    navigate('/Menu');
  };

  const renderAnswerButtons = () => {
    return questionData[currentQuestionIndex]?.answers.map((answer) => {
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
          className={`answer ${answerClass}`}
        >
          {answer.text}
        </button>
      );
    });
  };

  return (
    <div className="body-Multiplayer">
      <div className="map-container fade-in">
        {gameOver ? (
          <div className="game-over">
            <h1>Game Over!</h1>
            <p>Player 1 Score: {score.player1}</p>
            <p>Player 2 Score: {score.player2}</p>
            <button onClick={handleGameOver}>Go to Main Page</button>
          </div>
        ) : !difficulty ? (
          <div className="difficulty-options">
            <h1>Select Difficulty!</h1>
            <button onClick={() => setDifficulty('easy')}>Easy</button>
            <button onClick={() => setDifficulty('medium')}>Medium</button>
            <button onClick={() => setDifficulty('hard')}>Hard</button>
          </div>
        ) : !playerSelected ? (
          <div className="player-selection">
            <h1>Select First Player</h1>
            <button onClick={() => handlePlayerSelection('player1')}>Player 1</button>
            <button onClick={() => handlePlayerSelection('player2')}>Player 2</button>
          </div>
        ) : showPowerUpScreen ? (
          <div className="power-up-screen">
            <h2>Select a Power-Up!</h2>
            {powerUps[activePlayer].map((powerUp, index) => (
              <button
                key={index}
                onClick={() => handleUsePowerUp(powerUp)}
                className="power-up-button"
              >
                {powerUp.description}
              </button>
            ))}
            <button onClick={togglePowerUpScreen} className="back-to-questions">
              Back to Questions
            </button>
          </div>
        ) : showPowerUpInput ? (
          <div className="power-up-input">
            <h1>Enter a number between 1 and 6 to select a Power-Up!</h1>
            <input
              type="text"
              value={powerUpInput}
              onChange={(e) => setPowerUpInput(e.target.value)}
              maxLength={1}
            />
            <button onClick={handlePowerUpSelection}>Confirm Power-Up</button>
          </div>
        ) : (
          <div className="fight-display">
            <h2>{activePlayer === 'player1' ? "Player 1's Turn" : "Player 2's Turn"}</h2>
            <div className="question-container">
               <p>{questionData[currentQuestionIndex]?.text}</p>
               <div className="answers">{renderAnswerButtons()}</div>
            <div className="status">
              <div className="plives">
              <p>Player 1 - Lives: {lives.player1} | Score: {score.player1}</p>
              <p>Player 2 - Lives: {lives.player2} | Score: {score.player2}</p>
            </div>
            <div className="pups">
              <button onClick={togglePowerUpScreen} className="power-up-icon-button">
                <div className="power-up-icon"></div>
              </button>
            </div>
            </div>
            {selectedAnswer && (
              <button
                onClick={handleNextQuestion}
                className="continue-button"
                disabled={selectedAnswer === null}
              >
                Next Question
              </button>
            )}

          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Multiplayer;

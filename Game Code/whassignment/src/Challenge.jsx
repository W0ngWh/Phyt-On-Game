  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import './Challenge.css';

  const Challenge = () => {
    const [difficulty, setDifficulty] = useState(null);
    const [questionData, setQuestionData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [scoreSaved, setScoreSaved] = useState(false);
    const [username, setUsername] = useState('');
    const [powerUps, setPowerUps] = useState([]); 
    const [showPowerUpScreen, setShowPowerUpScreen] = useState(false); 
    const [correctAnswers, setCorrectAnswers] = useState(0); 
    const [showPowerUpInput, setShowPowerUpInput] = useState(false);
    const [powerUpInput, setPowerUpInput] = useState(''); 

    const navigate = useNavigate();

    useEffect(() => {
      const fetchUserData = async () => {
          try {
              const token = localStorage.getItem('token'); // Get the token from local storage
              const response = await fetch('http://localhost:5000/api/user/data', {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });

              if (response.ok) {
                  const data = await response.json();
                  setUsername(data.username); // Set the username in the state
              } else {
                  console.error('Failed to fetch user data');
              }
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };

      fetchUserData();
    }, []);

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const startGame = (level) => {
      console.log('Selected Difficulty:', level);
      setDifficulty(level);
      fetchQuestions(level);
    };

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
          setLives(3);
          setScore(0);
          setGameOver(false);
          setScoreSaved(false);
          setCorrectAnswers(0); 
          setPowerUps([]);
        } else {
          alert('No questions found for this difficulty.');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Failed to load questions. Please try again.');
      }
    };

    const handleAnswerSelection = (answer) => {
      if (!selectedAnswer) {
        setSelectedAnswer(answer);
        setIsAnswerCorrect(answer.correct);
    
        if (answer.correct) {
          setScore((prevScore) => prevScore + 100);
    
          // Increment correct answers count
          setCorrectAnswers((prevCount) => {
            const newCount = prevCount + 1;
    
            // Show the power-up input every two correct answers
            if (newCount % 2 === 0 && !showPowerUpInput) {
              setShowPowerUpInput(true); 
            }
    
            return newCount;
          });
        } else {
          setLives((prevLives) => {
            const newLives = prevLives - 1;
            if (newLives <= 0) {
              setGameOver(true);
            }
            return newLives;
          });
        }
      }
    };
    

    const handlePowerUpSelection = () => {
      const number = parseInt(powerUpInput);
    
      if (number >= 1 && number <= 6) {
        const powerUpOptions = [
          { type: 'Life', description: 'Add 1 Life' },
          { type: 'Points50', description: 'Add 50 Points' },
          { type: 'Points100', description: 'Add 100 Points' },
          { type: 'Points150', description: 'Add 150 Points' },
          { type: 'Points200', description: 'Add 200 Points' },
          { type: 'SkipQuestion', description: 'Skip Question and Gain 100 Points' },
        ];
    
        const shuffledPowerUps = powerUpOptions.sort(() => Math.random() - 0.5);
    
        const selectedPowerUp = shuffledPowerUps[0];
    
        setPowerUps((prev) => [...prev, selectedPowerUp]);
        setPowerUpInput(''); 
        setShowPowerUpInput(false); 
      } else {
        alert('Please enter a number between 1 and 6.');
      }
    };

    const handleUsePowerUp = (powerUp) => {
      switch (powerUp.type) {
        case 'Life':
          setLives((prevLives) => prevLives + 1);
          break;
        case 'Points50':
          setScore((prevScore) => prevScore + 50);
          break;
        case 'Points100':
          setScore((prevScore) => prevScore + 100);
          break;
        case 'Points150':
          setScore((prevScore) => prevScore + 150);
          break;
        case 'Points200':
          setScore((prevScore) => prevScore + 200);
          break;
        case 'SkipQuestion':
          handleNextQuestion();
          setScore((prevScore) => prevScore + 100); 
          break;
        default:
          break;
      }
      setPowerUps((prev) => prev.filter((p) => p !== powerUp));
      setShowPowerUpScreen(false); // Return to question screen after using a power-up
    };

    const togglePowerUpScreen = () => {
      setShowPowerUpScreen((prev) => !prev);
    };

    const handleNextQuestion = () => {
      if (currentQuestionIndex + 1 < questionData.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      } else {
        setGameOver(true);
        saveScore(); // Save score when all questions are answered
      }
    };

    const saveScore = async () => {
      if (!scoreSaved && username) {
        try {
          await axios.post('http://localhost:5000/api/leaderboard', {
            username,
            score,
            difficulty,   
          });
          setScoreSaved(true);
        } catch (error) {
          console.error('Error saving score:', error);
        }
      }
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
      <div className="body-Challenge">
        <div className="map-container fade-in">
          {gameOver ? (
            <div className="game-over">
              <h1>{lives > 0 ? 'You Finished the Game!' : 'Game Over!'}</h1>
              <p>Score: {score}</p>
              <button onClick={handleGameOver}>Go to Main Page</button>
            </div>
          ) : !difficulty ? (
            <div className="difficulty-options">
              <h1>Select Difficulty!</h1>
              <button onClick={() => startGame('easy')}>Easy!</button>
              <button onClick={() => startGame('medium')}>Medium!</button>
              <button onClick={() => startGame('hard')}>Hard!</button>
            </div>
          ) : showPowerUpScreen ? (
            <div className="power-up-screen">
              <h2>Select a Power-Up!</h2>
              <div className="power-ups">
                {powerUps.map((powerUp, index) => (
                  <button
                    key={index}
                    onClick={() => handleUsePowerUp(powerUp)}
                    className="power-up-button"
                  >
                    {powerUp.description}
                  </button>
                ))}
              </div>
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
              <h2>Fight!</h2>
              <div className="question-container">
                <p>{questionData[currentQuestionIndex]?.text}</p>
                <div className="answers">{renderAnswerButtons()}</div>
              </div>
              <div className="status-container">
                <p className="lives">Lives: {lives}</p>
                <p className="score">Score: {score}</p>
    
                <button onClick={togglePowerUpScreen} className="power-up-icon-button">
                  <div className="power-up-icon"></div>
                </button>
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
          )}
        </div>
      </div>
    );
    
    
    
  };  

  export default Challenge;

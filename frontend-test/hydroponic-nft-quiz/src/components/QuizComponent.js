import React, { useState } from 'react';
import { questions } from './questions';
import { mintNFT } from './flow/transactions';

export function QuizComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');

  const handleAnswer = async (selectedOption) => {
    const question = questions[currentQuestion];
    if (selectedOption === question.correctAnswer) {
      setResult('Correct! You can now mint an NFT.');
      try {
        await mintNFT(question.nftType);
        setResult('Correct! NFT minted successfully.');
      } catch (error) {
        setResult('Correct, but there was an error minting the NFT.');
        console.error(error);
      }
    } else {
      setResult('Incorrect. Try again!');
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setShowResult(false);
    setResult('');
  };

  if (currentQuestion >= questions.length) {
    return <div>Quiz completed!</div>;
  }

  const question = questions[currentQuestion];

  return (
    <div>
      <h2>{question.text}</h2>
      {question.options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(index)}>
          {option}
        </button>
      ))}
      {showResult && (
        <div>
          <p>{result}</p>
          <button onClick={nextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect } from 'react';

const DailyLotteryRoll = () => {
  const [numbers, setNumbers] = useState(Array(6).fill(''));  // 6 input numbers
  const [error, setError] = useState('');
  const [lotteryResult, setLotteryResult] = useState({ numbers: [], specialNumber: null }); // Stored lottery result
  const [matchResult, setMatchResult] = useState('');

  // Handle manual input of numbers
  const handleNumberChange = (index, value) => {
    if (value === '' || (/^\d+$/.test(value) && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 49)) {
      let newNumbers = [...numbers];
      newNumbers[index] = value;  // Keep the value as a string for easier multi-digit input
      setNumbers(newNumbers);
    }
  };

  // Generate random numbers without duplicates
  const generateRandomNumbers = () => {
    let numSet = new Set();
    while (numSet.size < 6) {
      numSet.add(Math.floor(Math.random() * 49) + 1);
    }

    // Set the random numbers to the input fields
    setNumbers([...numSet].map(num => String(num)));
    setError('');
  };

  // Generate lottery result in the background
  const generateLotteryResult = () => {
    let resultSet = new Set();
    while (resultSet.size < 5) {
      resultSet.add(Math.floor(Math.random() * 49) + 1);
    }
    const resultSpecialNumber = Math.floor(Math.random() * 49) + 1;

    setLotteryResult({
      numbers: [...resultSet],
      specialNumber: resultSpecialNumber,
    });
  };

  // Trigger lottery result generation when the component mounts
  useEffect(() => {
    generateLotteryResult();
  }, []);

  // Validate that all numbers are entered and there are no duplicates
  const validateNumbers = () => {
    let numSet = new Set(numbers.map(num => parseInt(num, 10)));
    if (numbers.some(num => num === '')) {
      setError('Please enter all numbers.');
      return false;
    } else if (numSet.size < 6) {
      setError('Numbers must be unique.');
      return false;
    }
    setError('');
    return true;
  };

  // Compare input numbers with the stored lottery result
  const compareNumbers = () => {
    const inputNumbers = numbers.map(num => parseInt(num, 10));
    const resultNumbers = [...lotteryResult.numbers, lotteryResult.specialNumber];  // Combine numbers and special number

    const matchedNumbers = inputNumbers.filter(num => resultNumbers.includes(num));

    if (matchedNumbers.length === 6) {
      setMatchResult('Bingo!');
    } else {
      setMatchResult('Try your best!');
    }
  };

  // Handle manual submission of numbers
  const handleSubmit = () => {
    if (validateNumbers()) {
      compareNumbers();  // Compare the input numbers to the lottery result
      generateLotteryResult();  // Generate a new lottery result after submission
    }
  };

  return (
    <div>
      <h2>Daily Lottery Roll</h2>
      <div>
        <h3>Input 6 numbers (1-49):</h3>

        {/* First row: 6 number inputs + generate button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {numbers.map((num, index) => (
            <input
              key={index}
              type="text"
              value={num}
              maxLength="2"
              placeholder={`Number ${index + 1}`}
              onChange={(e) => handleNumberChange(index, e.target.value)}
            />
          ))}
          <button onClick={generateRandomNumbers} style={{ marginLeft: '10px' }}>
            Generate Random Numbers
          </button>
        </div>

        {/* Second row: Submit button */}
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleSubmit}>
            Submit Numbers
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Display comparison result */}
      {matchResult && (
        <div style={{ marginTop: '20px' }}>
          <h3>Result:</h3>
          <p>{matchResult}</p>
        </div>
      )}

      {/* Tester Feature: Display stored lottery result */}
      <div style={{ marginTop: '20px' }}>
        <h3>Stored Lottery Result (Tester):</h3>
        <p>Numbers: {lotteryResult.numbers.join(', ')}</p>
        <p>Special Number: {lotteryResult.specialNumber}</p>
      </div>
    </div>
  );
};

export default DailyLotteryRoll;
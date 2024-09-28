import React, { useState } from 'react';

const BuckLotteryRoll = () => {
  const [lotteryNumber, setLotteryNumber] = useState(null);

  const rollLottery = () => {
    const randomNum = Math.floor(Math.random() * 500) + 1; // Random number between 1 and 500
    setLotteryNumber(randomNum);
  };

  return (
    <div>
      <h2>Buck Lottery Roll</h2>
      <p>Pending to open.</p>
      {/* <button onClick={rollLottery}>Roll Lottery</button>
      {lotteryNumber !== null && <p>Your number: {lotteryNumber}</p>} */}
    </div>
  );
};

export default BuckLotteryRoll;
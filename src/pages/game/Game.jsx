import css from './Game.module.css';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Table from '../../components/sudokuField/Table.jsx';
import NewGameBtn from '../../components/newGame/NewGame.jsx';
import Timer from '../../components/timer/Timer';
import BtnCont from '../../components/levelFilter/LevelGameBtn.jsx';
import ControlBtnCont from '../../components/button/ControlBtn.jsx';
import {
  generateSudoku,
  getDeepCopy,
  removeCells,
  createEmptyGrid,
  checkValid,
  solver,
  compareSudokus,
} from '../../components/functionsSudoku.js';

const Game = () => {
  const [difficulty, setDifficulty] = useState(81);
  const [sudokuArr, setSudokuArr] = useState(createEmptyGrid());
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [initialSudokuArr, setInitialSudokuArr] = useState(createEmptyGrid());
  const [initialRemovedCellsArr, setInitialRemovedCellsArr] = useState(
    createEmptyGrid()
  );

  useEffect(() => {
    const initialSudoku = generateSudoku();
    const sudokuWithRemovedCells = removeCells(initialSudoku, difficulty);
    setSudokuArr(sudokuWithRemovedCells);
    setInitialSudokuArr(initialSudoku);
    setInitialRemovedCellsArr(sudokuWithRemovedCells);

    let timer;
    if (gameStarted) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [difficulty, gameStarted]);

  function newGame() {
    const newSudoku = generateSudoku();
    const sudokuWithRemovedCells = removeCells(newSudoku, difficulty);
    setSudokuArr(sudokuWithRemovedCells);
    setInitialSudokuArr(newSudoku);
    setInitialRemovedCellsArr(sudokuWithRemovedCells);
    setGameStarted(true);
    setTime(0);
  }

  function onInputChange(e, row, column) {
    var value = parseInt(e.target.value) || -1,
      grid = getDeepCopy(sudokuArr);
    if (
      value === -1 ||
      (value >= 1 && value <= 9 && checkValid(grid, row, column, value))
    ) {
      grid[row][column] = value;
    } else {
      toast.error('Incorrect value! Try again!!!');
    }

    setSudokuArr(grid);
    setGameStarted(true);
  }

  function solveSudoku() {
    let sudoku = getDeepCopy(sudokuArr);
    solver(sudoku);
    setSudokuArr(sudoku);
  }

  function checkSudoku() {
    if (compareSudokus(sudokuArr, initialSudokuArr)) {
      toast.success('Congratulations! You have solved Sudoku!');
    } else {
      toast.info('Keep going!');
    }
  }

  function resetSudoku() {
    setSudokuArr(getDeepCopy(initialRemovedCellsArr));
    setTime(0);
    setGameStarted(false);
  }

  return (
    <div className={css.game}>
      <main>
        <h1>MY SUDOKU</h1>
        <p>Choose your game level:</p>
        <ToastContainer />

        <BtnCont switchDifficulty={setDifficulty} />
        <NewGameBtn newGame={newGame} />
        <Timer time={time} />
        <Table sudokuArr={sudokuArr} onInputChange={onInputChange} />
        <ControlBtnCont
          checkSudoku={checkSudoku}
          solveSudoku={solveSudoku}
          resetSudoku={resetSudoku}
        />
      </main>
    </div>
  );
};

export default Game;

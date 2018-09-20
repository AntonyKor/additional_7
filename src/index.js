let solveSudoku = function(matrix) {
  matrix = inputSudoku(matrix);

  let counter = 0, oldMatr;

  while ((matrix+"") !== oldMatr) {
    oldMatr = matrix+"";
    matrix = solveAttempt(matrix, singleInRow);
    matrix = solveAttempt(matrix, hiddenInRow);

    

    // console.log("\n\n")
    // console.log(matrix);
    // console.log(oldMatr);

    // console.log(++counter);
  }


  // console.log(matrix);
  return outputSudoku(matrix);
};

let singleInRow = function(rowS) {
  let notInRow = [1,2,3,4,5,6,7,8,9];
  
  for (let i = 0; i < 9; i++) 
    if (rowS[i].length === 1)
      for (let j = 0; j < 9; j++)
        if (rowS[i][0] === notInRow[j])
          notInRow[j] = 0;
  
  notInRow = notInRow.filter((item) => item);
//  console.log(notInRow);
  
  for (let i = 0; i < 9; i++)
    if (rowS[i].length === 0)
      rowS[i] = notInRow;
  	else if (rowS[i].length > 1) {
      rowS[i] = rowS[i].filter(function(item) {
        let result = false;
        
        for (let j = 0; j < notInRow.length; j++)
          if (notInRow[j] === item) 
            result = true;
        
        return result;
      })
      
    };
  
  return rowS;
}

let hiddenInRow = function(rowH) {
  let inRow = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0]];

  for (let i = 0; i < 9; i++) 
    if (rowH[i].length > 1) {
      for (let j = 0; j < rowH[i].length; j++)
        for (let k = 0; k < 9; k++) 
          if (rowH[i][j] === inRow[k][0]) {
            inRow[k][1]++;
            inRow[k][2] = i;
          }
    } else {
      // console.log (i + " " + row[i][0])
      for (let k = 0; k < 9; k++) 
        if (rowH[i][0] === inRow[k][0]) {
          inRow[k][1]++;
          inRow[k][2] = i;
        }
    }
  
  // console.log("\nRow:");console.log(row.join("|"));
  // console.log("inRow:");console.log(inRow.join("|"));

  inRow = inRow.filter((item) => item[1] === 1);
  // console.log("inRow:");console.log(inRow.join("|"));

  for (let i = 0; i < inRow.length; i++)
    rowH[inRow[i][2]] = [inRow[i][0]]
    // console.log("Row:");console.log(row.join("|"));

  return rowH;
}

let checkCols = function(sudokuC, func) {
  for (let i = 0; i < 9; i++) {
    let row = [];
    
    for (let j = 0; j < 9; j++)
      row[j] = sudokuC[j][i];
    
    row = func(row);
//    console.log(row);
    
    for (let j = 0; j < 9; j++)
      sudokuC[j][i] = row[j];
  }
  return sudokuC
}

let checkSqrs = function(sudokuSq, func) {
  for (let i = 0; i < 9; i++) {
    let x0 = i*3, y0 = 0;
    
    if (x0 > 17) {
      x0 -= 18;
      y0 = 6;
    } else if (x0 > 8) {
      x0 -= 9;
      y0 = 3;
    }
    
    let row = [];
    
    for (let j = 0; j < 9; j++) {
      let x = j, y = 0;
      
      if (x > 5) {
        x -= 6;
        y = 2;
      } else if (x > 2) {
        x -= 3;
        y = 1;
      }
      
//     console.log("y " + y + " " + (y + y0) + " x " + x + " " + (x + x0) + " res " + sudoku[y + y0][x + x0] + " i " + i);
//      console.log();
//      console.log()
      
      row[j] = sudokuSq[y + y0][x + x0];
    }
    
    row = func(row);
//    console.log(row);
    
    for (let j = 0; j < 9; j++){
      let x = j, y = 0;
      
      if (x > 5) {
        x -= 6;
        y = 2;
      } else if (x > 2) {
        x -= 3;
        y = 1;
      }
      
      sudokuSq[y + y0][x + x0] = row[j];
      
//       console.log("y " + y + " " + (y + y0) + " x " + x + " " + (x + x0) + " res " + sudoku[y + y0][x + x0] + " i " + i);
    }
  }
  return sudokuSq;
}

let isSolved = function(sudokuI) {
  for (let i = 0; i < 9; i++){
    for (let j = 0; j < 9; j++){
      if (sudokuI[i][j].length !== 1)
        return false;
    }}
  return true;
}

let solveAttempt = function(sudokuS, func) {
  for (let i = 0; i < 9; i++)
    sudokuS[i] = func(sudokuS[i]);
  
  sudokuS = checkCols(sudokuS, func);
  sudokuS = checkSqrs(sudokuS, func);

  return sudokuS;
}

let outputSudoku = function(sudokuO) {
  let mat = sudokuO;

  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      if (mat[i][j].length == 1)
        mat[i][j] = mat[i][j][0];
      else
      mat[i][j] = 0;

  return mat;
}

let inputSudoku = function(sudokuIn) {
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      if (sudokuIn[i][j] !== 0)
        sudokuIn[i][j] = [sudokuIn[i][j]];
      else 
        sudokuIn[i][j] = [];

  return sudokuIn;
}


// console.log(solveSudoku([
//   [6, 5, 0, 7, 3, 0, 0, 8, 0],
//   [0, 0, 0, 4, 8, 0, 5, 3, 0],
//   [8, 4, 0, 9, 2, 5, 0, 0, 0],
//   [0, 9, 0, 8, 0, 0, 0, 0, 0],
//   [5, 3, 0, 2, 0, 9, 6, 0, 0],
//   [0, 0, 6, 0, 0, 0, 8, 0, 0],
//   [0, 0, 9, 0, 0, 0, 0, 0, 6],
//   [0, 0, 7, 0, 0, 0, 0, 5, 0],
//   [1, 6, 5, 3, 9, 0, 4, 7, 0]
// ]))

// console.log(solveSudoku([
//   [0, 5, 0, 0, 7, 0, 0, 0, 1],
//   [8, 7, 6, 0, 2, 1, 9, 0, 3],
//   [0, 0, 0, 0, 3, 5, 0, 0, 0],
//   [0, 0, 0, 0, 4, 3, 6, 1, 0],
//   [0, 4, 0, 0, 0, 9, 0, 0, 2],
//   [0, 1, 2, 0, 5, 0, 0, 0, 4],
//   [0, 8, 9, 0, 6, 4, 0, 0, 0],
//   [0, 0, 0, 0, 0, 7, 0, 0, 0],
//   [1, 6, 7, 0, 0, 2, 5, 4, 0]
// ]))

// console.log(hiddenInRow( [ [ 1],[ 2 ],[ 3 ],[ 4 , 3],[ 1 , 2 , 5 ],[ 6 ],[ 7 ],[ 8 ],[ 7, 8, 2 ]]))
// console.log(hiddenInRow( [ [ 6 ],[ 5 ],[ 1, 2 ],[ 7 ],[ 3 ],[ 1 ],[ 1, 2, 9 ],[ 8 ],[ 1, 2, 4, 9 ]]))

module.exports = solveSudoku
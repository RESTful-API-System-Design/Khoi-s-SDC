const findNumberOfIsland = (matrix) => {
  let numOfIsland = 0;
  //EDGE CASE 0x0 matrix
  if(matrix.length === 0) {
    return numOfIsland;
  }

  //LOGIC CASE
  //EDGE CASE
  //traverse through matrix
  let landStorage = [];
  for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix[i].length; j++) {
      if(matrix[i][j] === '1') {
        landStorage.push([i, j]);
      }
    }
  }
  //EDGE CASE FOR NO LAND


  //ISLAND CASE
  let connectingLandArr = [];
  connectingLandArr.push(landStorage[0]);
  for(let i = 0; i < landStorage.length; i++) {
    let current = landStorage[i];
    //current = [0, 1]
    console.log('current', current);
    let landAfter = undefined;
    if(landStorage[i+1]) {
      landAfter = landStorage[i + 1];
      if(current[0] + 1 === landAfter[0]) {
        connectingLandArr.push(landAfter);
        landStorage.shift(landStorage[i]);
      } else if(current[1] + 1 === landAfter[1]) {
        connectingLandArr.push(landAfter);
        landStorage.shift(landStorage[i]);
      } else {
        numOfIsland++;
      }
    }
    //console.log('landAfter', landAfter);
    //landAfter = [1, 0]

  }

  if(landStorage.length === 0) {
    return numOfIsland;
  }

  return numOfIsland;
};

const island = [['1', '1', '0', '0', '0'],  ['1', '1', '0', '0', '0'], ['0', '0', '1', '0', '0'], ['0', '0', '0', '1', '1']];

console.log(findNumberOfIsland(island));
const getHorizontalMatches = (arr, val, coord) => {
  const matches = []
  const [row] = coord
  const rowToCheck = arr[row]

  for(let i = 0; i < rowToCheck.length; i++) {
    if (arr[row][i] === val) matches.push([row, i])
  }

  return matches
}

const getVerticalMatches = (arr, val, coord) => {
  const matches = []
  const [row, column] = coord
  const columnToCheck = []

  for(let i = 0; i < arr.length; i++) {
    if (arr[i][column] === val) matches.push([i, column])
  }

  return matches
}

const getLeftDiagonalStartPoint = (coord) => {
  let [row, column] = coord

  while(row !== 0 && column !== 0) {
    row = row - 1
    column = column - 1
  }

  return [row, column]
}

const getRightDiagonalStartPoint = (arr, coord) => {
  const rowLength = arr[0].length
  let [row, column] = coord

  while(row !== 0 && column !== rowLength - 1) {
    row = row - 1
    column = column + 1
  }

  return [row, column]
}

const getLeftDiagonalMatches = (arr, val, diagonalStartPoint) => {
  const matches = []
  const rowLength = arr[0].length
  let [row, column] = diagonalStartPoint

  while(row !== arr.length - 1 && column !== rowLength) {
    if (arr[row][column] === val) {
      matches.push([row, column])
    }

    row = row + 1
    column = column + 1
  }

  return matches
}

const getRightDiagonalMatches = (arr, val, diagonalStartPoint) => {
  const matches = []
  let [diagonalStartRow, diagonalStartColumn] = diagonalStartPoint

  for(let i = diagonalStartRow; i < arr.length - diagonalStartRow; i++) {
    if (arr[i][diagonalStartColumn] === val) matches.push([i, diagonalStartColumn])
    diagonalStartColumn = diagonalStartColumn - 1
  }

  return matches
}

const connectedValues = (arr, val, coord) => {
  const [row, column] = coord

  if (arr[row][column] !== val) return []

  const leftDiagonalStartPoint = getLeftDiagonalStartPoint(coord)
  const rightDiagonalStartPoint = getRightDiagonalStartPoint(arr, coord)
  
  const horizontalMatches = getHorizontalMatches(arr, val, coord)
  const verticalMatches = getVerticalMatches(arr, val, coord)
  const diagonalLeftMatches = getLeftDiagonalMatches(arr, val, leftDiagonalStartPoint)
  const diagonalRightMatches = getRightDiagonalMatches(arr, val, rightDiagonalStartPoint)

  const stringifiedHorizontalMatches = horizontalMatches.map(coord => JSON.stringify(coord))
  const stringifiedVerticalMatches = verticalMatches.map(coord => JSON.stringify(coord))
  const stringifiedDiagonalLeftMatches = diagonalLeftMatches.map(coord => JSON.stringify(coord))
  const stringiedDiagonalRightMatches = diagonalRightMatches.map(coord => JSON.stringify(coord))

  const matchesWithoutRepeat = [
    ...new Set([
      ...stringifiedHorizontalMatches,
      ...stringifiedVerticalMatches,
      ...stringifiedDiagonalLeftMatches,
      ...stringiedDiagonalRightMatches
    ])
  ]

  const parsedMatchesWithoutRepeat = matchesWithoutRepeat.map(coord => JSON.parse(coord))

  return parsedMatchesWithoutRepeat
}

export {
  connectedValues
}

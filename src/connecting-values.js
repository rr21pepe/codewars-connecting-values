const stringify = val => JSON.stringify(val)
const parse = val => JSON.parse(val)

const getHorizontalMatches = (arr, val, coord) => {
  const matches = []
  const [row] = coord

  arr[row].forEach((cell, idx) => {
    if (cell === val) matches.push([row, idx])
  })

  return matches
}

const getVerticalMatches = (arr, val, coord) => {
  const matches = []
  const [row, column] = coord

  arr.forEach((cell, idx) => {
    if (cell[column] === val) matches.push([idx, column])
  })

  return matches
}

const getLeftDiagonalStartPoint = ([row, column]) =>
  row > column
    ? [row - column, 0]
    : [0, column - row]

const getRightDiagonalStartPoint = (arr, [row, column]) => {
  const rowLength = arr[0].length - 1

  return row >= column
    ? [0, column + row]
    : [row - (rowLength - column), column + (rowLength - column)]
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

  const stringifiedHorizontalMatches = horizontalMatches.map(stringify)
  const stringifiedVerticalMatches = verticalMatches.map(stringify)
  const stringifiedDiagonalLeftMatches = diagonalLeftMatches.map(stringify)
  const stringiedDiagonalRightMatches = diagonalRightMatches.map(stringify)

  const matchesWithoutRepeat = [
    ...new Set([
      ...stringifiedHorizontalMatches,
      ...stringifiedVerticalMatches,
      ...stringifiedDiagonalLeftMatches,
      ...stringiedDiagonalRightMatches
    ])
  ]

  const parsedMatchesWithoutRepeat = matchesWithoutRepeat.map(parse)

  return parsedMatchesWithoutRepeat
}

export {
  connectedValues
}

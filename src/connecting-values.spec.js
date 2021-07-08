import { connectedValues } from './connecting-values'


describe('Testing connectedValues', function() {
  describe('Testing an array with more columns than rows', function() {
    const arr = [
      //0, 1, 2, 3, 4, 5, 6, 7
      [ 0, 0, 0, 1, 3, 4, 0, 3 ], // 0
      [ 0, 2, 0, 0, 2, 0, 0, 5 ], // 1
      [ 0, 0, 0, 2, 0, 1, 1, 1 ], // 2
      [ 2, 3, 4, 1, 3, 1, 0, 0 ], // 3
      [ 0, 1, 5, 1, 6, 0, 2, 0 ], // 4
      [ 2, 0, 2, 3, 1, 1, 1, 1 ], // 5
      [ 2, 0, 2, 3, 1, 1, 1, 1 ]  // 6
    ]

    it('Should return [] when arr at coord != value', function() {
        expect(connectedValues(arr, 5, [1, 1])).toEqual([])
    })

    it('Should return the correct array of coordinates when the value only matches once', function() {
        expect(connectedValues(arr, 5, [1, 7])).toEqual([ [1, 7] ])
    })

    it('Should return the correct array of coordinates when the value matches more than once (1)', function() {
      expect(connectedValues(arr, 4, [3, 2]).sort()).toEqual([ [0, 5], [3, 2] ].sort())
    })

    it('Should return the correct array of coordinates when the value matches more than once (2)', function() {
      const expected = [
        [0, 0], [0, 1], [0, 2], [0, 6],
        [1, 0], [2, 0], [4, 0],
        [2, 2]
      ]
      expect(connectedValues(arr, 0, [0, 0]).sort()).toEqual(expected.sort())
    })

    it('Should return the correct array of coordinates when the value matches more than once (3)', function() {
      const expected = [ [2, 7], [5, 7], [6, 4], [6, 5], [6, 6],[6, 7], [5, 6] ]
      expect(connectedValues(arr, 1, [6, 7]).sort()).toEqual(expected.sort())
    })
  })

  describe('Testing an array with more rows than columns', function() {
    const arr = [
      //0, 1, 2, 3, 4
      [ 0, 0, 0, 1, 3 ], // 0
      [ 0, 2, 0, 0, 5 ], // 1
      [ 0, 0, 0, 2, 1 ], // 2
      [ 2, 3, 4, 1, 0 ], // 3
      [ 0, 1, 5, 1, 0 ], // 4
      [ 2, 0, 2, 3, 1 ], // 5
      [ 2, 0, 2, 3, 1 ]  // 6
    ]

    it('Should return [] when arr at coord != value', function() {
      expect(connectedValues(arr, 0, [5, 4])).toEqual([])
    })

    it('Should return the correct array of coordinates when the value only matches once', function() {
        expect(connectedValues(arr, 5, [1, 4])).toEqual([ [1, 4] ])
    })

    it('Should return the correct array of coordinates when the value matches more than once (1)', function() {
      const expected = [
        [0, 0], [0, 2], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [4, 0], [4, 4]
      ]
      expect(connectedValues(arr, 0, [2, 2]).sort()).toEqual(expected.sort())
    })

    it('Should return the correct array of coordinates when the value matches more than once (2)', function() {
      const expected = [ [3, 0], [5, 0], [6, 0], [6, 2] ]
      expect(connectedValues(arr, 2, [6, 0]).sort()).toEqual(expected.sort())
    })

    it('Should return the correct array of coordinates when the value matches more than once (3)', function() {
      const expected = [
        [6, 4],
        [2, 4], [5, 4]
      ]
      expect(connectedValues(arr, 1, [6, 4]).sort()).toEqual(expected.sort())
    })
  })

  describe('Testing an array with same columns and rows', function() {
    const arr = [
      //0, 1, 2, 3
      [ 0, 0, 0, 1 ], // 0
      [ 0, 2, 0, 0 ], // 1
      [ 0, 0, 0, 2 ], // 2
      [ 2, 3, 4, 1 ]  // 3
    ]

    it('Should return [] when arr at coord != value', function() {
      expect(connectedValues(arr, 1, [2, 3])).toEqual([])
    })

    it('Should return the correct array of coordinates when the value only matches once', function() {
        expect(connectedValues(arr, 3, [3, 1])).toEqual([ [3, 1] ])
    })

    it('Should return the correct array of coordinates when the value matches more than once (1)', function() {
      const expected = [
        [2, 0], [2, 1], [2, 2],
        [0, 2], [1, 2],
        [0, 0],
        [1, 3]
      ]
      expect(connectedValues(arr, 0, [2, 2]).sort()).toEqual(expected.sort())
    })

    it('Should return the correct array of coordinates when the value matches more than once (2)', function() {
      const expected = [ [0, 2], [1, 0], [1, 2], [1, 3], [2, 2] ]
      expect(connectedValues(arr, 0, [1, 3]).sort()).toEqual(expected.sort())
    })

    it('Should return the correct array of coordinates when the value matches more than once (3)', function() {
      const expected = [ [0, 1], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2] ]
      expect(connectedValues(arr, 0, [2, 1]).sort()).toEqual(expected.sort())
    })
  })
})

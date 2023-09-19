import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useInventoryStore = defineStore('inventory', () => {
  const w = 5
  const h = 5

  const board = ref([])
  const openModel = ref(false)
  const isNotNullCell = ref(false)
  const count = ref(0)
  const saveRowIndex = ref(0)
  const saveColIndex = ref(0)

  const getRandomColor = () => {
    return 'hsla(' + Math.random() * 360 + ', 100%, 50%, 1)'
  }
  const generateBoard = (w, h) => {
    const board = []

    for (let i = 0; i < w; i++) {
      board[i] = []
      for (let j = 0; j < h; j++) {
        board[i][j] = []
      }
    }
    return board
  }
  onMounted(() => {
    const savedBoard = JSON.parse(localStorage.getItem('board'))
    board.value = savedBoard || generateBoard(w, h)
  })

  const openCreateCell = (row, col) => {
    if (count.value <= 0) {
      return
    }
    board.value[row][col].push({
      id: Math.floor(Math.random() * 10000),
      count: count.value,
      backgroundColor: getRandomColor(),
    })
    localStorage.setItem('board', JSON.stringify(board.value))
  }
  const handleDragStart = (event, rowIndex, colIndex) => {
    if (board.value[rowIndex][colIndex].length === 0) {
      event.preventDefault()
      return
    }
    event.dataTransfer.setData('text/plain', JSON.stringify({ rowIndex, colIndex }))
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event, dropRowIndex, dropColIndex) => {
    event.preventDefault()
    const jsonData = event.dataTransfer.getData('text/plain')
    const { rowIndex, colIndex } = JSON.parse(jsonData)
    const draggedCell = board.value[rowIndex][colIndex].pop()

    if (board.value[dropRowIndex][dropColIndex].length > 0) {
      const targetCell = board.value[dropRowIndex][dropColIndex].pop()
      board.value[rowIndex][colIndex].push(targetCell)
    }

    board.value[dropRowIndex][dropColIndex].push(draggedCell)
    localStorage.setItem('board', JSON.stringify(board.value))
  }
  const deleteCall = () => {
    const count = board.value[saveRowIndex.value][saveColIndex.value]
    if (count[0].count === 1) {
      board.value[saveRowIndex.value][saveColIndex.value].pop()
      localStorage.setItem('board', JSON.stringify(board.value))
    } else {
      count[0].count--
      localStorage.setItem('board', JSON.stringify(board.value))
    }
  }

  return {
    w,
    h,
    board,
    openModel,
    isNotNullCell,
    count,
    saveRowIndex,
    saveColIndex,
    openCreateCell,
    handleDragStart,
    handleDragOver,
    handleDrop,
    deleteCall,
    getRandomColor
  }
})

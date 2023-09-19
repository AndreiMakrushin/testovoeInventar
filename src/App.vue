<script setup>
import { ref, onMounted } from 'vue'
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
  board.value = generateBoard(w, h)
})

const openCreateCell = (row, col) => {
  board.value[row][col].push({
    id: Math.floor(Math.random() * 10000),
    count: count.value,
    backgroundColor: getRandomColor()
  })
  localStorage.setItem('board', JSON.stringify(board.value))
}
const handleDragStart = (event, rowIndex, colIndex) => {
  if (board.value[rowIndex][colIndex].length === 0) {
    event.preventDefault();
    return;
  }
  event.dataTransfer.setData('text/plain', JSON.stringify({ rowIndex, colIndex }));
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
}
const deleteCall = () => {
  board.value[saveRowIndex.value][saveColIndex.value].pop()
}
</script>
<template>
  <div>
    <div class="container">
      <div class="main-block">
        <div class="left-block"></div>
        <div class="right-block">
          <table class="board">
            <tr v-for="(row, rowIndex) in board" :key="rowIndex">
              <td
                v-for="(cell, colIndex) in row"
                :key="colIndex"
                class="cell"
                @click="(openModel = true), cell.length === 1 ? isNotNullCell = true : isNotNullCell = false, (saveRowIndex = rowIndex), (saveColIndex = colIndex)"
                @dragstart="handleDragStart($event, rowIndex, colIndex)"
                @dragover="handleDragOver($event)"
                @drop="handleDrop($event, rowIndex, colIndex)"
                draggable="true"
              >
                <div v-if="cell.length > 0" :style="{ backgroundColor: cell[0].backgroundColor }">
                  {{ cell[0].count }}
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="create-cell" v-if="openModel">
        <h1>Создайте ячейку</h1>
        <h3>Введите колисчество</h3>
        <input type="number" v-model="count" v-if="!isNotNullCell"/>
        <button @click="openCreateCell(saveRowIndex, saveColIndex), (openModel = false), count = 0" v-if="!isNotNullCell">
          Создать
        </button>
        <button v-if="isNotNullCell" @click="(openModel = false), (deleteCall())">Удалить </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex; /* Здесь указывается 5 ячеек по 50 пикселей */
  height: 100%;
  width: 100%;
}

.board {
  border-collapse: collapse;
}

.cell {
  border: 1px solid black;
  height: 50px;
  width: 50px;
  text-align: center;
  vertical-align: middle;
}
</style>

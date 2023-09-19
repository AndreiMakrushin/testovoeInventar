<script setup>
import {  reactive } from 'vue'
import {useInventoryStore} from './stores/inventory'
import Modal from './components/Modal.vue';

const states = reactive(useInventoryStore())

</script>
<template>
  <div>
    <div class="container">
      <div class="main-block">
        <div class="left-block"></div>
        <div class="right-block">
          <table class="board">
            <tr v-for="(row, rowIndex) in states.board" :key="rowIndex">
              <td
                v-for="(cell, colIndex) in row"
                :key="colIndex"
                class="cell"
                @click="(states.openModel = true), cell.length === 1 ? states.isNotNullCell = true : states.isNotNullCell = false, (states.saveRowIndex = rowIndex), (states.saveColIndex = colIndex)"
                @dragstart="states.handleDragStart($event, rowIndex, colIndex)"
                @dragover="states.handleDragOver($event)"
                @drop="states.handleDrop($event, rowIndex, colIndex)"
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
      <Modal />
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

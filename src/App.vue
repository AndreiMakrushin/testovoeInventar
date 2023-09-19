<script setup>
import {  reactive } from 'vue'
import {useInventoryStore} from './stores/inventory'
import Modal from './components/Modal.vue';

const states = reactive(useInventoryStore())

</script>
<template>
  <div>
    <div class="container">
      <div class="main-block row">
        <div class="left-block col-md-3" >
          <img src="./assets/img/Img.png" alt="">
          <img class="skeletons" src="./assets/img/Skeletons.png" alt="">
        </div>
        <div class="right-block col-md-6">
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
                <div class="cell" v-if="cell.length > 0" :style="{ backgroundColor: cell[0].backgroundColor }">
                  <div class="edn">{{ cell[0].count }}</div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="col-md-3">
          <Modal />
        </div>
      </div>
      <div class="db-block">
        <img src="./assets/img/Skeleton.png" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped>

.container {
  margin-top: 50px;
}
.row{
  display: flex;
  justify-content: center;
}
.edn{
  text-align: center;
  width: 20px;
  height: 20px;
  border: 1px solid #4D4D4D;
  border-top-left-radius: 50%;
margin-top: 81%;
margin-left: 81%;
}
.skeletons {
  margin-top: 20px;
  padding: 20px;
  
}
.board {
  border-collapse: collapse;
  background-color: #262626;
}

.cell {
  border: 1px solid #4D4D4D;
  height: 100px;
  width: 100px;
 text-align: end;
  vertical-align: bottom;
}
.left-block {
  background-color: #262626;
  max-width: 236px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.db-block {
  margin-left: 30px;
  background-color: #262626;
  margin-top: 20px;
  padding: 20px;
  width: 58%;
}
</style>

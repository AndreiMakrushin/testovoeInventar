<script setup>
import { computed, reactive } from 'vue'
import { useInventoryStore } from '../stores/inventory'

const states = reactive(useInventoryStore())


const text = computed(() => {
  return states.isNotNullCell ? 'Удалить ячейку' : 'Создать ячейку'
})
</script>
<template>
  <div>
    <div class="create-cell" v-if="states.openModel">
      <h1>{{text}}</h1>
      <h3 v-if="!states.isNotNullCell">Введите колисчество</h3>
      <input class="modal-input" type="number" v-model="states.count" v-if="!states.isNotNullCell" />
      <button
        @click="
          states.openCreateCell(states.saveRowIndex, states.saveColIndex),
            (states.openModel = false),
            (states.count = 0)
        "
        v-if="!states.isNotNullCell"
        class="btn-create"
      >
        Создать
      </button>
      <button 
      class="btn-danger"
      v-if="states.isNotNullCell"
       @click="(states.openModel = false), 
       states.deleteCall()"
       >
        Удалить
      </button>
    </div>
  </div>
</template>

<style scoped>
.create-cell {
  padding: 30px;
  background-color: #262626;
}
.btn-danger {
  margin-top: 20px;
  background-color: #FA7272;
  border-radius: 8px;
  color: aliceblue;
  height: 39px;
  width: 220px;
}
.btn-create {
  margin-top: 20px;
  background-color: #B8D998;
  border-radius: 8px;
  color: aliceblue;
  height: 39px;
  width: 220px;
}
.modal-input {
  width: 220px;
  padding: 5px 10px ;
  border-radius: 8px;
}
.modal-input:focus {
  box-shadow: 0 0 15px#B8D998;
}
</style>

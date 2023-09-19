<script setup>
import { computed, reactive, ref } from 'vue'
import { useInventoryStore } from '../stores/inventory'

const states = reactive(useInventoryStore())


const text = computed(() => {
  return states.isNotNullCell ? 'Удалить ячейку' : 'Создать ячейку'
})
const errorPush = ref(false)
</script>
<template>
  <div>
    <div class="create-cell" v-if="states.openModel">
      <h1>{{text}}</h1>
      <h3 v-if="!states.isNotNullCell">Введите колисчество</h3>
      <h2 class="red" v-if="errorPush">Значение поля должно быть больше нуля</h2>
      <input class="modal-input" type="number" v-model="states.count" v-if="!states.isNotNullCell" />
      <button
        @click="
        states.count <= 0 ? (errorPush = true) : (states.openCreateCell(states.saveRowIndex, states.saveColIndex), (states.openModel = false), (states.count = 0), (errorPush = false))
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

.red{
  color: red;
  font-size: 30px;
}
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

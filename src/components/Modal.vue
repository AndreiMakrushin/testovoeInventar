<script setup>
import { reactive } from 'vue'
import { useInventoryStore } from '../stores/inventory'
import HeaderModel from '@/components/HeaderModel.vue'
import Input from '@/components/Input.vue'

import Button from './Button.vue'

const states = reactive(useInventoryStore())

const createCell = () => {
  states.counter <= 0
    ? (states.errorPush = true)
    : (states.openCreateCell(states.saveRowIndex, states.saveColIndex),
      (states.openModel = false),
      (states.counter = 0),
      (states.errorPush = false))
}

const deleteCell = () => {
  if (states.counter <= 0) {
    states.errorPush = true
  } else {
    states.openModel = false
    states.deleteCall()
    states.counter = 0
  }
}
</script>
<template>
  <div>
    <div class="create-cell" v-if="states.openModel">
      <HeaderModel />
      <Input type="Number" :counter="states.counter" v-model="states.counter" />

      <Button class="create" :button="'Создать'" @click="createCell" v-if="!states.isNotNullCell" />
      <Button class="delete" :button="'Удалить'" @click="deleteCell" v-if="states.isNotNullCell" />
    </div>
  </div>
</template>

<style scoped>
.create-cell {
  padding: 30px;
  background-color: #262626;
}
</style>

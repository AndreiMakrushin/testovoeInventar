<script setup>
import { reactive } from 'vue'
import { useInventoryStore } from '../stores/inventory'

const states = reactive(useInventoryStore())
</script>
<template>
  <div>
    <div class="create-cell" v-if="states.openModel">
      <h1>Создайте ячейку</h1>
      <h3>Введите колисчество</h3>
      <input type="number" v-model="states.count" v-if="!states.isNotNullCell" />
      <button
        @click="
          states.openCreateCell(states.saveRowIndex, states.saveColIndex),
            (states.openModel = false),
            (states.count = 0)
        "
        v-if="!states.isNotNullCell"
      >
        Создать
      </button>
      <button v-if="states.isNotNullCell" @click="(states.openModel = false), states.deleteCall()">
        Удалить
      </button>
    </div>
  </div>
</template>

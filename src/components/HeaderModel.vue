<script setup>
import { reactive, computed} from 'vue'
import { useInventoryStore } from '../stores/inventory'

const states = reactive(useInventoryStore())

const text = computed(() => {
  return states.isNotNullCell ? 'Удалить ячейку' : 'Создать ячейку'
})
</script>

<template>
  <div>
    <div class="header">
      <h1>{{ text }}</h1>
      <h3 v-if="!states.isNotNullCell">Введите колисчество</h3>
      <h2 class="red" v-if="states.errorPush">Значение поля должно быть больше нуля</h2>
    </div>
  </div>
</template>

<style scoped>
.red {
  color: red;
  font-size: 30px;
}
</style>

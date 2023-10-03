<script setup>
const props = defineProps({
  button: String,
  class: String
})
</script>

<template>
  <div>
    <div class="button">
      <button :class="props.class">{{ props.button }}</button>
    </div>
  </div>
</template>

<style scoped>
.create {
  margin-top: 20px;
  background-color: #b8d998;
  border-radius: 8px;
  color: aliceblue;
  height: 39px;
  width: 220px;
}
.delete {
  margin-top: 20px;
  background-color: #fa7272;
  border-radius: 8px;
  color: aliceblue;
  height: 39px;
  width: 220px;
}
</style>

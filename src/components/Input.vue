<script setup>
const props = defineProps({
  type: Number,
  counter: Number
})
</script>

<template>
  <div>
    <div class="input">
      <input
        :type="props.type"
        :value="props.counter"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<style scoped>
.input {
  width: 220px;
  padding: 5px 10px;
  border-radius: 8px;
}

.input:focus {
  box-shadow: 0 0 15px#B8D998;
}
</style>

<template>
  <div>
    <a href="#">Hello</a>
    <div class="foo">
      Hello
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      color: "blue"
    };
  }
};
</script>

<style scoped>
a {
  color: v-bind(color);
}

:global(.foo),
:deep(.foo),
:slotted(.foo) {
  color: red;
}
</style>

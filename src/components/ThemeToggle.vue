<template>
  <button :class="['theme-toggle', theme]" @click="$emit('toggle-theme')">
    <img alt="Moon logo" src="../assets/Moon.svg">
    <img alt="Sun logo" src="../assets/Sun.svg">
  </button>
</template>

<script>
export default { props: ['theme'] }
</script>

<style scoped lang="scss">
.theme-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  height: 38px;
  padding: 5px;
  background-color: var(--theme-bg);
  border: none;
  cursor: pointer;
  box-shadow: 0px 0px 5px 0px #636AF233;
  border-radius: 30px;
  outline: none;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #fff;
    transition: transform .3s;
    background-color: #888888;
  }

  &.dark:after {
    transform: translateX(42px);
  }
}
</style>
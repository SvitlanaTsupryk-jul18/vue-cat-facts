<template>
  <div class="fact-card" @click="$emit('click')">
    <img :src="imgSrc" alt="Cat" class="fact-card__img" />
    <div class="fact-card__content">
      <div class="fact-card__text" :class="{ long: isLong }">{{ fact.fact }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['fact', 'imgSrc'],
  computed: {
    isLong() { return this.fact.fact.length >= 100 }
  }
}
</script>

<style scoped lang="scss">
.fact-card {
  height: 460px;
  max-width: 421px;
  border-radius: 6px;
  transition: all .25s;
  cursor: pointer;

  &:hover {
    background: var(--card-bg);
  }

  &__img {
    width: 100%;
    margin-bottom: 24px;
  }

  &__content {
    flex: 1;
    padding: 1rem;
  }

  &__text {
    font-size: 1.5rem;
    margin-bottom: 0.7rem;
    color: var(--main-color);
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 5;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;

    &.long {
      font-size: 1rem;
      color: var(--text-color);
    }
  }
}
</style>
<template>
  <div>
    <header class="header">
      <div class="container header__container">
        <router-link to="/" class="logo">
          <img alt="Cats logo" src="../assets/Logo.svg">
        </router-link>
        <div class="header__right">
          <ThemeToggle :theme="theme" @toggle-theme="$emit('toggle-theme')" />
          <div class="header__user" v-if="username">
            <span @click="$emit('log-out')" class="header__avatar" tabindex="0" role="button">
              {{ username ? username[0].toUpperCase() : '' }}
            </span>
          </div>
        </div>
      </div>
    </header>
    <div class="header__placeholder"></div>
  </div>
</template>

<script>
import ThemeToggle from './ThemeToggle.vue'
export default {
  props: ['username', 'theme'],
  components: { ThemeToggle },
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 95px;
  width: 100%;
  z-index: 99;
  background: var(--header-bg);
  color: var(--header-color);

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  &__right {
    display: flex;
    align-items: center;
  }

  &__user {
    cursor: pointer;
  }

  &__avatar {
    display: flex;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #636af2;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 31px;
    flex-shrink: 0;
    margin-left: 10px;
  }

  .logo {
    transition: all .4s;

    &:hover {
      transform: scale(1.05);
    }
  }

  .logo img {
    display: block;
    height: 67px;
    width: 185px;
  }

  &__placeholder {
    height: 95px;
  }
}

@media (max-width: 768px) {
  .header {
    height: 70px;
    &__placeholder {
      height: 70px;
    }

    .logo img {
      height: 50px;
      width: 136px;
    }

    &__avatar {
      width: 40px;
      height: 40px;
      font-size: 25px;
    }
  }
}
</style>
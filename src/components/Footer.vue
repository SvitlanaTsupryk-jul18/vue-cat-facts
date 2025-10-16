<template>
  <div>
    <footer class="footer">
      <div class="container">
        <div class="footer__top">
          <router-link to="/" class="white logo">
            <img alt="Cats logo" src="../assets/white-logo.svg">
          </router-link>
          <a href="https://keiki.app/">Some links</a>
        </div>
        <div class="footer__bottom">
          <p>@cats.com inc. All rights reserved.</p>
          <p>English</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.footer {
  background: #121212;
  color: white;

  &__top,
  &__bottom {
    display: flex;
    justify-content: space-between;
  }

  &__top {
    border-bottom: 1px solid #8E8E8E;
    padding: 32px 0 50px;
  }

  &__bottom {
    padding: 32px 0;
  }

  a {
    color: white;
  }
}
</style>
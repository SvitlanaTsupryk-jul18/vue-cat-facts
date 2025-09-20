<template>
  <div :class="['app', theme]">
    <Header :username="username" @log-out="logOut" :theme="theme" @toggle-theme="toggleTheme" />
    <router-view @login="logIn" @toggle-theme="toggleTheme" :theme="theme" />
    <Footer v-if="showFooter" />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: { Header, Footer },
  data() {
    return {
      theme: this.getInitialTheme(),
      username: localStorage.getItem('username') || ''
    }
  },
  computed: {
    showFooter() { return this.$route.path !== '/login' }
  },
  methods: {
    getInitialTheme() {
      if (localStorage.getItem('theme')) return localStorage.getItem('theme');
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
      return 'light';
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
    },
    logIn(username) {
      localStorage.setItem('username', username);
      this.username = username;
    },
    logOut() {
      localStorage.removeItem('username');
      this.username = '';
      this.$router.replace('/login');
    }
  }
}
</script>

<style lang="scss">
@use './styles/main.scss';
</style>

<template>
  <div>
    <div class="login">
      <form @submit.prevent="onLogin" class="login__form">
        <h1>Log in</h1>
        <p>Name</p>
        <input v-model="username" :class="{ 'input--error': error }" placeholder="Enter your name" maxlength="15"
          autocomplete="off" @input="validate" />
        <div v-if="error" class="error">{{ error }}</div>
        <button type="submit" :disabled="!valid">Log in</button>
      </form>
    </div>
    <Loader v-if="loading" />
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue';

export default {
  components: { Loader },
  data() {
    return { username: '', error: '', valid: false, loading: false }
  },
  methods: {
    validate() {
      const re = /^[A-Za-z]{3,15}$/;
      if (!this.username) this.error = 'Username required';
      else if (this.username.length < 3) this.error = 'Min 3 chars';
      else if (this.username.length > 15) this.error = 'Max 15 chars';
      else if (!re.test(this.username)) this.error = 'Latin letters only';
      else { this.error = ''; this.valid = true; return };
      this.valid = false;
    },
    onLogin() {
      this.validate();
      if (!this.valid) return;
      this.loading = true;
      localStorage.setItem('username', this.username);
      this.$emit('login', this.username);
      // Delay for showing loader
      setTimeout(() => {
        this.loading = false;
        this.$router.replace('/facts');
      }, 3000);
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  min-height: calc(100vh - 95px);

  .login__form {
    padding: 0 15px;
    width: 100%;
    max-width: 440px;
    margin: 0 auto;

    h1 {
      color: var(--main-color);
      font-size: 24px;
      line-height: 34px;
      padding: 116px 20px 48px;
      text-align: center;
    }

    input {
      display: block;
      width: 100%;
      padding: 12px 16px;
      border: 1px solid transparent;
      border-radius: 6px;
      background: var(--input-bg);
      line-height: 27px;
      color: var(--text-color);
      caret-color: var(--btn-bg);
      outline: none;

      &:focus {
        border-color: var(--btn-bg);
      }

      &.input--error {
        border-color: #FF4646;
      }
    }

    button {
      padding: 15px;
      border-radius: 6px;
      background: var(--btn-bg);
      color: #fff;
      border: none;
      cursor: pointer;
      outline: none;
      width: 224px;
      display: grid;
      place-items: center;
      font-size: 18px;
      font-weight: 600;
      margin: 48px auto 0;
      transition: all .3s;

      &:not(:disabled):hover {
        animation: heartBeat 1.3s ease-in-out;
      }

      &:disabled {
        opacity: .7;
      }
    }

    .error {
      color: #FF4646;
      position: absolute;
      font-size: 14px;
    }
  }

  @keyframes heartBeat {
    0% {
      transform: scale(1);
    }

    14% {
      transform: scale(1.05);
    }

    28% {
      transform: scale(.95);
    }

    42% {
      transform: scale(1.05);
    }

    70% {
      transform: scale(1);
    }
  }
}
</style>
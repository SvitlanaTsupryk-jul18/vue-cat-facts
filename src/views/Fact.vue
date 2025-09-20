<template>
  <div class="container fact-detail" v-if="fact">
    <router-link to="/facts" class="fact-detail__back">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.4694 20.0307L6.96945 12.5307C6.89971 12.461 6.84439 12.3783 6.80665 12.2873C6.76891 12.1962 6.74948 12.0986 6.74948 12.0001C6.74948 11.9015 6.76891 11.8039 6.80665 11.7128C6.84439 11.6218 6.89971 11.5391 6.96945 11.4694L14.4694 3.96943C14.6102 3.8287 14.801 3.74963 15.0001 3.74963C15.1991 3.74963 15.39 3.8287 15.5307 3.96943C15.6714 4.11016 15.7505 4.30103 15.7505 4.50005C15.7505 4.69907 15.6714 4.88995 15.5307 5.03068L8.56038 12.0001L15.5307 18.9694C15.6004 19.0391 15.6557 19.1218 15.6934 19.2129C15.7311 19.3039 15.7505 19.4015 15.7505 19.5001C15.7505 19.5986 15.7311 19.6962 15.6934 19.7872C15.6557 19.8783 15.6004 19.961 15.5307 20.0307C15.461 20.1004 15.3783 20.1556 15.2872 20.1933C15.1962 20.2311 15.0986 20.2505 15.0001 20.2505C14.9015 20.2505 14.8039 20.2311 14.7129 20.1933C14.6219 20.1556 14.5391 20.1004 14.4694 20.0307Z" fill="#434343"/></svg>
      Back
    </router-link>
    <div class="fact-detail__content">
      <img :src="imgSrc" alt="Cat" class="fact-detail__img" />
      <div class="fact-detail__text" :class="{ short: !isLong }">{{ fact.fact }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { catImages, hashId } from '@/data/data';

export default {
  data() {
    return { fact: null, imgSrc: '' }
  },
  computed: {
    isLong() { return this.fact && this.fact.fact.length >= 100 }
  },
  async created() {
    const res = await axios.get('https://catfact.ninja/facts?limit=100');
    const id = parseInt(this.$route.params.id);
    const found = res.data.data.find(f => f.fact.hashCode() === id);
    this.fact = found;
    if (found) this.imgSrc = catImages[Math.abs(id) % catImages.length];
  }
}

hashId();
</script>

<style scoped lang="scss">
.fact-detail {
  &__content {
    max-width: 900px;
    padding: 0 20px;
    margin: 50px auto;
  }

  &__img {
    display: block;
    width: 100%;
    margin-bottom: 42px;
  }

  &__text {
    color: var(--text-color);

    &.short {
      font-size: 24px;
    }
  }

  &__back {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-top: 24px;
    display: flex;
    color: var(--arrow-color);

    svg {
      transition: .3s all;
    }

    svg path {
      fill: var(--arrow-color)
    }

    &:hover svg {
      transform: translateX(-10px);
    }
  }
}
</style>
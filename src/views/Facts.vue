<template>
  <div class="container facts">
    <h1>Facts About Cats To Share With Kids!</h1>
    <div class="facts__controls">
      <div class="search__container">
        <input v-model="text" @input="debouncedUpdate" placeholder="Search facts here" />
      </div>
      <CustomSelect :options="sortOptions" :default-option='{ option: "all", text: "All facts" }' class="select"
        @input="setSort" />
    </div>
    <div v-if="shownFacts.length > 0" class="facts__list">
      <FactCard v-for="fact in shownFacts" :key="fact.id" :fact="fact" :img-src="getCatImage(fact.id)"
        @click.native="goToFact(fact.id)" />
    </div>
    <div v-else>
      <p>No items found. Please choose other criterias.</p>
    </div>
    <button v-if="canLoadMore" class="facts__more" @click="loadMore">Load More</button>
  </div>
</template>

<script>
import CustomSelect from '@/components/CustomSelect.vue';
import FactCard from '../components/FactCard.vue';
import axios from 'axios';
import { catImages, sortOptions } from '@/data/data';
import { debounce, hashId } from '@/data/utils';

export default {
  components: { FactCard, CustomSelect },
  data() {
    return {
      allFacts: [],
      shownCount: 10,
      sort: 'all',
      text: '',
      debouncedText: '',
      loading: false,
      sortOptions
    }
  },
  computed: {
    filtered() {
      let filteredFacts = this.allFacts;
      if (this.sort === 'short-only') filteredFacts = filteredFacts.filter(f => f.fact.length < 100);
      else if (this.sort === 'long-only') filteredFacts = filteredFacts.filter(f => f.fact.length >= 100);
      if (this.debouncedText) filteredFacts = filteredFacts.filter(f => f.fact.toLowerCase().includes(this.debouncedText.toLowerCase()));
      if (this.sort === 'longest') filteredFacts = filteredFacts.slice().sort((a, b) => b.fact.length - a.fact.length);
      else if (this.sort === 'shortest') filteredFacts = filteredFacts.slice().sort((a, b) => a.fact.length - b.fact.length);
      return filteredFacts;
    },
    shownFacts() { return this.filtered.slice(0, this.shownCount) },
    canLoadMore() { return this.filtered.length > this.shownCount }
  },
  created() {
    this.debouncedUpdate = debounce(this.updateFacts, 500);
  },
  mounted() { this.fetchFacts() },
  methods: {
    async fetchFacts() {
      this.loading = true;
      const res = await axios.get('https://catfact.ninja/facts?limit=100');
      this.allFacts = res.data.data.map(f => ({ ...f, id: hashId(f.fact) }));
      this.loading = false;
    },
    loadMore() { this.shownCount += 10 },
    getCatImage(id) {
      return catImages[Math.abs(id) % catImages.length];
    },
    updateFacts(event) {
      this.debouncedText = event.target.value;
      this.shownCount = 10;
    },
    goToFact(id) { this.$router.push(`/fact/${id}`) },
    setSort(option) {
      this.sort = option;
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  }
}

</script>

<style scoped lang="scss">
.facts {
  h1 {
    font-size: 56px;
    line-height: 120%;
    margin: 57px auto 32px;
    text-align: center;
  }

  .facts__controls {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 2rem;

    .search__container {
      position: relative;
      width: 100%;
      max-width: 373px;

      &:before {
        content: "";
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxLjUzMDYgMjAuNDY5M0wxNi44MzY1IDE1Ljc3NjJDMTguMTk3MSAxNC4xNDI4IDE4Ljg3NTUgMTIuMDQ3OCAxOC43MzA3IDkuOTI2OTFDMTguNTg1OSA3LjgwNjA0IDE3LjYyOSA1LjgyMjY1IDE2LjA1OTEgNC4zODkzMkMxNC40ODkyIDIuOTU1OTkgMTIuNDI3MSAyLjE4MzA4IDEwLjMwMTkgMi4yMzEzOEM4LjE3NjYzIDIuMjc5NjggNi4xNTE4MSAzLjE0NTQ3IDQuNjQ4NjQgNC42NDg2NEMzLjE0NTQ3IDYuMTUxODEgMi4yNzk2OCA4LjE3NjYzIDIuMjMxMzggMTAuMzAxOUMyLjE4MzA4IDEyLjQyNzEgMi45NTU5OSAxNC40ODkyIDQuMzg5MzIgMTYuMDU5MUM1LjgyMjY1IDE3LjYyOSA3LjgwNjA0IDE4LjU4NTkgOS45MjY5MSAxOC43MzA3QzEyLjA0NzggMTguODc1NSAxNC4xNDI4IDE4LjE5NzEgMTUuNzc2MiAxNi44MzY1TDIwLjQ2OTMgMjEuNTMwNkMyMC41MzkgMjEuNjAwMyAyMC42MjE4IDIxLjY1NTYgMjAuNzEyOCAyMS42OTMzQzIwLjgwMzggMjEuNzMxIDIwLjkwMTQgMjEuNzUwNCAyMSAyMS43NTA0QzIxLjA5ODUgMjEuNzUwNCAyMS4xOTYxIDIxLjczMSAyMS4yODcxIDIxLjY5MzNDMjEuMzc4MiAyMS42NTU2IDIxLjQ2MDkgMjEuNjAwMyAyMS41MzA2IDIxLjUzMDZDMjEuNjAwMyAyMS40NjA5IDIxLjY1NTYgMjEuMzc4MiAyMS42OTMzIDIxLjI4NzFDMjEuNzMxIDIxLjE5NjEgMjEuNzUwNCAyMS4wOTg1IDIxLjc1MDQgMjFDMjEuNzUwNCAyMC45MDE0IDIxLjczMSAyMC44MDM4IDIxLjY5MzMgMjAuNzEyOEMyMS42NTU2IDIwLjYyMTggMjEuNjAwMyAyMC41MzkgMjEuNTMwNiAyMC40NjkzWk0zLjc0OTk3IDEwLjVDMy43NDk5NyA5LjE2NDk1IDQuMTQ1ODUgNy44NTk5IDQuODg3NTUgNi43NDk4N0M1LjYyOTI1IDUuNjM5ODQgNi42ODM0NiA0Ljc3NDY3IDcuOTE2ODYgNC4yNjM3OEM5LjE1MDI2IDMuNzUyODkgMTAuNTA3NSAzLjYxOTIyIDExLjgxNjggMy44Nzk2N0MxMy4xMjYyIDQuMTQwMTIgMTQuMzI4OSA0Ljc4Mjk5IDE1LjI3MjkgNS43MjdDMTYuMjE2OSA2LjY3MSAxNi44NTk4IDcuODczNzQgMTcuMTIwMyA5LjE4MzExQzE3LjM4MDcgMTAuNDkyNSAxNy4yNDcxIDExLjg0OTcgMTYuNzM2MiAxMy4wODMxQzE2LjIyNTMgMTQuMzE2NSAxNS4zNjAxIDE1LjM3MDcgMTQuMjUwMSAxNi4xMTI0QzEzLjE0IDE2Ljg1NDEgMTEuODM1IDE3LjI1IDEwLjUgMTcuMjVDOC43MTAzNyAxNy4yNDggNi45OTQ2MyAxNi41MzYyIDUuNzI5MTkgMTUuMjcwOEM0LjQ2Mzc1IDE0LjAwNTMgMy43NTE5NiAxMi4yODk2IDMuNzQ5OTcgMTAuNVoiIGZpbGw9IiM0MzQzNDMiLz4KPC9zdmc+Cg==");
        background-size: contain;
        background-repeat: no-repeat;
      }

      input {
        padding: 12px 16px 12px 50px;
        background: var(--input-bg);
        width: 100%;
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
      }
    }
  }

  select {
    width: 300px;
    background: var(--input-bg);
    border-radius: 6px;
  }

  .facts__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 40px 30px;
    margin-bottom: 40px;
  }

  .facts__more {
    width: 310px;
    margin: 56px auto 48px;
    display: block;
    font-size: 18px;
    font-weight: 600;
    color: var(--btn-bg);
    padding: 15px;
    border-radius: 6px;
    background: transparent;
    border: 1px solid var(--btn-bg);
    transition: all .3s;
    cursor: pointer;

    &:hover {
      background: var(--btn-bg);
      color: white;
    }
  }
}

.dark .search__container:before {
  filter: invert(1)
}

@media (max-width: 768px) {
  .facts {
    h1 {
      font-size: 42px;
    }

    .facts__controls {
      flex-wrap: wrap;
    }
  }
}
</style>
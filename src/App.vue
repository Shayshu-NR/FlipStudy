<script>
import { RouterLink, RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue';

export default {
  setup() {
  },
  mounted() {

  },
  data() {
    return {}
  },
  components: {
    PageHeader
  }
}
</script>

<template>
  <PageHeader></PageHeader>
  <div class="h-full">
    <RouterView />
  </div>
</template>
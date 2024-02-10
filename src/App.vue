<script>
import { RouterView } from 'vue-router'
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
  <main class="h-full">
    <RouterView v-slot="{Component}">
      <!-- <Transition name="slide-right"> -->
        <component :is="Component"/>
      <!-- </Transition> -->
    </RouterView>
  </main>
</template>
<script>
import { useStore } from '../stores/store';
import FlipCardFront from '@/components/FlipCardFront.vue';
import FlipCardBack from '@/components/FlipCardBack.vue';
import CheckBoxButton from '@/components/CheckBoxButton.vue';
import CrossButton from '@/components/CrossButton.vue'
import { VueFlip } from 'vue-flip';

export default
  {
    name: 'Flip',
    props: {
      cardData: Object
    }
    ,
    setup() {
      const store = useStore();
      return { store };
    },
    mounted() {
    },
    data() {
      return {

      }
    },
    methods: {
    },
    components: {
      FlipCardFront,
      FlipCardBack,
      CheckBoxButton,
      CrossButton,
      VueFlip
    },
    watch: {

    }
  }

</script>

<template>
  <div class="flex flex-row h-100 w-100 justify-center items-center" style="min-width: 50vh;">
    <VueFlip :active-click="true" width="100%" height="0%" style="margin-bottom: 10rem;">
      <template v-slot:front style="position: relative !important;">
        <div class="flex flex-row justify-center">
          <FlipCardFront :title="this.cardData.front.title" :body="this.cardData.front.body"
            :tags="this.cardData.front.tags" class="w-100" />
        </div>
      </template>

      <template v-slot:back style="position: relative !important;">
        <div class="flex flex-row justify-center">
          <FlipCardBack :title="this.cardData.back.title" :body="this.cardData.back.body"
            :tags="this.cardData.back.tags" />
        </div>
      </template>
    </VueFlip>
  </div>
</template>
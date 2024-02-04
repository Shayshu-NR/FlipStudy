<script>
import { useStore } from '../stores/store';
import FlipCard from '@/components/FlipCard.vue';
import CrossButton from '@/components/CrossButton.vue';
import CheckBoxButton from '@/components/CheckBoxButton.vue';
import CardLogo from '@/components/icons/CardLogo.vue';
import CheckCircle from '@/components/icons/CheckCircle.vue';
import XCircle from '@/components/icons/XCircle.vue';
import ArrowCounterClockwise from '@/components/icons/ArrowCounterClockwise.vue';
import PencilSquare from '@/components/icons/PencilSquare.vue';

export default
  {
    name: 'Study',
    props: [],
    setup() {
      const store = useStore();
      return { store };
    },
    mounted() {
      this.restart();
    },
    data() {
      return {
        setData: {
          setID: "",
          setName: "This is a study set",
          setDescription: "Some set description",
          cards:
            [
              {
                "questionID": 0,
                "setID": "",
                "front": {
                  title: "Front Flip",
                  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
                  tags: [
                    {
                      tagName: "math"
                    },
                    {
                      tagName: "calculus"
                    }
                  ]
                },
                "back": {
                  title: "Back Flip",
                  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
                  tags: [
                    {
                      tagName: "math"
                    },
                    {
                      tagName: "calculus"
                    }
                  ]
                },
                "gotCorrect": null
              },
              {
                "questionID": 1,
                "setID": "",
                "front": {
                  title: "Next card",
                  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
                  tags: [
                    {
                      tagName: "math"
                    },
                    {
                      tagName: "calculus"
                    }
                  ]
                },
                "back": {
                  title: "Back Flip",
                  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
                  tags: [
                    {
                      tagName: "math"
                    },
                    {
                      tagName: "calculus"
                    }
                  ]
                },
                "gotCorrect": null
              }
            ],
        },
        questionCounter: 0,
        setFinished: false,
        triggerNextCard: false,
        questionResponse: false,
        startTime: 0,
        timeElapsed: 0,
        interval: null,
        time: '00:00'
      }
    },
    methods: {
      answerQuestion(rightWrong) {
        this.store.setData.cards[this.questionCounter].gotCorrect = rightWrong;
        this.store.setData.cards[this.questionCounter].endTime = Date.now();
        this.questionResponse = rightWrong;

        if (this.questionCounter == this.store.setData.cards.length - 1) {
          console.log(this.store.setData)
          this.questionCounter++;
          this.triggerNextCard = true;
          clearInterval(this.interval);
          setTimeout(() => {

            this.setFinished = true;
            // this.questionCounter = 0;
            this.triggerNextCard = false;
            this.$confetti.start(
              {
                defaultDropRate: 5,
                defaultSize: 5,
                windSpeedMax: 0.2,
                particlesPerFrame: 1
              }
            );

            setTimeout(() => {
              this.$confetti.stop();
            }, 2000)
          }, 1000);
        }
        else {
          this.triggerNextCard = true;
          setTimeout(() => {
            this.questionCounter++;
            this.store.setData.cards[this.questionCounter].startTime = Date.now();
            this.triggerNextCard = false;
          }, 1000);
        }
      },
      resetTimer() {
        if (this.interval != null) {
          clearInterval(this.interval);
          this.time = '00:00'
        }

        this.startTime = Date.now();

        this.interval = setInterval(() => {
          let current = Date.now();
          let seconds = Math.floor((current - this.startTime) / 1000);
          let minutes = Math.floor(seconds / 60);
          seconds = Math.floor(seconds % 60);

          this.time = this.prettifyTime(`${minutes}:${seconds}`);
        }, 1000);
      },
      prettifyTime(value) {

        let data = value.split(':');
        let minutes = data[0];
        let secondes = data[1];
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (secondes < 10) {
          secondes = "0" + secondes;
        }
        return minutes + ":" + secondes;

      },
      restart() {
        this.resetTimer();
        this.questionCounter = 0;
        this.triggerNextCard = false;
        this.setFinished = false;
        this.store.setData.cards.forEach(x => { x.gotCorrect = null; x.startTime = null; x.endTime = null; x.flip = false; });

        if (this.store.setData.cards.length > 0) {

          this.store.setData.cards[this.questionCounter].startTime = Date.now();
        }
      }
    },
    components: {
      FlipCard,
      CrossButton,
      CheckBoxButton,
      CardLogo,
      CheckCircle,
      XCircle,
      ArrowCounterClockwise,
      PencilSquare
    },
    watch: {

    },
    beforeUnmount() {
      clearInterval(this.interval);
    }
  }
</script>

<template>
  {{ this.store.setData }}
  <main>
    <div class="m-4 p-4">
      <div class="flex flex-row m-2 p-2">
        <div class="flex flex-col w-1/2">
          <div
            class="m-2 min-w-10 h-full rounded overflow-hidden border-slate-500 border border-opacity-20 p-2 bg-stone-50 shadow-md flex flex-col justify-between">
            <!--Set Name-->
            <div>
              <h1 class="text-lg">{{ this.store.setData.setName }}</h1>
              <p>
                {{ this.store.setData.setDescription }}
              </p>
            </div>


            <!--Settings-->
            <div class="flex">
              <button type="button" class="rounded p-2 shadow-sm border m-2" style="background: #FBF9F1;"
                @click="this.restart">
                <ArrowCounterClockwise class="fill-black w-6 h-6" />
              </button>

              <router-link type="button" class="rounded p-2 shadow-sm border m-2" style="background: #FBF9F1;" to="/edit">
                <PencilSquare class="fill-black w-6 h-6" />
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="min-w-10 w-full rounded overflow-hidden border-slate-500 border border-opacity-20 p-2 m-2 bg-stone-50 align-middle text-center shadow-md">
          <!--Timer-->
          <h1 class="text-xl mb-1">{{ this.time }}</h1>

          <!--Progress bar-->
          <div class="w-full h-6 mb-4 bg-gray-200 rounded-full">
            <div class="h-6 rounded-full slow-smooth text-center" style="background: #AAD7D9;"
              :style="{ width: 100 * (this.questionCounter / this.store.setData.cards.length) + '%' }">
            </div>
          </div>

          <div class="flex flex-row">

            <!--Correct/Wrong-->
            <div class="w-1/2">
              <div class="flex flex-row align-middle">
                <div>
                  <CheckCircle class="size-10 m-2 fill-green-600" />
                </div>
                <div class="mx-2 text-center content-center grid">
                  <strong> {{ this.store.setData.cards.map(x => x.gotCorrect).filter(x => x && x != null).length
                  }}</strong>
                </div>
              </div>
              <div class="flex flex-row align-middle">
                <div>
                  <XCircle class="size-10 m-2 fill-red-600" />
                </div>
                <div class="mx-2 text-center content-center grid">
                  <strong> {{ this.store.setData.cards.map(x => x.gotCorrect).filter(x => !x && x != null).length
                  }}</strong>
                </div>
              </div>
            </div>

            <!--Total card progress-->
            <div>
              <CardLogo class="w-20 h-20" />
              <strong>{{ this.questionCounter }} / {{ this.store.setData.cards.length }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-between" style="min-height: 25vh;">
      <div class="w-full flex justify-between smooth">
        <div class="w-full flex justify-between smooth"
          v-if="!this.setFinished && this.store.setData.cards.length > 0 && this.questionCounter < this.store.setData.cards.length">
          <CrossButton @click="this.answerQuestion(false)" :disabled="this.triggerNextCard" />
          <FlipCard :cardData="this.store.setData.cards[this.questionCounter]" :class="{
            'animate-swipe-out-correct': (this.triggerNextCard && this.questionResponse),
            'animate-swipe-out-wrong': (this.triggerNextCard && !this.questionResponse),
            'animate-swipe-in': !this.triggerNextCard
          }" />
          <CheckBoxButton @click="this.answerQuestion(true)" :disabled="this.triggerNextCard" />
        </div>
      </div>
      <div class="w-full flex justify-between smooth" v-if="this.setFinished">
        <p>
          Correct: {{ this.store.setData.cards.map(x => x.gotCorrect).filter(x => x).length }}
        </p>
        <p>
          Wrong: {{ this.store.setData.cards.map(x => x.gotCorrect).filter(x => !x).length }}
        </p>
      </div>
    </div>
  </main>
</template>

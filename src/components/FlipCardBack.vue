<script>
import { useStore } from '../stores/store';

export default
    {
        name: 'CardFront',
        props: {
            title: String,
            body: String,
            tags: Array
        },
        setup() {
            const store = useStore();
            return { store };
        },
        mounted() {
        },
        data() {
            return {
                tagColors: [

                ]
            }
        },
        methods: {
            hslToHex(h, s, l) {
                l /= 100;
                const a = s * Math.min(l, 1 - l) / 100;
                const f = n => {
                    const k = (n + h / 30) % 12;
                    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
                };
                return `#${f(0)}${f(8)}${f(4)}`;
            },
            getRandomPastel() {
                let hue = Math.floor(Math.random() * 360);

                return `${this.hslToHex(hue, 100, 80)}`
            }
        },
        components: {
        },
        watch: {

        }
    }

</script>

<template>
    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-stone-200 m-2">
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ this.title }}</div>
            <p class="text-gray-700 text-base">
                {{ this.body }}
            </p>
        </div>
        <div class="px-6 pt-4 pb-2">
            <span class="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" :style="{'background-color' : this.getRandomPastel()}"
                v-for="t in this.tags">
                #{{ t.name }}
            </span>
        </div>
    </div>
</template>
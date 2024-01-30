<script>
import { useStore } from '../stores/store';
import ArrowLeftRight from '@/components/icons/ArrowLeftRight.vue';
import Floppy from '@/components/icons/Floppy.vue';

export default
    {
        name: 'Create',
        props: {
            titleText : String,
            bodyText : String
        },
        emits : ['update:titleText', 'update:bodyText', 'flipCard'], 
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
        computed: {
            value : {
                get() {
                    return 
                }
            }
        },
        components: {
            ArrowLeftRight,
            Floppy
        },
    }
</script>

<template>
    <div class="min-w-20 rounded-lg shadow-lg bg-stone-50 m-2 p-2">
        <div class="flex flex-col">
            <div class="mb-4">
                <label for="front-title" class="block mb-2 text-sm font-medium text-gray-900">
                    Front Card Title
                </label>
                <input ref="front-title" id="front-title" type="text" placeholder="Title..."
                    class="w-full p-1 rounded bg-gray-100 border-slate-400 border border-opacity-10"
                    :value="this.titleText" 
                    @input="this.$emit('update:titleText', $event.target.value)"/>
            </div>

            <div class="mb-4">
                <label for="front-text" class="block mb-2 text-sm font-medium text-gray-900">
                    Front Card Text
                </label>
                <textarea ref="front-text" id="front-text" class="w-full rounded-lg bg-gray-100 p-2"
                    :value="this.bodyText" 
                    @input="this.$emit('update:bodyText', $event.target.value)">
                </textarea>
            </div>

            <div class="flex flex-row">
                <div class="me-4">
                    <button type="button" @click="() => { this.$emit('flipCard', true); }"
                        class="rounded p-2 shadow-sm border" style="background: #FBF9F1;">
                        <ArrowLeftRight />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
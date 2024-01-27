<script>
import { useStore } from '../stores/store';
import VueMultiselect from 'vue-multiselect'
import ArrowLeftRight from '@/components/icons/ArrowLeftRight.vue';
import Floppy from '@/components/icons/Floppy.vue';

export default
    {
        name: 'Create',
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
                titleText: "",
                bodyText: "",
                value: [

                ],
                options: [
                    { name: 'Math', code: 'math' },
                    { name: 'Science', code: 'science' },
                    { name: 'Art', code: 'art' },
                ],
                flip: false
            }
        },
        methods: {
            addTag(newTag) {
                const tag = {
                    name: newTag,
                    code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
                }
                this.options.push(tag)
                this.value.push(tag)
            }
        },
        components: {
            VueMultiselect,
            ArrowLeftRight,
            Floppy
        },
        watch: {

        }
    }
</script>

<template>
    <div class="min-w-20 rounded-lg shadow-lg bg-stone-200 m-2 p-2">

        <div class="flex flex-col">
            <div class="mb-4">
                <label for="back-title" class="block mb-2 text-sm font-medium text-gray-900">
                    Back Card Title
                </label>
                <input ref="back-title" id="back-title" type="text" placeholder="Title..."
                    class="w-full p-1 rounded bg-gray-100 border-slate-400 border border-opacity-10" />
            </div>

            <div class="mb-4">
                <label for="back-text" class="block mb-2 text-sm font-medium text-gray-900">
                    Back Card Text
                </label>
                <textarea ref="back-text" id="back-text" class="w-full rounded-lg bg-gray-100 p-2">

                </textarea>
            </div>

            <div class="mb-4">
                <VueMultiselect v-model="this.value" :options="this.options" :multiple="true" :searchable="true"
                    :taggable="true" @tag="this.addTag" track-by="code" label="name"
                    class="bg-gray-100 text-black rounded-lg">
                </VueMultiselect>
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
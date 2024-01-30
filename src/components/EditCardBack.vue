<script>
import { useStore } from '../stores/store';
import VueMultiselect from 'vue-multiselect'
import ArrowLeftRight from '@/components/icons/ArrowLeftRight.vue';
import Floppy from '@/components/icons/Floppy.vue';


// TODO: Uncaught TypeError: 'set' on proxy: trap returned falsish for property 'tags'
export default
    {
        name: 'Create',
        props: {
            titleText : String,
            bodyText : String,
            tags : Array
        },
        emits : ['update:titleText', 'update:bodyText', 'update:tags', 'flipCard'],
        setup() {
            const store = useStore();
            return { store };
        },
        mounted() {
        },
        data() {
            return {
                values : [],
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
                this.values.push(tag)
            }
        },
        components: {
            VueMultiselect,
            ArrowLeftRight,
            Floppy
        },
        watch: {
            values(newVal, oldVal)
            {
                this.$emit('update:tags', newVal);
            }
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
                    class="w-full p-1 rounded bg-gray-100 border-slate-400 border border-opacity-10" 
                    :value="this.titleText"
                    @input="this.$emit('update:titleText', $event.target.value)"/>
            </div>

            <div class="mb-4">
                <label for="back-text" class="block mb-2 text-sm font-medium text-gray-900">
                    Back Card Text
                </label>
                <textarea ref="back-text" id="back-text" class="w-full rounded-lg bg-gray-100 p-2"
                :value="this.bodyText"
                @input="this.$emit('update:bodyText', $event.target.value)">

                </textarea>
            </div>

            <div class="mb-4">
                <VueMultiselect v-model="this.values" :options="this.options" :multiple="true" :searchable="true"
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
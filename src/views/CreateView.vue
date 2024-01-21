<script>
import { useStore } from '../stores/store';
import { VueFlip } from 'vue-flip';
import VueMultiselect from 'vue-multiselect'

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
                value: [
                    { name: 'Javascript', code: 'js' }
                ],
                options: [
                    { name: 'Vue.js', code: 'vu' },
                    { name: 'Javascript', code: 'js' },
                    { name: 'Open Source', code: 'os' }
                ]
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
            VueFlip,
            VueMultiselect
        },
        watch: {

        }
    }
</script>


<template>
    <main>

        <div class="grid grid-cols-3">
            <VueFlip :active-click="true">
                <template v-slot:front>
                    <div class="min-w-20 rounded-lg shadow-lg bg-stone-50 m-2 p-2">
                        <div class="flex flex-col">
                            <div class="mb-4">
                                <label for="front-title" class="block mb-2 text-sm font-medium text-gray-900">
                                    Front Card Title
                                </label>
                                <input ref="front-title" id="front-title" type="text" placeholder="Title..."
                                    class="w-full p-1 rounded bg-gray-100 border-slate-400 border border-opacity-10" />
                            </div>

                            <div class="mb-4">
                                <label for="front-text" class="block mb-2 text-sm font-medium text-gray-900">
                                    Front Card Text
                                </label>
                                <textarea ref="front-text" id="front-text" class="w-full rounded-lg bg-gray-100 p-2">

                                </textarea>
                            </div>

                            <div class="mb-2">
                                <VueMultiselect v-model="this.value" :options="this.options" :multiple="true"
                                    :searchable="true" :taggable="true" @tag="this.addTag" track-by="code" label="name"
                                    class="bg-gray-100 text-black ">
                                </VueMultiselect>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-slot:back>
                    <div class="min-w-20 rounded-lg shadow-lg bg-stone-50 m-2 p-2">
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

                            <div class="mb-2">
                                <VueMultiselect v-model="this.value" :options="this.options" :multiple="true"
                                    :searchable="true" :taggable="true" @tag="this.addTag" track-by="code" label="name"
                                    class="bg-gray-100 text-black ">
                                </VueMultiselect>
                            </div>
                        </div>
                    </div>
                </template>
            </VueFlip>
        </div>
    </main>
</template>
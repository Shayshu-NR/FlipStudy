<script>
import { useStore } from '../stores/store';
import { VueFlip } from 'vue-flip';
import VueMultiselect from 'vue-multiselect'
import ArrowLeftRight from '@/components/icons/ArrowLeftRight.vue';
import Floppy from '@/components/icons/Floppy.vue';
import EditCardBack from '@/components/EditCardBack.vue';
import EditCardFront from '@/components/EditCardFront.vue';
import Plus from '@/components/icons/Plus.vue';
import Draggable from 'vuedraggable';

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
                setData: {
                    setID: "",
                    setName: "",
                    setDescription: "",
                    cards:
                        [

                        ],
                },
                cards: [
                    {
                        id: 0,
                        flip : false
                    }
                ],
                cardCount: 1,
                flip: false,
                drag: false,
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
            },
            addCard() {
                this.cards.push({
                    id: this.cardCount,
                    flip : false,
                });
                this.cardCount++;

            },
            cardHeight() {
                // let h = []
            //    window.document.getElementsByClassName("back").forEach(x => h.push(x.clientHeight));
            console.log(this.$refs);
                // return h.reduce((a, b) => Math.max(a, b), -Infinity);
            }
        },
        computed : {
            
        },  
        components: {
            EditCardBack,
            EditCardFront,
            VueFlip,
            VueMultiselect,
            ArrowLeftRight,
            Floppy,
            Plus,
            Draggable,
        },
        watch: {

        }
    }
</script>


<template>
    {{  this.cardHeight() }}
    <main>
        <div class="h-100 w-100 mb-16">
            <Draggable v-model="this.cards" @start="this.drag = true" @end="this.drag = false" item-key="id" class="grid grid-cols-3 m-4 p-4">
                <template #item="{ element }">
                    <VueFlip v-model="this.cards.find(x => x.id == element.id).flip" class="min-h-16 hover:cursor-grab" height="22rem" width="100">
                        <template v-slot:front>
                            <EditCardFront :ref="'f_item' + element.id" @flip-card="(e) => { this.cards.find(x => x.id == element.id).flip = !this.cards.find(x => x.id == element.id).flip; }" />
                        </template>

                        <template v-slot:back>
                            <EditCardBack :ref="'b_item' + element.id" @flip-card="(e) => { this.cards.find(x => x.id == element.id).flip = !this.cards.find(x => x.id == element.id).flip; }" />
                        </template>
                    </VueFlip>
                </template>
            </Draggable>
        </div>
        <div class="rounded-lg shadow-lg bg-stone-50 m-2 p-2 min-h-20 content-normal flex flex-col">
            <div class="mb-4">
                <label for="back-title" class="block mb-2 text-sm font-medium text-gray-900">
                    Study Set Name
                </label>
                <input  type="text" placeholder="Set Name"
                    class="w-full p-1 rounded bg-gray-100 border-slate-400 border border-opacity-10" />
            </div>

            <div class="mb-4">
                <label for="back-text" class="block mb-2 text-sm font-medium text-gray-900">
                    Description
                </label>
                <textarea class="w-full rounded-lg bg-gray-100 p-2">

                </textarea>
            </div>

            <div class="mb-4">
                <button type="button" class="rounded p-2 m-2 text-center shadow-sm border" style="background: #FBF9F1;"
                    @click="this.addCard">
                    <Plus />
                </button>
    
                <button type="button" class="rounded p-2 m-2 text-center shadow-sm border" style="background: #FBF9F1;">
                    <Floppy />
                </button>
            </div>

        </div>
    </main>
</template>
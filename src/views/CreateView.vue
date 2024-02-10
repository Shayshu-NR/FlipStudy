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
            loadData: {
                type: Boolean,
                default: false
            }
        }
        ,
        setup() {
            const store = useStore();
            return { store };
        },
        mounted() {
            if (this.loadData != null && this.loadData != undefined && this.loadData) {
                this.loadSet(this.loadData);
            } else {
                this.setData = {
                    setID: "",
                    setName: "",
                    setDescription: "",
                    cards:
                        [

                        ],
                }
            }
        },
        data() {
            return {
                cardCount: 1,
                flip: false,
                drag: false,
                setData: {
                    setID: "",
                    setName: "",
                    setDescription: "",
                    cards:
                        [

                        ],
                },
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
                this.setData.cards.push({
                    questionID: this.cardCount,
                    flip: false,
                    front: {
                        title: "",
                        body: "",
                        tags: []
                    },
                    back: {
                        title: "",
                        body: "",
                        tags: []
                    }
                });
                this.cardCount++;
            },
            flipEditCard(element) {
                let foundCard = this.setData.cards.find(x => x.questionID == element.questionID);
                foundCard.flip = !foundCard.flip;
            },
            exportStudy() {
                const regex = /[^A-Za-z0-9]/g;
                this.setData.setID = this.setData.setName.replace(regex, "").toLowerCase();

                const json = this.setData;
                json.cards.forEach(x => x.flip = false);

                const data = JSON.stringify(json);

                const blob = new Blob([data], { type: "application/json" });
                const jsonObjectUrl = URL.createObjectURL(blob);

                const filename = `${this.setData.setName}.json`;
                const anchorEl = document.createElement("a");
                anchorEl.href = jsonObjectUrl;
                anchorEl.download = filename;

                anchorEl.click();

                URL.revokeObjectURL(jsonObjectUrl);
            },
            loadSet(data) {
                // Construct all the data...
                this.setData = this.store.setData;
            }
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
            'this.$route'(to, from) {
                console.log(to, from);
            }
        }
    }
</script>


<template>
    <div>
        <div class="rounded-lg shadow-lg bg-stone-50 m-4 p-2 min-h-20 content-normal flex flex-col">
            <div class="mb-4">
                <label for="back-title" class="block mb-2 text-sm font-medium text-gray-900">
                    Study Set Name
                </label>
                <input type="text" placeholder="Set Name"
                    class="w-full p-1 rounded bg-gray-100 border-slate-400 border border-opacity-10"
                    v-model="this.setData.setName" />
            </div>

            <div class="mb-4">
                <label for="back-text" class="block mb-2 text-sm font-medium text-gray-900">
                    Description
                </label>
                <textarea class="w-full rounded-lg bg-gray-100 p-2" v-model="this.setData.setDescription">

                </textarea>
            </div>

            <div class="mb-4">
                <button type="button" class="rounded p-2 m-2 text-center shadow-sm border" style="background: #FBF9F1;"
                    @click="this.addCard">
                    <Plus />
                </button>

                <button type="button" class="rounded p-2 m-2 text-center shadow-sm border" style="background: #FBF9F1;"
                    @click="this.exportStudy">
                    <Floppy />
                </button>
            </div>

        </div>
        <div class="h-100 w-100 mb-16">
            <Draggable v-model="this.setData.cards" @start="this.drag = true" @end="this.drag = false" item-key="questionID"
                class="grid grid-cols-3 m-4 p-4">
                <template #item="{ element }">
                    <VueFlip v-model="this.setData.cards.find(x => x.questionID == element.questionID).flip"
                        class="min-h-16 hover:cursor-grab" height="22rem" width="100%">
                        <template v-slot:front>
                            <EditCardFront :ref="'f_item' + element.questionID"
                                @flip-card="(e) => { this.flipEditCard(element); }" v-model:titleText="element.front.title"
                                v-model:bodyText="element.front.body" />
                        </template>

                        <template v-slot:back>
                            <EditCardBack :ref="'b_item' + element.id" @flip-card="(e) => { flipEditCard(element); }"
                                v-model:titleText="element.back.title" v-model:bodyText="element.back.body"
                                v-model:tags="element.back.tags" />
                        </template>
                    </VueFlip>
                </template>
            </Draggable>
        </div>
    </div>
</template>
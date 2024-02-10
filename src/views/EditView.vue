<script>
import { useStore } from '../stores/store';
import CreateView from './CreateView.vue';

export default
    {
        name: 'Edit',
        props: [],
        setup() {
            const store = useStore();
            return { store };
        },
        mounted() {
        },
        data() {
            return {

            };
        },
        methods: {
        },
        components: {
            CreateView
        },
        watch: {

        },
    }
</script>

<template>
    <div>
        <!-- No set data, go and load something! -->
        <div class="rounded-lg shadow-lg bg-stone-50 m-4 p-2 min-h-20 content-normal flex flex-col"
            v-if="this.store.setData.setID == '' &&  this.store.setData.cards.length == 0">
            <p class="mb-2">
                Hmmm, looks like you don't have anything to edit!
            </p>

            <p class="mb-2">
                Click <span class="text-sm text-slate-50
                    py-1 px-2
                    rounded-full border-0
                    bg-[#b1d49deb]
                    hover:bg-[#99BC85]">
                    <router-link to="/new">here</router-link>
                </span> to create a new study set, or
                <span class="text-sm text-slate-50
                    py-1 px-2
                    rounded-full border-0
                    bg-[#b1d49deb]
                    hover:bg-[#99BC85]">
                    <router-link to="/load">here</router-link>
                </span>
                to load an existing one.
            </p>
        </div>
        <div v-else>
            <CreateView :loadData="true"/>
        </div>

        <!-- Show the create view but with stuff already filled in basically -->
    </div>
</template>
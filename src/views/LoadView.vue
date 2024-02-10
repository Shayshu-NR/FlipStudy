<script>
import { useStore } from '../stores/store';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';


export default
    {
        name: 'Load',
        props: {
        }
        ,
        setup() {
            hljs.registerLanguage('json', json);
            const store = useStore();
            return { store, hljs };
        },
        mounted() {

        },
        data() {
            return {
                fileData: {},
                fileContent: "",
                uploadSuccess : "",
                schemaEx: `
{
    setID: "calculus_study_set",
    setName: "Calculus Study Set!",
    setDescription: "Studying up for MAT180 Midterm.",
    cards: [
        {
            questionID: 0,
            flip: false,
            front: {
                title: "What is the opposite of taking the derivative?",
                body: "(Hint think about physics)",
                tags: []
            },
            back: {
                title: "Integral",
                body: "Recall the fundamental theorem of calculus...",
                tags: ["#Math"]
            }
        }
    ],
}`
            }
        },
        methods: {
            readFile() {
                this.uploadSuccess = "";
                this.fileData = this.$refs["load-file-btn"].files[0];
                const reader = new FileReader();

                if (!this.fileData.name.includes(".json")) {
                    return;
                }

                reader.onload = (res) => { this.loadStudyStore(res); };
                reader.onerror = (err) => { console.log(err); };
                reader.readAsText(this.fileData);
            },
            loadStudyStore(res) {
                this.fileContent = res.target.result;
                try {

                    this.store.setData = JSON.parse(this.fileContent);
                    this.uploadSuccess = "Study set loaded!"
                    this.$router.push('/');
                }
                catch {
                    this.store.setData = {};
                }

            }
        },
        components: {
        },
        watch: {

        }
    }
</script>


<template>
    <div>
        <div class="rounded-lg shadow-lg bg-stone-50 m-3 p-2 min-h-20 content-normal flex flex-col">
            <p>
                Load in a previously saved study set in the form of a JSON file.
            </p>
            <p>
                The input file should have this schema:
            </p>
            <pre>
                {{ this.hljs.highlight(this.schemaEx, { language: 'json' }).value }}
            </pre>

            <label class="flex justify-center">
                <span class="sr-only">Choose a study set:</span>
                <input class="block text-sm text-slate-500 m-2
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#b1d49deb] file:text-slate-50
                    hover:file:bg-[#99BC85]" type="file" ref="load-file-btn" @change="this.readFile()" />
            </label>

            <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50"
                role="alert" v-if="this.uploadSuccess != ''">
                <span class="font-medium">{{  this.uploadSuccess }}</span> 
            </div>
        </div>
    </div>
</template>
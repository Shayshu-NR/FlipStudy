<script>
export default
    {
        name: 'CheckboxButton',
        props: {
            disabled : Boolean
        },
        setup() {
        },
        mounted() {
        },
        data() {
            return {};
        },
        methods: {

        },
        components: {
        },
        watch: {

        }
    }
</script>

<template>
    <div class="relative flex justify-center items-center">
        <button class="h-40 w-20 bg-green-200 
            rounded-tl-full rounded-bl-full text-center hover:shadow-lg smooth"
            :disabled="this.disabled">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check ml-10"
                viewBox="0 0 16 16">
                <path
                    d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
            </svg>
        </button>
    </div>
</template>
<template>
    <div class="locale-changer">
        <select v-model="$i18n.locale">
            <option
                    v-for="(lang, i) in langs"
                    :key="`Lang${i}`"
                    :value="lang"
            >{{ lang }}</option
            >
        </select>
    </div>
</template>

<script>
    export default {
        name: "langSwitcher",
        data() {
            return { langs: ['de', 'en'] };
        },
        methods:{
            switchLang(event){
                this.$i18n.locale = event.target.value;
            }
        }
    }
</script>

<style scoped>

</style>
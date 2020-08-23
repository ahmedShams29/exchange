<template>
    <div class="row">
        <div class="col-md-2 offset-9">
            <a class="link">Config</a>
        </div>
        <div class="col-md-12">
            <select v-model="backgroundColorSelect" @change="changeBackgroound($event)">
                    <option v-for="(item) in colorList" v-bind:key="item" v-bind:value="item" :style="{ 'color': item }">{{ item }}</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        name: "displayConvert",
    }
</script>

<style scoped>

</style>
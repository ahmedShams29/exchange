<template>
  <div class="card mb-4 box-shadow">
    <div class="card-header">
      <h4 class="my-0 font-weight-normal">Currency Coverter</h4>
    </div>
    <div class="card-body">
      <display-convert class="container" />
      <currency-form class="container" />
    </div>
  </div>
</template>

<script>
  import currencyForm from "./components/currencyForm";
  import displayConvert from "./components/displayConvert";
export default {
  name: 'App',
  components: {
    currencyForm,
    displayConvert
  }
}
</script>

<style>

</style>

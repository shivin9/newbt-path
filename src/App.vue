<!-- THIS IS THE app.vue FILE -->

<template>
  <div>
    <h1>Jcheez's Zi Char</h1>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
    };
  },
};
</script>

<style>
h1 {
  margin-top: 1px;
  background-color: #92A8D1;
  color: white;
  font-size: 80px;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding-bottom: 20px;
}
</style>

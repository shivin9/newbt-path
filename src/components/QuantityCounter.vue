<template>
  <div>
    <button v-on:click="minus" id="decrementor">-</button>
    <span>{{counter}}</span>
    <button v-on:click="add" id="incrementor">+</button>
  </div>
</template>

<script>
export default {
  name: "QuantityCounter",
  data() {
    return {
      counter: 0,
    };
  },
  props: ["item"],
  methods: {
    add: function () {
      if (this.counter >= 10) {
        alert("You cannot buy more than 10 items");
      } else {
        this.counter += 1;
      }
      this.$emit("counter", this.item, this.counter);
    },
    minus: function () {
      if (this.counter > 0) {
        this.counter -= 1;
      }
      this.$emit("counter", this.item, this.counter);
    },
  },
};
</script>

<style scoped>
button {
  width: 65px;
  height: 65px;
  font-size: 40px;
  background-color: #F7CAC9;
  border-radius: 10px;
  border-width: 1px;
}

#decrementor {
  margin-right: 15px;
}

#incrementor {
  margin-left: 15px;
}

span {
  font-size: 40px;
}
</style>
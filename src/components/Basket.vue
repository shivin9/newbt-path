<template>
  <div>
    <p>Menu:</p>
    <ul v-for="(i, index) in items" :key="index">
      <li>{{i[0]}} x {{i[1]}}</li>
      
    </ul>
    <button v-on:click="findTotal(); sendOrder()">Add Order</button>
    <p v-show="showPrice">Subtotal: ${{totalPrice}}</p>
    <p v-show="showPrice">Grand Total: ${{finalPrice}}</p>
  </div>
</template>

<script>
import database from "../firebase.js"

export default {
  name: "Basket",
  data() {
    return {
      totalPrice:0,
      finalPrice:0,
      showPrice:false
    }
  },

  props: {
    items: Array,
  },

  methods: {

    findTotal: function() {
      var total = 0;
      for (var x in this.items) {
        total += this.items[x][1] * this.items[x][2];
      }
      this.totalPrice = total
      this.showPrice = true
    },

    sendOrder: function() {
      let item_obj = {
        "Prawn omelette": 0,
        "Dry Beef Hor Fun": 0,
        "Sambal KangKung": 0,
        "Pork Fried Rice": 0,
        "Mapo Tofu": 0,
        "Cereal Prawn": 0,
      }
      for (let item of this.items) {
        let curr_item = item[0]
        item_obj[curr_item] = item[1]
      }

      database
      .collection("orders")
      .add(item_obj).then(() => {
        location.reload()
      })
    }
  },

  watch: {
    totalPrice: function(val) {
      this.finalPrice = (val * 1.07).toFixed(2);
    }
  }
};
</script>

<style scoped>
div {
  font-size: 30px;
  max-width: 30%;
}

button {
  width: 150px;
  height: 40px;
  font-size: 20px;
  background-color: #F7CAC9;
  border-radius: 10px;
  border-width: 1px;
}
</style>
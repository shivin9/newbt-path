<template>
  <div>
    <div  v-for="(item, key, index) in datapacket" :key="index">
        <p>{{key}}: {{item}}</p>
        <input v-bind:id="index" placeholder=0 type="number" min="0">
    </div>
    <br>
    <button v-on:click="updateOrder">Update Order</button>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  name: "Modify",
  data() {
    return {
      datapacket: {}
    };
  },
  methods: {
      fetchItems: function() {
          database
          .collection("orders")
          .doc(this.dataid)
          .get()
          .then((querySnapShot) => {
            let data = querySnapShot.data()
            this.datapacket = data
          });
      },

      updateOrder: function() {
        let order = {...this.datapacket};
        for (let number = 0; number < 6; number++) {
          let newAmount = parseInt(document.getElementById(number).value)
          console.log(newAmount)
          if (newAmount > 0) {
            order[Object.keys(order)[number]] = newAmount
          } else {
            order[Object.keys(order)[number]] = 0
          }
        }
        database
        .collection("orders")
        .doc(this.dataid)
        .update(order)
        .then(() => {
          this.$router.push("/orders");
          alert("Update Successful")
        })
      }
  },

  props: {
    dataid: String
  },

  created() {
      this.fetchItems()
  }
};
</script>

<style scoped>
button {
  width: 150px;
  height: 40px;
  font-size: 20px;
  background-color: #F7CAC9;
  border-radius: 10px;
  border-width: 1px;
}
</style>
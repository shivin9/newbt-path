<template>
  <div>
    <ul>
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link to="/orders" exact>Orders</router-link></li>
      <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <ul>
      <li v-for="(order, index) in orders" :key="index">
        <div style="float: left; width:50%">
          <div v-for="(value, key, index) in order[1]" :key="index">
            <span>{{ key }}: {{ value }}</span>
          </div>
        </div>
        <button v-on:click="deleteItem($event)" v-bind:id="order[0]">
          Delete
        </button>
        <button v-on:click="route($event)" v-bind:id="order[0]">Modify</button>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  name: "Orders",
  data() {
    return {
      orders: [],
    };
  },

  methods: {
    fetchItems: function() {
      database
        .collection("orders")
        .get()
        .then((querySnapShot) => {
          querySnapShot.docs.forEach((doc) => {
            console.log(doc.data());
            this.orders.push([doc.id, doc.data()]);
          });
        });
    },

    deleteItem: function(e) {
      let id = e.target.getAttribute("id");
      database
        .collection("orders")
        .doc(id)
        .delete().then(() => {
          location.reload()
        });
    },

    route: function(e) {
      this.$router.push({
        name: "modify",
        params: {
          dataid: e.target.getAttribute("id")
        }
        });
    }
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>

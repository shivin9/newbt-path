<template>
  <div id="itemsList">
    <ul>
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link to="/orders" exact>Orders</router-link></li>
      <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <ul>
      <li v-for="(i, index) in items" :key="index">
        <strong id="itemName">{{i.name}}</strong>
        <br />
        <img v-bind:src="i.imageURL" />
        <br />
        <p id="price">${{i.price}}</p>
        <QC v-bind:item="i" v-on:counter="onCounter"></QC>
      </li>
    </ul>
    <Basket v-bind:items="itemsSelected" id="shoppingBasket"></Basket>
  
  </div>
</template>



<script>
import QuantityCounter from "./QuantityCounter";
import Basket from "./Basket";
import database from "../firebase.js"

export default {
  name: "PageContent",
  data() {
    return {
      itemsSelected: [],
      items: []
    };
  },

  components: {
    QC: QuantityCounter,
    Basket: Basket,
  },
  methods: {
    fetchItems: function() {
      database
      .collection("menu")
      .get()
      .then((querySnapShot) => {
        querySnapShot
        .docs
        .forEach(doc => {
          console.log(doc.data())
          this.items.push(doc.data())
        })
      })
    },

    mapper: function (a) {
      return a[0];
    },

    onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          if (item_name.localeCompare(item.name) == 0 && count > 0) {
            this.itemsSelected.splice(i, 1, [item.name, count, item.price]);

           
          } else if (item_name.localeCompare(item.name) == 0 && count == 0) {
            this.itemsSelected.splice(i, 1);
            
          } else {
            const array_of_names = this.itemsSelected.map(this.mapper);
            if (!array_of_names.includes(item.name)) {
              this.itemsSelected.push([item.name, count, item.price]);
            }
          }
        }
      }
    },
  },
  created() {
    this.fetchItems();
  }
};
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>
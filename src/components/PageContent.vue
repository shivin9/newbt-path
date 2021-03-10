<template>
    <div id = "page">
        <ul id="itemsList">
          <li v-for="items in itemsList" :key = "items.name">
          <p id ="itemName"><strong>{{items.name}}</strong></p> 
          <img src="items.imageURL"/>
          <p id = "price">${{items.price}}</p>
          <qtyCounter v-on:counter = "onCounter"></qtyCounter>
          <basket id = "shoppingBasket" v-bind:itemsSelected = "itemsSelected"></basket>
          </li>
        </ul>
    </div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'

    export default {
        name: 'PageContent',
        props: ['itemsList'],
        components: {
            qtyCounter: QuantityCounter,
            basket: Basket
        }, 
        data() {
            return {
                itemsSelected: []
            }
        },
        methods: {
            onCounter: function (item, count) {
                if (this.itemsSelected.length === 0 && count > 0) {
                    //If there is nothing in items selected, push the ORDER in
                    this.itemsSelected.push([item.name, count, item.price]);
                } else {
                    // Loop through everything to check what is not in the basket
                    for (let i = 0; i < this.itemsSelected.length; i++) {
                        const curr_item = this.itemsSelected[i];
                        const item_name = curr_item[0];

                        // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                        if (item_name == item.name && count>0) {
                            this.$set(this.itemsSelected[i], 1, count);
                            //this.itemsSelected[i] = [item.name, count, item.price];
                        }
                        // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                        else if (item_name == item.name && count== 0){
                            this.itemsSelected.splice(i, 1);
                        } 
                        // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                        else {
                            this.itemsSelected.push([item.name, count, item.price]);
                        }
                    }
                }
            },
        }
    }
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
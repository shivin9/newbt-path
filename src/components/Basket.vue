<template>
    <div id = "basket">
        Menu:
            <ul id="itemsSelected">
                <li v-for = "items in itemsSelected" v-bind:key = "items">
                {{items[0]}} x {{items[1]}}
                </li>
            </ul>
            <br>
            <button id = "button1" v-on:click = "findTotal()"> Calculate total </button>
            <p v-show ="display">
            Subtotal: ${{subTotal}} <br>
            Grand Total: ${{grandTotal}}
            </p>
    </div>
</template>

<script>
export default {
    name: 'Basket',
    props: ['itemsSelected'], 
    data() {
        return {
            subTotal: 0,
            display: false
        }
    },
    methods: {
        findTotal: function() {
            for (let i = 0; i < this.itemsSelected.length; i++) {
                const curr_item = this.itemsSelected[i];
                const curr_quantity = curr_item[1];
                const curr_price = curr_item[2];
                this.subTotal += curr_quantity * curr_price;
            }
            this.display = true;
        }
    },
    computed: {
        grandTotal: function() {
            return (this.subTotal * 1.07).toFixed(2);
        }
    }
}
</script>

<style scoped>
    #button1 {
        border-radius: 8px;
        background-color: pink;
    }
</style>
import { Bar } from 'vue-chartjs';
import database from '../../firebase.js';
 
export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Number",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#f5f5dc"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            scales : {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false
            
        }
    }
  },
  methods: {
    fetchItems: function() {
        database.collection('orders').get().then(querySnapShot => {
            let datapacket = {};
            querySnapShot.forEach(doc => {
                console.log(doc.data())
                if (Object.keys(datapacket).length === 0) {
                    datapacket = {... doc.data()}
                    console.log(datapacket)
                } else {
                    console.log(2)
                    for (let key of Object.keys(datapacket)) {
                        let data = doc.data()
                        datapacket[key] += data[key]
                    }
                }
            })
            this.datacollection.labels = Object.keys(datapacket);
            this.datacollection.datasets[0].data = Object.values(datapacket);
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created() {
    this.fetchItems()
  }
}
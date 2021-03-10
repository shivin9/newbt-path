import axios from 'axios'
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: []
        },
        options: {
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function() {
        axios.get('https://api.data.gov.sg/v1/environment/psi?date=2021-02-22')
        .then(response => {
            let data = response.data.items
            console.log(response)
            for (let region of response.data.region_metadata) {
                let rName = region.name;
                let dataset = {
                    data: [],
                    label: "",
                    borderColor: "",
                    fill: false
                }
                for (let d of data) {
                    let psiLevel = d.readings.psi_twenty_four_hourly[rName]
                    dataset.data.push(psiLevel)
                }
                dataset.label = rName
                dataset.borderColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
                this.datacollection.datasets.push(dataset)
            }
            for (let l of data) {
                let label = l.timestamp
                this.datacollection.labels.push(label)
            }
            this.renderChart(this.datacollection, this.options)
        })
    },
  },
  created () {
    this.fetchItems()
  }
}
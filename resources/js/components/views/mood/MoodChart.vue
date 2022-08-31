<template>
    <div id="chart">
        <apexchart type="area"  height="300" :options="chartOptions" :series="series"></apexchart>
    </div>
    <div class="balance-table">
    <div class="fixed-action-btn"  @click="editChart">
    <a class="btn-floating btn-large green">
      <i class="large material-icons">edit</i>
    </a>
</div>  
</div>
</template>

<script>
export default {
    data() {
        return {
            series: [{
                    name: "",
                    data: this.$store.getters["chartModule/marks"]
                }],
            chartOptions: {
                id: "chart",
                type: "area",
                height: 230,
                foreColor: "#ccc",
                toolbar: {
                    autoSelected: "pan",
                    show: false
                },
                title: {
                    text: this.$store.getters["chartModule/year"],
                    align: "left",
                    style: {
                        fontSize: "14px"
                    }
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 4,
                    colors: ["#fff"],
                    strokeColor: "#00BAEC",
                    strokeWidth: 3
                },
                colors: ["#00BAEC"],
                stroke: {
                    width: 3
                },
                fill: {
                    gradient: {
                        enabled: true,
                        opacityFrom: 0.55,
                        opacityTo: 0
                    }
                },
                yaxis: {
                       show: true,
                    showAlways: true,
                    showForNullSeries: true,
                    seriesName: undefined,
                    opposite: false,
                    reversed: false,
                    logarithmic: false,
                    logBase: 10,
                    tickAmount: 6,
                    forceNiceScale: false,
                    floating: false,
                    decimalsInFloat: undefined,
                    min: -5,
                    max: 5,
                    tickAmount: 10,
                    title: {
                        text: ""
                    },
                },
                xaxis: {
                    title: {
                        text: this.$store.getters["chartModule/month"]
                    }
                },
                legend: {
                    position: "top",
                    horizontalAlign: "right",
                    floating: true,
                    offsetY: -25,
                    offsetX: -5,
                }
            },
        };
    },
    methods:{
      editChart(){
        this.$router.push('/edit/chart');
      }
    }
}
</script>
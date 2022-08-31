<template>
<div> 
  <apexchart width="650px" :options="chartOptions" :series="series"></apexchart>
</div>
 <div class="fixed-action-btn" @click="historyView">
    <a class="btn-floating btn-large orange">
    <i class="large material-icons">close</i></a>
</div>  
</template>

<script>
export default {
  data(){
    return {
      series: this.$store.getters['historyBalanceModule/historySliceSeries'],
      chartOptions: { 
        chart: {
          type: 'polarArea',
        },
        labels: this.$store.getters['historyBalanceModule/historySliceLabels'],
        fill: {
          opacity: 1
        },
        title: {
          text: this.$store.getters["historyBalanceModule/historyDate"] + ' - Історія',
          align: "left",
          style: {
              fontSize: "14px"
          }
                },
        stroke: {
          width: 0.1,
          colors: ['#fff']
        },
        yaxis: {
          show: false,
        },
        legend: {
          position: 'right',
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            },
            spokes: {
              strokeWidth: 5
            },
          }
        },
        theme: {
          monochrome: {
            enabled: false,
            shadeTo: 'light',
            shadeIntensity: 0.6
            }
            }
            }
        }
    },
    methods:{
      historyView(){
        this.$router.push('/history-balance/list');
      }
    },
    mounted(){
      if(Object.keys(
        this.$store.getters['historyBalanceModule/historySliceSeries']).length == 0){
        this.$router.push('/history-balance/list');
      }
    }
  }
</script>
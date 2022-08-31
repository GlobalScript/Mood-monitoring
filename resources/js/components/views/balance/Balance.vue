
<template>
<div>
  <apexchart width="650px" :options="chartOptions" :series="series"></apexchart>
</div>
<div class="fixed-action-btn"  @click="editingSlice">
    <a class="btn-floating btn-large green">
      <i class="large material-icons">edit</i>
    </a>
</div>  
</template>

<script>
export default {
  data(){
    return {
      series: this.$store.getters['balanceModule/sliceSeries'],
      chartOptions: { 
        chart: {
          type: 'polarArea',
        },
        labels: this.$store.getters['balanceModule/sliceLabels'],
        fill: {
          opacity: 1
        },
        title: {
          text: this.$store.getters["balanceModule/date"],
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
      },
    }
  },
  methods:{
      editingSlice(){
        this.$router.push('/edit/slice');
      }
    }
  }
</script>

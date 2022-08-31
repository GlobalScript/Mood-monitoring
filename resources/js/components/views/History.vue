<template>
   <div class="col s12 m7">
    <div class="card horizontal">
      <div class="card-stacked">
        <div class="card-content">
          <h4>Баланс</h4>
        </div>
       <div class="card-action light-blue lighten-4">
         <router-link to="/history-balance/list" class="list-show brand-logo center "><b>Переглянути</b></router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="col s12 m7">
    <div class="card horizontal">
      <div class="card-stacked">
        <div class="card-content">
          <h4>Настрій</h4>
        </div>
        <div class="card-action light-blue lighten-4">
         <router-link to="/history-mood/list" class="list-show brand-logo center "><b>Переглянути</b></router-link>
        </div>
      </div>
    </div>
  </div>
                      
</template>

<script>
export default{
  computed:{
    sliceList(){
      return this.$store.getters['startModule/sliceList'];
    }
  }
}
</script>
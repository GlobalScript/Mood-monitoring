<template>
<div class="start-page">
<div class="start-content">
  <div class="row start-card">
    <div class="col s5 m3 balance-card">
      <div class="card">
        <div class="card-image">
          <img src="img/balance.jpg">
        </div>
        <div class="card-action black-text">
          <a class=" grey-text" >Тримай баланс</a>
        </div>
      </div>
    </div>
    <div class="col s5 m3 mood-card">
      <div class="card">
        <div class="card-image">
          <img src="img/mood.jpg">
        </div>
        <div class="card-action black-text">
          <a class=" grey-text" >Покращуй настрій</a>
        </div>
      </div>
    </div>
    <div class="col s5 m3 book-card">
      <div class="card">
        <div class="card-image">
          <img src="img/book.jpg">
        </div>
        <div class="card-action black-text">
          <a class=" grey-text" >Записуй свої думки</a>
        </div>
      </div>
    </div>
</div>
</div>  
</div> 
</template>
<script>
export default {
     mounted(){
            if(this.$store.getters['start/load']){
            this.$store.dispatch('start/startAction');
        }  
     }
}
</script>
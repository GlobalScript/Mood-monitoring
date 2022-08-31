<template>
<Loader v-if="!visible"/>
    <div v-if="visible" >
  <table class="highlight centered">
    <thead>
      <tr>
          <th>Досягнення</th>
          <th>Сфера</th>
          <th>Змінити</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in progress" :key="item">
        <td>{{item.total}}</td>
        <td>{{item.name}}</td>
    <td>
     <div class="range-field">
      <input type="range" id="test5" min="0" max="10"  v-model="item.total"/>
    </div>
    </td>
    </tr>
    </tbody>
    </table>
<div class="balance-table" @click.stop="submit">
<div class="right  ">
    <a class=" btn-large btn-floating blue darken-2">
      <i class="large material-icons">save</i>
    </a>
</div>  
<div class="bottom " @click.stop="balanceView">
    <a class=" btn-large orange btn-floating">
      <i class="large material-icons">close</i>
    </a>
</div>  
</div>
</div>
</template>
<script>

import Loader from '../../app/Loader.vue';

export default{
    data() {
        return {
          visible: true,
            progress: {
                health: {
                    name: "Здоров\'я",
                    total: 0,
                },
                job: {
                    name: "Робота",
                    total: 0,
                },
                environment: {
                    name: "Оточення",
                    total: 0,
                },
                relationships: {
                    name: "Стосунки",
                    total: 0,
                },
                rest: {
                    name: "Відпочинок",
                    total: 0,
                },
                development: {
                    name: "Саморозвиток",
                    total: 0,
                },
                realization: {
                    name: "Реалізація",
                    total: 0,
                },
                spirituality: {
                    name: "Духовність",
                    total: 0,
                },
            }
        };
    },
    methods: {
        submit() {
            const {id, create_date} = this.$store.getters["balanceModule/slice"];
            const date = new Date();
            const dd = String(date.getDate()).padStart(2, "0");
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const yyyy = date.getFullYear();
            const today = yyyy + "-" + mm + "-" + dd;
            const data = {
                id: id,
                health: this.progress.health.total,
                job: this.progress.job.total,
                environment: this.progress.environment.total,
                relationships: this.progress.relationships.total,
                rest: this.progress.rest.total,
                development: this.progress.development.total,
                realization: this.progress.realization.total,
                spirituality: this.progress.spirituality.total,
                create_date: today
            };
            if (today === create_date) {
                this.$store.dispatch("balanceModule/updateSlice", data);
            }
            else {
                this.$store.dispatch("balanceModule/addSlice", data);
            }
                this.$store.dispatch("balanceModule/refreshLastSlice");
                this.visible = false;
        },
        balanceView() {
            this.$router.push("/");
        }
    },
    components: { Loader }
}

</script>
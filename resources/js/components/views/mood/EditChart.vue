<template>
<Loader v-if="marksLoading"></Loader>
    <div v-if="!marksLoading" class="chart-edit"> 
   <table class="highlight centered">
    <thead>
      <tr>
          <th>На графіку</th>
          <th>Настрій</th>
          <th>Змінити</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in mood" :key="item">
        <td>{{item.total}}</td>
        <td>{{item.name}}</td>
    <td>
     <button  class=" secondary-content btn-floating btn-medium waves-effect waves-light green"
       @click.stop="submit(item.total)">
            <i class=" material-icons">check</i>
      </button>
    </td>
    </tr>
    </tbody>
    </table>  
    <div class="balance-table">
    <div class="right" @click.stop="chartView">
        <a class=" btn-large btn-floating orange">
        <i class="large material-icons">close</i>
        </a>
    </div>  
    </div>
  </div>
</template>

<script>
import Loader from '../../app/Loader.vue';
export default{
    data(){
        return {
            mood: [
                {
                    name: "Чудово",
                    total: 5,
                },
                {
                    name: "Добре",
                    total: 4,
                },
                {
                    name: "Нормально",
                    total: 3,
                },
                {
                    name: "Одноманітно",
                    total: 2,
                },
                {
                    name: "Нудно",
                    total: 1,
                },
                {
                    name: "Сумно",
                    total: 0,
                },
                {
                    name: "Все дратує",
                    total: -1,
                },
                {
                    name: "Тривожно",
                    total: -2,
                },
                {
                    name: "Страшно",
                    total: -3,
                },
                {
                    name: "Боляче",
                    total: -4,
                },
                {
                    name: "Байдуже",
                    total: -5,
                }
            ]
        }
    },
    methods: {
        submit(choice) {
            this.$store.commit('chartModule/clearMarksLoading');
            const lastMark = this.$store.getters["chartModule/lastMark"];
            const date = new Date();
            const dd = String(date.getDate()).padStart(2, "0");
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const yyyy = date.getFullYear();
            const data = {
                year: yyyy,
                month: mm,
                day: dd,
                mark: choice,
                id: ""
            };
            if (Object.keys(lastMark).length) {
                const { id, day } = lastMark;
                if (day == dd) {
                    data.id = id;
                    this.$store.dispatch("chartModule/updateMark", data);
                    return true;
                    }    
                }
              this.$store.dispatch("chartModule/addMark", data); 
        },
        chartView() {
            this.$router.push("/mood");
        }
    },
    components: {
         Loader
    },
    computed: {
        marksLoading(){
            return this.$store.getters['chartModule/marksLoading'];
        }
    }
}
</script>
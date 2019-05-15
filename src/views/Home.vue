<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <img src="../../public/img/title.png" id="title" class="w-100" />
      </div>
      <div class="col-12 mb-3">
        <b-card title="已排序聲音" sub-title="點按按鈕可以移除已排序的聲音">
          <hr />
          <playquery :sounds="sounds" :query="query"></playquery>
        </b-card>
      </div>
      <hr />
      <div class="col-12 my-3">
        <b-card title="所有聲音" sub-title="">
          <hr />
          <soundbtns :sounds="sounds"></soundbtns>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script async>
import playquery from "../components/playquery.vue";
import soundbtns from "../components/soundbtns.vue";
const soundList = `soundList.json`;
export default {
  name: "home",
  components: {
    playquery,
    soundbtns
  },
  data: function() {
    let query = this.$route.query.sounds;
    let sounds = [];
    return {
      query,
      sounds
    };
  },
  created() {
    this.$http.get(soundList).then(data => {
      this.sounds = data.data.sounds;
    });
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <img src="../../public/img/title.png" id="title" class="w-100" />
      </div>
      <div class="col-12 mb-3">
        <playquery :sounds="sounds" :query="query" :sids="sids"></playquery>
      </div>
      <hr />
      <div class="col-12 my-3">
        <soundbtns :sounds="sounds"></soundbtns>
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
    let sids = this.$route.query.sids;
    let sounds = [];
    return {
      query,
      sounds,
      sids
    };
  },
  created() {
    this.$http.get(soundList).then(data => {
      this.sounds = data.data.sounds;
    });
  }
};
</script>

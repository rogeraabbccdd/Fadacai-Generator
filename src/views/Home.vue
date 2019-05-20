<template>
  <div class="container" ref="container">
    <div class="row">
      <div class="col-12 text-center">
        <img src="../../public/img/title.png" id="title" class="w-100" />
        <blockquote class="blockquote text-center text-white">
          <p class="mb-0">{{ quote }}</p>
          <footer class="blockquote-footer text-white">韓國瑜</footer>
        </blockquote>
        <!--   <h5 class="text-white text-center d-inline-block lead">
          {{ quote }}
        </h5>
        <p class="text-white text-center d-inline-block">- 韓國瑜</p> -->
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

<style scoped>
#loading {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  position: fixed;
  background: transparent;
  z-index: 999;
}

#load {
  width: 180px;
}

@media (max-width: 768px) {
  .blockquote {
    font-size: 1em !important;
  }
}
.blockquote {
  font-size: 1.5em;
}
</style>

<script>
import playquery from "../components/playquery.vue";
import soundbtns from "../components/soundbtns.vue";
import sounds from "../assets/js/soundList.js";
import quotes from "../assets/js/quote.js";
// import { setTimeout } from "timers";

export default {
  name: "home",
  components: {
    playquery,
    soundbtns
  },
  data: function() {
    let query = this.$route.query.sounds;
    let sids = this.$route.query.sids;
    let quote = quotes[Math.floor(Math.random() * quotes.length)];
    return {
      query,
      sounds,
      sids,
      quote
    };
  },
  created() {
    let tmp = [];
    tmp = this.sounds;
    tmp.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    this.sounds = tmp;
    /* predownload sounds but slow as fuck because we have 600+ sounds
    let audio = new Audio();
    audio.src = this.sounds[0].file;
    audio.preload = "auto";
    audio.oncanplaythrough = () => {
      this.loaded++;
      this.loadProgress = Math.ceil((this.loaded / this.sounds.length) * 100);
      if (this.loaded == this.sounds.length) {
        if (this.loaded == this.sounds.length) {
          // let container = this.$refs.container;
          setTimeout(() => {
            this.showLoad = false;
          }, 1500);
          setTimeout(() => {
            this.showContainer = true;
          }, 1700);
        }
      } else {
        audio.src = this.sounds[this.loaded].file;
      }
    };
    */
  }
};
</script>

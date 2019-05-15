<template>
  <div>
    <p v-show="snds.length == 0" style="color: #ccc">請先在下方選擇音檔</p>
    <b-button
      class="m-1"
      v-for="(s, idx) in snds"
      :key="idx"
      variant="success"
      @click="remove(idx)"
      >{{ s.name }}</b-button
    >
    <hr />
    <b-button class="m-1" variant="primary" @click="play()" ref="btnPlay"
      >播放</b-button
    >
    <b-button class="m-1" variant="success" @click="getUrl()">匯出</b-button>
    <b-button class="m-1" variant="danger" @click="removeAll()">清空</b-button>
  </div>
</template>
<script>
import { eventBus } from "../main.js";
let nowPlaying = -1;
export default {
  name: "query",
  props: {
    sounds: Array,
    query: String
  },
  data() {
    let snds = [];
    return {
      snds
    };
  },
  methods: {
    open: function(which, e) {
      // Prevents clicking the link from doing anything
      e.preventDefault();
    },
    play() {
      if (this.snds.length > 0) {
        nowPlaying = 0;
        this.$refs.btnPlay.setAttribute("disabled", "true");
        let audio = new Audio(this.snds[nowPlaying].file);
        audio.play();
        audio.onended = () => {
          nowPlaying++;
          if (nowPlaying < this.snds.length) {
            audio.src = this.snds[nowPlaying].file;
            audio.play();
          } else {
            nowPlaying = -1;
            this.$refs.btnPlay.removeAttribute("disabled");
          }
        };
      }
    },
    getUrl() {
      let url = "";
      for (let i = 0; i < this.snds.length; i++) {
        url = url + this.snds[i].name + ",";
      }
      url = url.substr(0, url.length - 1);
      this.$router.push({
        name: "home",
        query: { sounds: url }
      });
      alert("匯出成功，可使用目前網址分享你的創作");
    },
    remove(idx) {
      if (nowPlaying == -1) {
        this.snds.splice(idx, 1);
      }
    },
    removeAll() {
      this.snds = [];
    }
  },
  mounted() {
    // when soundbtns.vue btn clicked
    eventBus.$on("addSound", message => {
      this.snds.push({
        file: this.sounds[message].file,
        name: this.sounds[message].name
      });
    });
  },
  watch: {
    // use watch because ajax sound list has delay
    sounds: function(newVal) {
      if (this.query != undefined) {
        let querys = this.query.split(",");
        for (let i = 0; i < querys.length; i++) {
          let isIn = -1;
          for (let j = 0; i < newVal.length; j++) {
            let name = newVal[j].name;
            if (name == querys[i]) {
              isIn = j;
              break;
            }
          }
          if (isIn > -1) {
            this.snds.push({
              file: newVal[isIn].file,
              name: newVal[isIn].name
            });
          }
        }
      }
    }
  }
};
</script>

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
    <b-button class="m-1" variant="warning" @click="stop()" ref="btnStop"
      >停止</b-button
    >
    <b-button class="m-1" variant="success" @click="getUrl()">匯出</b-button>
    <b-button class="m-1" variant="info" @click="downloadFile()">下載</b-button>
    <b-button class="m-1" variant="danger" @click="removeAll()">清空</b-button>
  </div>
</template>
<script>
import Crunker from "crunker";
import { eventBus } from "../main.js";
let nowPlaying = -1;
let isPlaying = false;
export default {
  name: "query",
  props: {
    sounds: Array,
    query: String,
    sids: String
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
        isPlaying = true;
        nowPlaying = 0;
        this.$refs.btnPlay.setAttribute("disabled", "true");
        let audio = new Audio(this.snds[nowPlaying].file);
        audio.play();
        audio.onended = () => {
          nowPlaying++;
          if (nowPlaying < this.snds.length && isPlaying) {
            audio.src = this.snds[nowPlaying].file;
            audio.play();
          } else {
            nowPlaying = -1;
            isPlaying = false;
            this.$refs.btnPlay.removeAttribute("disabled");
          }
        };
      }
    },
    stop() {
      nowPlaying = -1;
      isPlaying = false;
      this.$refs.btnPlay.removeAttribute("disabled");
    },
    getUrl() {
      let url = "";
      for (let i = 0; i < this.snds.length; i++) {
        url = url + this.snds[i].id + ",";
      }
      url = url.substr(0, url.length - 1);
      this.$router.push({
        name: "home",
        query: { sids: url }
      });
      alert("匯出成功，可使用目前網址分享你的創作");
    },
    downloadFile() {
      const selectedSounds = this.snds.map((snd) => snd.file);
      const audio = new Crunker();
      audio
        .fetchAudio(...selectedSounds)
        .then(buffers => audio.concatAudio(buffers))
        .then(merged => audio.export(merged, "audio/mp3"))
        .then(output => audio.download(output.blob, "fadacai"))
        .catch(error => {
          throw new Error(error);
        });
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
        name: this.sounds[message].name,
        id: this.sounds[message].id
      });
    });
  },
  watch: {
    // use watch because ajax sound list has delay
    // load url when sound list is ready
    sounds: function(newVal) {
      if (this.sids != undefined && this.sids.length > 0) {
        let querys = this.sids.split(",");
        if (querys.length > 0) {
          for (let i = 0; i < querys.length; i++) {
            let isIn = -1;
            for (let j = 0; i < newVal.length; j++) {
              let id = newVal[j].id;
              if (id == querys[i]) {
                isIn = j;
                break;
              }
            }
            if (isIn > -1) {
              this.snds.push({
                file: newVal[isIn].file,
                name: newVal[isIn].name,
                id: newVal[isIn].id
              });
            }
          }
        }
      } else if (this.query != undefined && this.query.length > 0) {
        let querys = this.query.split(",");
        if (querys.length > 0) {
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
                name: newVal[isIn].name,
                id: newVal[isIn].id
              });
            }
          }
        }
      }
    }
  }
};
</script>

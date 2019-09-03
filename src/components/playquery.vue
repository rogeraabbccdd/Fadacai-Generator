<template>
  <b-card
    title="已排序聲音"
    sub-title="點按按鈕可以移除聲音，拖曳按鈕可以排序聲音"
  >
    <hr />
    <p v-show="snds.length == 0" style="color: #ccc">請先在下方選擇音檔</p>
    <draggable
      v-model="snds"
      @start="dragging = true"
      @end="dragging = false"
      v-bind="dragOptions"
    >
      <transition-group>
        <b-button
          class="m-1 snds"
          v-for="(s, idx) in snds"
          :key="idx + 0"
          variant="success"
          @click="remove(idx)"
          >{{ s.name }}</b-button
        >
      </transition-group>
    </draggable>
    <hr />
    <b-button class="m-1" variant="primary" @click="play()" ref="btnPlay">
      <font-awesome-icon icon="play" />&nbsp;播放
    </b-button>
    <b-button class="m-1" variant="warning" @click="stop()" ref="btnStop">
      <font-awesome-icon icon="stop" />&nbsp;停止
    </b-button>
    <b-button class="m-1" variant="danger" @click="removeAll()">
      <font-awesome-icon :icon="['far', 'trash-alt']" />&nbsp;清空
    </b-button>
    <b-button class="m-1" variant="success" @click="getUrl()">
      <font-awesome-icon icon="link" />&nbsp;短網址
    </b-button>
    <b-button class="m-1" variant="facebook" @click="shareFacebook()">
      <font-awesome-icon :icon="['fab', 'facebook-f']" />&nbsp;分享
    </b-button>
    <input type="hidden" value ref="shortInput" />
    <p v-if="shortText.length > 1">
      分享短網址:
      <a :href="shortUrl">{{ shortText }}</a>
    </p>
  </b-card>
</template>

<style>
.btn-facebook {
  background-color: #3b5998 !important;
  border-color: #3b5998 !important;
  color: #fff !important;
}
</style>

<script>
import Vue from "vue";
// import Crunker from "crunker";
import { eventBus } from "../main.js";
import draggable from "vuedraggable";
let nowPlaying = -1;
let isPlaying = false;
export default {
  name: "query",
  components: {
    draggable
  },
  props: {
    sounds: Array,
    query: String,
    sids: String
  },
  data() {
    let snds = [];
    let shortUrl = "#";
    let shortText = "";
    if (this.sids != undefined && this.sids.length > 0) {
      let querys = this.sids.split(",");
      if (querys.length > 0) {
        // loop all url query
        for (let i = 0; i < querys.length; i++) {
          // find it in sound list
          let isIn = -1;
          for (let j = 0; j < this.sounds.length; j++) {
            let id = this.sounds[j].id;
            if (id == querys[i]) {
              isIn = j;
              break;
            }
          }
          if (isIn > -1) {
            let audio = new Audio();
            audio.src = this.sounds[isIn].file;
            audio.preload = "auto";
            snds.push({
              file: this.sounds[isIn].file,
              name: this.sounds[isIn].name,
              id: this.sounds[isIn].id
            });
          }
        }
      }
    } else if (this.query != undefined && this.query.length > 0) {
      let querys = this.query.split(",");
      if (querys.length > 0) {
        for (let i = 0; i < querys.length; i++) {
          let isIn = -1;
          for (let j = 0; i < this.sounds.length; j++) {
            let name = this.sounds[j].name;
            if (name == querys[i]) {
              isIn = j;
              break;
            }
          }
          if (isIn > -1) {
            let audio = new Audio();
            audio.preload = "auto";
            audio.src = this.sounds[isIn].file;
            audio.preload = "auto";
            snds.push({
              file: this.sounds[isIn].file,
              name: this.sounds[isIn].name,
              id: this.sounds[isIn].id
            });
          }
        }
      }
    }
    return {
      snds,
      shortText,
      shortUrl
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
        let btns = this.$el.querySelectorAll(".snds");
        for (let i = 1; i < btns.length; i++) {
          btns[i].classList.remove("btn-success");
          btns[i].classList.add("btn-outline-success");
        }
        let audio = new Audio(this.snds[nowPlaying].file);
        audio.play();
        audio.onended = () => {
          if (isPlaying) {
            btns[nowPlaying].classList.remove("btn-success");
            btns[nowPlaying].classList.add("btn-outline-success");
            nowPlaying++;
            if (nowPlaying < this.snds.length && isPlaying) {
              audio.src = this.snds[nowPlaying].file;
              audio.play();
              btns[nowPlaying].classList.add("btn-success");
              btns[nowPlaying].classList.remove("btn-outline-success");
            } else {
              nowPlaying = -1;
              isPlaying = false;
              this.$refs.btnPlay.removeAttribute("disabled");
              for (let i = 0; i < btns.length; i++) {
                btns[i].classList.add("btn-success");
                btns[i].classList.remove("btn-outline-success");
              }
            }
          }
        };
      }
    },
    stop() {
      let btns = this.$el.querySelectorAll(".snds");
      btns = this.$el.querySelectorAll(".snds");
      nowPlaying = -1;
      isPlaying = false;
      this.$refs.btnPlay.removeAttribute("disabled");
      for (let i = 0; i < btns.length; i++) {
        btns[i].classList.add("btn-success");
        btns[i].classList.remove("btn-outline-success");
      }
    },
    getUrl() {
      this.shortText = "短網址產生中...";
      let _this = this;
      // get short url
      let shortInput = this.$refs.shortInput;
      this.$http
        .post("https://kento520.tw/tinyurl/index.php", {
          url: encodeURIComponent(window.location.href)
        })
        .then(data => {
          shortInput.value = data.data;
          this.shortText = data.data;
          this.shortUrl = data.data;
          shortInput.setAttribute("type", "text");
          shortInput.select();
          document.execCommand("copy");
          shortInput.setAttribute("type", "hidden");
          Vue.swal({
            text: "分享短網址已複製到剪貼簿",
            type: "success",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-success"
            }
          });
        })
        .catch(function() {
          _this.shortText = "短網址產生失敗...";
          _this.shortUrl = "#";
          Vue.swal({
            text: "錯誤，無法產生短網址",
            type: "error",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-danger"
            }
          });
        });
    },
    // downloadFile() {
    //   const selectedSounds = this.snds.map(snd => snd.file);
    //   const audio = new Crunker({ sampleRate: 44100 });
    //   audio
    //     .fetchAudio(...selectedSounds)
    //     .then(buffers => audio.concatAudio(buffers))
    //     .then(merged => audio.export(merged, "audio/mp3"))
    //     .then(output => audio.download(output.blob, "fadacai"))
    //     .catch(error => {
    //       throw new Error(error);
    //     });
    // },
    remove(idx) {
      if (!isPlaying) {
        this.snds.splice(idx, 1);
      }
    },
    removeAll() {
      this.snds = [];
    },
    shareFacebook() {
      window.open(
        "http://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(window.location.href)
      );
    }
  },
  mounted() {
    // when soundbtns.vue btn clicked
    eventBus.$on("addSound", message => {
      if (!isPlaying) {
        let isIn = -1;
        for (let i = 0; i < this.sounds.length; i++) {
          if (message == this.sounds[i].id) {
            isIn = i;
            break;
          }
        }
        if (isIn > -1) {
          this.snds.push({
            file: this.sounds[isIn].file,
            name: this.sounds[isIn].name,
            id: this.sounds[isIn].id
          });
        }
      }
    });
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  watch: {
    snds: function(newVal) {
      let url = "";
      for (let i = 0; i < newVal.length; i++) {
        url = url + newVal[i].id + ",";
      }
      url = url.substr(0, url.length - 1);
      const routerObj = {
        name: "home"
      };
      if (url) {
        routerObj.query = { sids: url };
      }
      this.$router.push(routerObj);
    }
  }
};
</script>

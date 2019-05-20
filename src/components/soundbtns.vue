<template>
  <b-card title="所有聲音" sub-title="點一下可以預覽聲音，點兩下可以新增聲音">
    <hr />
    <div class="row align-items-center">
      <div class="col-12 my-2">
        <b-form-input v-model="search" placeholder="搜索聲音..."></b-form-input>
      </div>
      <div class="col-12 my-2">
        <b-button class="m-1" variant="info" @click="random(1)">
          隨機1個
        </b-button>
        <b-button class="m-1" variant="info" @click="random(3)">
          隨機3個
        </b-button>
        <b-button class="m-1" variant="info" @click="random(5)">
          隨機5個
        </b-button>
      </div>
      <div class="col-12">
        <hr />
      </div>
      <div class="col-12 my-2">
        <b-button
          class="m-1"
          v-for="(s, idx) in this.filtered"
          :key="idx"
          variant="success"
          @click="click(s.id)"
          >{{ s.name }}</b-button
        >
      </div>
    </div>
  </b-card>
</template>
<script>
import { eventBus } from "../main.js";
export default {
  name: "sounds",
  props: {
    sounds: Array
  },
  data() {
    let search = "";
    let clicks = 0;
    return {
      search,
      clicks
    };
  },
  methods: {
    random(count) {
      for (let i = 0; i < count; i++) {
        let rand = Math.floor(Math.random() * this.sounds.length);
        // preload sound
        let audio = new Audio();
        let isIn = -1;
        for (let i = 0; i < this.sounds.length; i++) {
          if (rand == this.sounds[i].id) {
            isIn = i;
            break;
          }
        }
        audio.src = this.sounds[isIn].file;
        audio.preload = "auto";
        eventBus.$emit("addSound", rand);
      }
    },
    click(id) {
      this.clicks++;
      let audio = new Audio();
      let isIn = -1;
      for (let i = 0; i < this.sounds.length; i++) {
        if (id == this.sounds[i].id) {
          isIn = i;
          break;
        }
      }
      if (isIn > -1) {
        audio.src = this.sounds[isIn].file;
        audio.preload = "auto";
      }
      if (this.clicks === 1) {
        let self = this;
        this.timer = setTimeout(function() {
          self.clicks = 0;
          if (isIn > -1) audio.play();
        }, 500);
      } else {
        clearTimeout(this.timer);
        this.clicks = 0;
        eventBus.$emit("addSound", id);
      }
    }
  },
  computed: {
    filtered() {
      return this.sounds.filter(s => {
        return s.name.includes(this.search);
      });
    }
  }
};
</script>

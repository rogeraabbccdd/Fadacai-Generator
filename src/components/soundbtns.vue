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
        <!-- filtered -->
        <p v-if="filtered.length == 0">沒有符合搜尋的結果</p>
        <div v-if="search.length > 0">
          <b-button
            class="m-1"
            v-for="(s, idx) in filtered"
            :key="'A' + idx"
            variant="success"
            @click="click(s.id)"
            >{{ s.name }}</b-button
          >
        </div>
        <!-- sounds -->
        <div v-if="search.length == 0">
          <h4>
            聲音、間隔
            <small>
              <a href="javascript:void(0)" v-b-toggle.groupSnd>
                <span class="when-opened">
                  <font-awesome-icon icon="chevron-up"
                /></span>
                <span class="when-closed">
                  <font-awesome-icon icon="chevron-down"
                /></span> </a
            ></small>
          </h4>
          <b-collapse id="groupSnd">
            <b-button
              class="m-1"
              v-for="(s, idx) in groupSnd"
              :key="'B' + idx"
              variant="success"
              @click="click(s.id)"
              >{{ s.name }}</b-button
            >
          </b-collapse>
          <hr />
          <h4>
            英文
            <small>
              <a href="javascript:void(0)" v-b-toggle.groupEng>
                <span class="when-opened">
                  <font-awesome-icon icon="chevron-up"
                /></span>
                <span class="when-closed">
                  <font-awesome-icon icon="chevron-down"
                /></span> </a
            ></small>
          </h4>
          <b-collapse id="groupEng">
            <b-button
              class="m-1"
              v-for="(s, idx) in groupEng"
              :key="'C' + idx"
              variant="success"
              @click="click(s.id)"
              >{{ s.name }}</b-button
            >
          </b-collapse>
          <hr />
          <h4>
            單字
            <small>
              <a href="javascript:void(0)" v-b-toggle.groupSingle>
                <span class="when-opened">
                  <font-awesome-icon icon="chevron-up"
                /></span>
                <span class="when-closed">
                  <font-awesome-icon icon="chevron-down"
                /></span> </a
            ></small>
          </h4>
          <b-collapse id="groupSingle">
            <b-button
              class="m-1"
              v-for="(s, idx) in groupSingle"
              :key="'D' + idx"
              variant="success"
              @click="click(s.id)"
              >{{ s.name }}</b-button
            >
          </b-collapse>
          <hr />
          <h4>
            四字以下
            <small>
              <a href="javascript:void(0)" v-b-toggle.groupWord>
                <span class="when-opened">
                  <font-awesome-icon icon="chevron-up"
                /></span>
                <span class="when-closed">
                  <font-awesome-icon icon="chevron-down"
                /></span> </a
            ></small>
          </h4>
          <b-collapse id="groupWord">
            <b-button
              class="m-1"
              v-for="(s, idx) in groupWord"
              :key="'E' + idx"
              variant="success"
              @click="click(s.id)"
              >{{ s.name }}</b-button
            >
          </b-collapse>
          <hr />
          <h4>
            五字以上
            <small>
              <a href="javascript:void(0)" v-b-toggle.groupSentence>
                <span class="when-opened">
                  <font-awesome-icon icon="chevron-up"
                /></span>
                <span class="when-closed">
                  <font-awesome-icon icon="chevron-down"
                /></span> </a
            ></small>
          </h4>
          <b-collapse id="groupSentence">
            <b-button
              class="m-1"
              v-for="(s, idx) in groupSentence"
              :key="'F' + idx"
              variant="success"
              @click="click(s.id)"
              >{{ s.name }}</b-button
            >
          </b-collapse>
          <hr />
        </div>
      </div>
    </div>
  </b-card>
</template>

<style scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>

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
        return s.name.toUpperCase().includes(this.search.toUpperCase());
      });
    },
    groupEng() {
      let reg = /^[A-Za-z\s]+$/;
      return this.sounds.filter(s => {
        return reg.test(s.name);
      });
    },
    groupSnd() {
      let arr = this.sounds.filter(s => {
        if (s.name.substring(0, 1) == "(") return true;
        else return false;
      });
      arr = arr.sort((a, b) => {
        let alen = a.name.length;
        let blen = b.name.length;
        if (!isNaN(a.name.slice(-1))) alen--;
        if (!isNaN(b.name.slice(-1))) blen--;
        return alen - blen;
      });
      return arr;
    },
    groupSingle() {
      let reg = /^[A-Za-z\s]+$/;
      return this.sounds.filter(s => {
        if (!reg.test(s.name) && s.name.length == 1) {
          return true;
        } else return false;
      });
    },
    groupWord() {
      let reg = /^[A-Za-z\s]+$/;
      let arr = this.sounds.filter(s => {
        // remove text in brackets and get it's length
        let len = s.name.replace(/ *\([^)]*\) */g, "").length;
        // don't count number in last string
        if (!isNaN(s.name.slice(-1))) len--;
        if (!reg.test(s.name) && len > 1 && len < 5 && s.name.slice(0) != "(") {
          return true;
        } else return false;
      });
      arr = arr.sort((a, b) => {
        let alen = a.name.length;
        let blen = b.name.length;
        if (!isNaN(a.name.slice(-1))) alen--;
        if (!isNaN(b.name.slice(-1))) blen--;
        return alen - blen;
      });
      return arr;
    },
    groupSentence() {
      let reg = /^[A-Za-z\s]+$/;
      let arr = this.sounds.filter(s => {
        let len = s.name.replace(/ *\([^)]*\) */g, "").length;
        if (!isNaN(s.name.slice(-1))) len--;
        if (!reg.test(s.name) && len > 4 && s.name.slice(0) != "(") {
          return true;
        } else return false;
      });
      arr = arr.sort((a, b) => {
        let alen = a.name.length;
        let blen = b.name.length;
        if (!isNaN(a.name.slice(-1))) alen--;
        if (!isNaN(b.name.slice(-1))) blen--;
        return alen - blen;
      });
      return arr;
    }
  }
};
</script>

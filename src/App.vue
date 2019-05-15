<template>
  <div id="app">
    <div id="bg">
      <css-doodle>
        :doodle { @grid: 5/ 100vw 100vh; background: transparent; }
        background-image: url(./img/m0@pick(1, 2, 3, 4).png);
        background-size:contain; background-repeat:no-repeat; position:
        absolute; @size: 10em; @place-cell: @rand(0, 20)% -20vh; left:
        @rand(-100, 100)%; animation: move 5s linear @rand(0, 7)s infinite;
        @keyframes move { 0% { transform: translateX( @rand(-10,-10)vw )
        translateY(0vh) rotate(@rand(0, 72)deg); } 25% { transform: translateX(
        @rand(-10,-10)vw ) translateY(35vh) rotate(@rand(73, 144)deg); } 50% {
        transform: translateX( @rand(-10,-10)vw ) translateY(70vh)
        rotate(@rand(145, 216)deg); } 75% { transform: translateX(
        @rand(-10,-10)vw ) translateY(105vh) rotate(@rand(217, 288)deg); }
        99.99% { transform: translateX( @rand(-10,-10)vw ) translateY(140vh)
        rotate(@rand(289, 360)deg); } 100% { transform: translateX(
        @rand(-10,-10)vw ) translateY(0vh) rotate(0deg); } }
      </css-doodle>
    </div>
    <router-view />
    <div class="text-center">
      <gh-btns-watch
        slug="rogeraabbccdd/Fadacai-Generator"
        show-count
      ></gh-btns-watch>
      <gh-btns-star
        slug="rogeraabbccdd/Fadacai-Generator"
        show-count
      ></gh-btns-star>
      <gh-btns-fork
        slug="rogeraabbccdd/Fadacai-Generator"
        show-count
      ></gh-btns-fork>
    </div>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif, "Microsoft JHengHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#bg {
  z-index: -1;
  height: 100vh;
  width: 100vw;
  position: fixed;
  margin: 0;
  background-attachment: fixed;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../public/img/loveriver.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.gh-button-container {
  float: none;
}
</style>

<script>
import "css-doodle";
import "vue-github-buttons/dist/vue-github-buttons.css";
export default {};
</script>

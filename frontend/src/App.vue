<script>
import RandomServer from './components/randomServer.vue'
import MainIntro from './components/mainIntro.vue'

export default {
  components: {
    RandomServer,
    MainIntro
  }
}
</script>

<template>
  <div id="mainServers">
    <MainIntro/>
    <div id="randomServer">
      <RandomServer/>
    </div>
  </div>
</template>

<style>
* {
  color: var(--text);
}
</style>

<style scoped>
#randomServer {
  background-color: var(--rserver-background);
  padding: 1rem;
  display: flex;
  width: max-content;
  margin: 0 auto;
  margin-top: 1rem;
  justify-content:center;
  border-radius: 1rem; 
}

#mainServers {
  margin: 0 auto;
  margin-top: 1rem;
  background-color: var(--sub-background);
  padding: 1rem;
  width: 50%;
}
</style>

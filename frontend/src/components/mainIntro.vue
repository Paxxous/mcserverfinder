<script>
export default {
  data() {
    return {
      port: 25565
    }
  },

  methods: {
    getPort() {
      fetch('http://localhost:8080/api/port')
        .then((res) => res.text())
        .then((data) => {
          this.port = data;
        })
        .catch((er) => console.log(er));
    }
  },

  beforeMount() {
    this.getPort();
  }
}
</script>

<template>
  <header>
    <h1>Random Minecraft Servers</h1>
    <p>A website that hands you the random ip addresses to minecraft servers. Currently with the default port of {{ port }}.</p>
  </header>
</template>

<style scoped>
header {
  text-align: center;
}
</style>

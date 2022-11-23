<script>
const axios = require('axios');

export default {
  data() {
    return {
      ips: []
    }
  },
  methods: {
    
  }
}
</script>

<template>
  <div id="serversWrapper">
    <div id="servers">
      <button id="leftNav">&lt;</button>

      <div id="serversDisplay">
        <h1>Haha funny man</h1>
      </div>

      <button id="rightNav">&gt;</button>
    </div>
  </div>
</template>

<style scoped>
button {
  height: 4rem;
}

#servers {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#serversDisplay {
  background-color: var(--slightly-darker-blue);
  border-radius: 0.8rem;
  border: 0.1rem solid var(--slightly-light-blue);

  max-width: 50%;
  padding: 1rem;
}

#servers > * {
  margin: 0.2rem;
}
</style>

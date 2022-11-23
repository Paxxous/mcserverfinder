<script>
import Servers from './components/servers.vue';
export default {
  components: {
    Servers,
  },
  data() {
    return {
      count: 1,
    }
  },
}
</script>

<template>
  <Servers/>
</template>

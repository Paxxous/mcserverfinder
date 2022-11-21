<script>
export default {
  data() {
    return {
      ip: 0,
      sinfo: [],
      loading: 'Loading...'
    }
  },

  methods: {
    grabIp() {
      this.sinfo = [];
      fetch('http://localhost:8080/api/getIps')
        .then((res) => res.json())
        .then((data) => {
          /* console.log(data); */
          this.ip = data;
          /* this.grabServerInfo('202.63.74.190'); */
          this.grabServerInfo(data);
        })
        .catch((er) => console.log(er));
    },

    grabServerInfo(ips) {
      fetch(`http://localhost:8080/api/getServerInfo?ip=${ips}`)
        .then((res) => res.json())
        .then((data) => {
          this.sinfo = data;
        })
        .catch((er) => {
          console.log(
            er +
            "\nThe server may be offline"
          );
          this.loading = "The server may be offline"
        });
    },

    copy() {
      navigator.clipboard.writeText(this.ip);
    }
  },

  beforeMount() {
    this.grabIp();
  },

  created() {
    addEventListener('keyup', (e) => {
      if (e.key == ' ') {
        this.loading = 'Loading...';
        this.grabIp();
      }
    });
  },
}
</script>

<template>
  <div id="serverInfoWrapper">
    <div id="serverInfo" v-if="sinfo.motd">
      <div id="ip">
        <p class="secure">{{ ip }}</p>
        <i @click="copy" class="fa-solid fa-clipboard"></i>
      </div>

      <div v-if="sinfo.favicon">
        <img :src="sinfo.favicon" width="100"/> 
      </div>
      <div v-else>
        <img src="@/assets/pack.png" width="100"/>
      </div>
      <table>
        <tr>
          <th>Server info</th>
        </tr>
        <tr>
          <td>Players online:</td>
          <td>{{ sinfo.players.online }}</td>
        </tr>
        <tr>
          <td>Server Version:</td>
          <td>{{ sinfo.version.name }}</td>
        </tr>
        <tr>
          <td>Server protocol:</td>
          <td>{{ sinfo.version.protocol }}</td>
        </tr>
        <tr>
          <td>Motd:</td>
          <td>{{ sinfo.motd.clean }}</td>
        </tr>
        <tr>
          <td>Latency:</td>
          <td>{{ sinfo.roundTripLatency }}</td>
        </tr>
        <tr v-if="sinfo.players.sample">
          <td>Players:</td>
          <div v-for="plyrs in sinfo.players.sample" :key="plyrs.id">
            <td><a :href="'https://namemc.com/profile/' + plyrs.name" target="_blank">{{ plyrs.name }}</a></td>
          </div>
        </tr>
      </table>
    </div>
    <div v-else>
      <p id="loading">{{ loading }}</p>
    </div>
  </div>
</template>

<style scoped>
#loading {
  font-weight: 700;
  font-size: 1.5rem;
}

.secure {
  background: var(--sensitive);
  color: transparent;
  width: max-content;
  height: max-content;
}

#ip {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.fa-clipboard {
  transition: 0.5s ease opacity;
  margin: 0.2em;
  font-size: 1.5rem;
}

.fa-clipboard:hover {
  cursor: pointer;
  transition: 0.5s ease opacity;
  opacity: .7;
}
</style>

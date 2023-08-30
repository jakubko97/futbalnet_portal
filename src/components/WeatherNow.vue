<template>
  <div>
    <h2>{{ location }}</h2>
    <img alt="Current weather icon" :src="icon ? icon : ''" />
    <p>Čas merania {{ formattedDate }}</p>
    {{ temp + '℃ ' + humidity + '%'}}
    <v-row>
      <v-col>
        <vue-thermometer
          style="justify-content: end"
          :value="temp"
          :min="-20"
          :max="25"
        />
      </v-col>
      <v-col>
        <vue-thermometer
          :value="humidity"
          :min="0"
          scale="%"
          :max="100"
          :options="{
            thermo: {
              color: '#0000FF',
            },
          }"
        />
      </v-col>
    </v-row>

    <div class="text-center">
      <v-btn
        rounded
        class="mt-2"
        color="primary"
        dark
        :loading="loading"
        @click="fetchData()"
      >
        Obnoviť
      </v-btn>
      <p class="red--text">
        {{ error }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "WeatherNow",
  props: {
    msg: String,
  },
  data() {
    return {
      date: "",
      temp: null,
      humidity: null,
      location: "",
      currentLocale: "sk",
      loading: false,
      error: "",
      icon: "",
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    formattedDate: function () {
      // !! format the date based on this.currentLocale !!
      let formattedDate = "";
      let options = {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      if (this.date) {
        formattedDate = new Date(this.date).toLocaleDateString(
          this.currentLocale,
          options
        );
      }
      return formattedDate;
    },
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = "";
      //     const paramsObj = JSON.stringify({
      //   "db":"home",
      //   "q":"select temperature, humidity, location from temperature order by time DESC limit 1;"
      // })
      //     const searchParams = new URLSearchParams(paramsObj);

      return await fetch(
        "http://192.168.1.122:8086/query?db=home&epoch=ms&q=SELECT+%22temperature%22%2C%20%22humidity%22%2C%20%22location%22%2C%20%22icon%22+FROM+%22temperature%22+ORDER+BY+time+DESC+LIMIT%201%3B",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          // body: searchParams.toString()
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const values = data.results[0].series[0].values[0];
          this.date = values[0];
          this.temp = values[1];
          this.humidity = values[2];
          this.location = values[3];
          this.icon = values[4];
        })
        .catch((err) => {
          this.error = "Nastala chyba: " + err;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p {
  margin: 6px 3px;
}
</style>

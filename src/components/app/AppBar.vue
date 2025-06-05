<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Jami page</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list nav dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "AppBarCustom",
  data() {
    return {
      items: [
        {
          title: "Termometer",
          icon: "mdi-home-thermometer",
          path: "/termometer",
        },
        { title: "Futbalnet", icon: "mdi-soccer", path: "/futbalnet" },
        { title: "Testy", icon: "mdi-clipboard-text-clock", path: "/test" },
        // { title: 'Profile', icon: 'mdi-cloud', path: '/profile' },
      ],
      drawer: false,
      group: null,
    };
  },
};
</script>

<template>
  <v-app>
    <v-navigation-drawer
      expand-on-hover
      rail
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://img-bed-for-md.oss-cn-shanghai.aliyuncs.com/img/logo1.jpg"
          title="alchemy"
          subtitle="Hello world!"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
          <v-list-item
            v-for="item in navItems"
            :key="item.title"
            :prepend-icon="item.icon"
            :title="item.title"
            @click="navClick(item.path)"
          >
          </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
        <router-view/>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

  const router = useRouter();

  const navItems = ref([
    { title: "Records", path: "/Records", icon: "mdi-folder" },
    { title: "Inbox", path: "/Inbox", icon: "mdi-email" },
    { title: "Starred", path: "/Starred", icon: "mdi-star" },
    { title: "Setting", path: "/Setting", icon: "mdi-cog" },
    { title: "About", path: "/About", icon: "mdi-information" },
  ]);

  function navClick(this: any, path: string) {
    router.push(path);
  }

</script>

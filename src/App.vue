<template>
  <v-app :theme="theme">

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Settings</v-card-title>
        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">

                <v-text-field v-model="mailFetchPeriod" label="Mail Fetch Period (second)"
                  hint="Enter a integer larger than 1s" :rules="[
                    v => (Number.isInteger(v) || parseInt(v)) && v >= 1 || 'Must be an integer >= 1'
                  ]" type="number" required>
                </v-text-field>
              </v-col>
              <v-col cols="1">
                <v-switch v-model="darkModeSwitch" prepend-icon="mdi-theme-light-dark"></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="clickSaveSettings">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-app-bar prominent>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        {{ title }}
        <v-tooltip activator="parent" location="bottom start">{{ cwd }}</v-tooltip>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-refresh" @click="clickRefresh"></v-btn>

      <v-btn variant="text" icon="mdi-cog" @click="dialog = true"></v-btn>

      <v-btn variant="text" icon="mdi-help" href="https://github.com/XiPotatonium/alchemy/wiki" target="_blank"></v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list nav>
        <v-list-item v-for="item in navItems" :key="item.title" :prepend-icon="item.icon" :title="item.title"
          @click="navClick(item.path)">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { useTheme } from "vuetify";

const drawer: Ref<boolean> = ref(false);
const dialog: Ref<boolean> = ref(false);
const title: Ref<string> = ref("alchemy");
const cwd: Ref<string> = ref("/home/xx/alchemy");
const darkModeSwitch = ref(false);
const theme: Ref<string> = ref("light");
const mailFetchPeriod: Ref<number> = ref(10);

const router = useRouter();

const navItems = ref([
  { title: "Records", path: "/Records", icon: "mdi-folder" },
  { title: "Inbox", path: "/Inbox", icon: "mdi-email" },
]);

async function refreshInfo() {
  await axios.get("/api/getInfo").then((response) => {
    let pathsegs: string[] = response.data.cwd;
    title.value = pathsegs[pathsegs.length - 1];
    if (pathsegs[0] == '/') {
      cwd.value = "/" + pathsegs.slice(1).join('/');
    } else if (pathsegs[0].endsWith("\\")) {    // 虽然实际上返回的是\\，但是似乎就变成了\，tnnd js
      cwd.value = pathsegs[0] + pathsegs.slice(1).join('/');
    } else {
      cwd.value = pathsegs.join('/');
    }
  });
}

async function refreshSettings() {
  await axios.get("/api/getSettings").then((response) => {
    changeSettings(response.data);
  });
}

type SettingsProto = {
  theme: string;
  mail_fetch_period: number;
}

function changeSettings(settings: SettingsProto) {
  theme.value = settings.theme;
  darkModeSwitch.value = settings.theme === "dark";
  mailFetchPeriod.value = settings.mail_fetch_period;
}

function navClick(this: any, path: string) {
  router.push(path);
}

async function clickRefresh() {
  await refreshInfo();
  await refreshSettings();
}

async function clickSaveSettings() {
  dialog.value = false;
  await axios.post("/api/setSettings", {
    "theme": darkModeSwitch.value ? "dark" : "light",
    "mail_fetch_period": mailFetchPeriod.value,
  }).then((response) => {
    changeSettings(response.data);
  });
}

onMounted(async () => {
  await refreshInfo();
  await refreshSettings();
});

</script>

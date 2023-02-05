<template>
  <v-container fluid>
    <v-expansion-panels
     class="mb-6"
     multiple
    >
      <v-expansion-panel v-for="mail in mails" :key="mail.id">
        <v-expansion-panel-title expand-icon="mdi-menu-down">
          {{ `${mail.sender.tag}: ${mail.title}` }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>{{ mail.text }}</v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, Ref, ref } from 'vue';

class Sender {
  readonly tag: string;
  readonly category: string;
  readonly ctime: Date;
  readonly dir: string;

  constructor(tag: string, category: string, ctime: Date, dir: string) {
    this.tag = tag;
    this.category = category;
    this.ctime = ctime;
    this.dir = dir;
  }
}

class Mail {
  readonly id: string;
  readonly title: string;
  readonly text: string;
  readonly time: Date;
  readonly sender: Sender;
  readonly level: string;
  readonly read: boolean;

  constructor(
    id: string, title: string, text: string, time: Date, sender: Sender, level: string, read: boolean
  ) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.time = time;
    this.sender = sender;
    this.level = level;
    this.read = read;
  }
}

type MailProto = {
  id: string,
  title: string,
  text: string,
  time: string,
  sender: {
    tag: string,
    category: string,
    ctime: string,
    dir: string,
  },
  level: string, // ["error", "warning", "info", "debug", "other"]
  read: boolean,
}

const mails: Ref<Mail[]> = ref([]);


async function refresh() {
  await axios.get('/api/getMails').then((response) => {
    mails.value = Array.from(response.data.mails.map((m: MailProto) => {
      return new Mail(
        m.id, m.title, m.text, new Date(m.time),
        new Sender(m.sender.tag, m.sender.category, new Date(m.sender.ctime), m.sender.dir),
        m.level, m.read
      );
    }));
  });
}


onMounted(refresh);

</script>
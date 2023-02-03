<template>
  <v-card
    class="mx-auto"
  >
    <v-toolbar>
      <v-btn
        icon="mdi-arrow-left"
        :disabled="currentDirTree.length == 1"
        @click="clickBack"
      ></v-btn>

      <v-breadcrumbs :items="currentDirTree">
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>

      <v-spacer></v-spacer>

      <v-text-field
        clearable
        label="Search"
        v-model="searchQuery"
        @keydown.enter.prevent="search"
        @click:clear="search"
      ></v-text-field>
    </v-toolbar>

    <v-list lines="two">
      <v-list-item
        density="compact"
        v-for="file in fileFilter(files, searchQueryActual)"
        :key="file.name"
        :title="file.name"
        :subtitle="file.mtime"
        @dblclick="dblClickFile(file)"
      >
        <!--v-tooltip activator="parent" location="start center" origin="auto">{{ file.name }}</v-tooltip-->
        <template v-slot:prepend>
          <v-avatar color="blue">
            <v-icon color="white">{{ file.icon }}</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey"
            icon="mdi-information"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import axios from "axios";

const currentDirTree = ref(["records"]);

class File {
  readonly ty: string;
  readonly icon: string;
  readonly path: string[];
  readonly ctime: string;
  readonly mtime: string;

  constructor(ty: string, path: string[], ctime: string, mtime: string) {
    this.ty = ty;
    if (ty === "folder") {
      this.icon = "mdi-folder";
    } else {
      this.icon = "mdi-file"; // file type is currently not considered
    }
    this.path = path;
    this.ctime = ctime;
    this.mtime = mtime;
  }

  get is_folder(): boolean {
    return this.ty === "folder";
  }

  get name(): string {
    return this.path[this.path.length - 1];
  }
}

type FileInfoProto = {
  ty: string;
  path: string[];
  ctime: string;
  mtime: string;
};

const files: Ref<File[]> = ref([]);

async function refreshItems() {
  var targetPath = currentDirTree.value.slice(1).join('/');
  await axios.get("/api/getRecords/" + targetPath).then((response) => {
    files.value = Array.from(response.data["subitems"].map(
      (f: FileInfoProto) => { return new File(f.ty, f.path, f.ctime, f.mtime); }
    ));
    var path: string[] = response.data["path"];
    console.assert(path.join('/') === targetPath);
    if (Object.hasOwn(response.data, "cfg")) {

    }
    if (Object.hasOwn(response.data, "doc")) {

    }
  });
}

async function dblClickFile(e: File) {
  if (e.is_folder) {
    currentDirTree.value.push(e.name);
    await refreshItems();
  } else {
    window.open("/api/getFile/" + currentDirTree.value.slice(1).concat(e.name).join('/'));
  }
}

async function clickBack() {
  currentDirTree.value.pop();
  await refreshItems();
}

const searchQuery: Ref<string> = ref("");
const searchQueryActual: Ref<string> = ref("");
function search() {
  console.log("You search " + searchQuery.value);
  searchQueryActual.value = searchQuery.value;
}

function fileFilter(files: File[], query: string) {
  return files.filter((f: File) => {
    if (!query) {
      return true;    // Keep all files when searchbox is empty (null or '')
    }
    return f.name.includes(query);
  });
}

onMounted(refreshItems);

</script>
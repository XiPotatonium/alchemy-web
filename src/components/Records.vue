<template>
  <v-container fluid>
    <v-row align="center">
      <v-col>
        <v-breadcrumbs :items="curPathsegs">
          <template v-slot:prepend>
            <v-btn variant="text" icon="mdi-arrow-left" :disabled="curPathsegs.length == 1" @click="clickBack"></v-btn>
          </template>
        </v-breadcrumbs>
      </v-col>

      <v-spacer></v-spacer>

      <v-col>
        <v-text-field clearable hide-details single-line append-inner-icon="mdi-magnify" v-model="searchQuery"
          @keydown.enter.prevent="search" @click:clear="search"></v-text-field>

      </v-col>
    </v-row>


    <v-list>
      <v-list-item density="compact" v-for="file in fileFilter(files, searchQueryActual)" :key="file.name"
        :title="file.name" @dblclick.prevent="dblClickFile(file)">
        <!--v-tooltip activator="parent" location="start center" origin="auto">{{ file.name }}</v-tooltip-->
        <template v-slot:prepend>
          <v-icon>{{ file.icon }}</v-icon>
        </template>

        <template v-slot:append>
          {{ file.mtime }}
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import axios from "axios";

const curPathsegs = ref(["records"]);

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
  var targetPath = curPathsegs.value.slice(1).join('/');
  await axios.get("/api/lsFiles/" + targetPath).then((response) => {
    let files_: File[] = Array.from(response.data["subitems"].map(
      (f: FileInfoProto) => { return new File(f.ty, f.path, f.ctime, f.mtime); }
    ));
    files_.sort((a, b) => {
      // folder first
      if (a.is_folder && !b.is_folder) {
        return -1;
      }
      if (b.is_folder && !a.is_folder) {
        return 1;
      }
      // sort by name
      return a.name.localeCompare(b.name);
    });
    files.value = files_;
    var path: string[] = response.data["path"];
    console.assert(path.join('/') === targetPath);
  });
}

async function dblClickFile(e: File) {
  if (e.is_folder) {
    curPathsegs.value.push(e.name);
    await refreshItems();
  } else {
    window.open("/api/getFile/" + curPathsegs.value.slice(1).concat(e.name).join('/'));
  }
}

async function clickBack() {
  curPathsegs.value.pop();
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
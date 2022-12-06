<template>
  <v-row>
    <v-col>
      <v-btn
        icon="mdi-arrow-left"
        :disabled="currentDirTree.length == 1"
        @click="clickBack"
      ></v-btn>
    </v-col>

    <v-col>
      <v-breadcrumbs :items="currentDirTree">
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-col>
  </v-row>

  <div class="py-2" />

  <v-table>
    <thead>
      <tr>
        <th></th>
        <th class="text-left">Name</th>
        <th class="text-right">Last Modified</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.name" @dblclick="dblClickItem(item)">
        <td>
          <v-icon>{{
            item.ty == "folder"
              ? "mdi-folder"
              : item.ty == "file"
              ? "mdi-file"
              : "mdi-help"
          }}</v-icon>
        </td>
        <td class="text-left">{{ item.name }}</td>
        <td class="text-right">{{ item.mtime }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import axiosInstance from "@/request";

const currentDirTree = ref(["records"]);

class FileInfo {
  readonly ty: string;
  readonly path: string[];
  readonly ctime: string;
  readonly mtime: string;

  constructor(ty: string, path: string[], ctime: string, mtime: string) {
    this.ty = ty;
    this.path = path;
    this.ctime = ctime;
    this.mtime = mtime;
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

function convertFileInfo(info: FileInfoProto): FileInfo {
  return new FileInfo(info.ty, info.path, info.ctime, info.mtime);
}

// TODO: delete these placeholder
const items: Ref<FileInfo[]>= ref([]);

async function refreshItems() {
  var targetPath = "/" + currentDirTree.value.join("/");
  console.log(`visiting ${targetPath}`);
  await axiosInstance.get(targetPath).then((response) => {
    items.value = Array.from(response.data["subitems"].map(convertFileInfo));
    var path: string[] = response.data["path"];
    if (response.data.has("cfg")) {

    }
    if (response.data.has("doc")) {

    }
  });
}

async function dblClickItem(e: FileInfo) {
  if (e.ty === "folder") {
    currentDirTree.value.push(e.name);
    await refreshItems();
  } else if (e.ty === "file") {
  }
}

async function clickBack() {
  currentDirTree.value.pop();
  await refreshItems();
}

onMounted(refreshItems);

</script>
<template>
    <v-breadcrumbs :items="currentDirTree">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <div class="py-2" />

    <v-table>
        <thead>
        <tr>
            <th></th>
            <th class="text-left">
            Name
            </th>
            <th class="text-right">
            Last Modified
            </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in items"
            :key="item.name"
            @dblclick="dblClickItem(item)"
        >
            <td><v-icon>{{item.type == "folder" ? "mdi-folder" : item.type == "file" ? "mdi-file" : "mdi-help" }}</v-icon></td>
            <td class="text-left">{{ item.name }}</td>
            <td class="text-right">{{ item.mdate }}</td>
        </tr>
        </tbody>
    </v-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentDirTree = ref(["records"])

const items = ref([
    {
        name: "..",
        type: "folder",
        cdate: new Date(2022, 11, 26, 16, 9, 21),
        mdate: new Date(2022, 11, 26, 16, 9, 21),
    },
    {
        name: ".",
        type: "folder",
        cdate: new Date(2022, 11, 26, 16, 9, 21),
        mdate: new Date(2022, 11, 26, 16, 9, 21),
    },
    {
        name: "foo",
        type: "folder",
        cdate: new Date(2022, 11, 26, 16, 9, 21),
        mdate: new Date(2022, 11, 26, 16, 9, 21),
    },
    {
        name: "bar.txt",
        type: "file",
        cdate: new Date(2022, 11, 26, 16, 9, 20),
        mdate: new Date(2022, 11, 26, 16, 9, 20),
    }
])

function dblClickItem(e: any) {
    if (e.name == "..") {
        if (currentDirTree.value.length == 1) {
            // cannot visit parents of records
        } else {
            currentDirTree.value.pop();
        }
    } else if (e.name == ".") {
        // nothing changed
    } else if (e.type == "folder") {
        currentDirTree.value.push(e.name);
    } else if (e.type == "file") {

    }
    var targetPath = currentDirTree.value.join('/');
    console.log(`Visiting ${targetPath}`);
}

</script>
<template lang="">
  <el-table :data="products">
    <el-table-column type="index" label="#" />
    <el-table-column prop="title" label="Mahsulot nomi">
      <template #default="scope">
        <div class="p-tb d-f align-items-center">
          <el-image
            class="table-img mr-1"
            style="width: 50px; height: 50px"
            :src="`${url}/${scope.row.img[0].response}`"
            fit="cover"
          />
          <p>{{ scope.row.title }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="unit" label="Birligi" />
    <el-table-column prop="status" label="Holati">
      <template #default="scope">
        <el-popconfirm
          title="Qarorongiz qat'iymi"
          @confirm="changeStatus(scope.row._id)"
        >
          <template #reference>
            <el-button :type="scope.row.status == 1 ? `success` : `danger`">
              <el-icon>
                <check v-if="scope.row.status == 1" />
                <close v-else />
              </el-icon>
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
    <el-table-column width="100" align="right">
      <template #default="scope">
        <el-dropdown>
          <el-button>
            <el-icon>
              <more />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="editProduct(scope.row._id)">
                <el-icon>
                  <edit />
                </el-icon>
                Tahrirlash
              </el-dropdown-item>
              <el-dropdown-item @click="remove(scope.row._id)">
                <el-icon>
                  <delete />
                </el-icon>
                O'chirish
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
const emit = defineEmits([
  'edit'
])

import { useProductStore } from "../../stores/data/product";
import { useHelperStore } from "../../stores/helpers";
import { useDialogStore } from "../../stores/usefull/dialog";
import { storeToRefs } from "pinia";
const store = useProductStore();

const { products } = storeToRefs(store);
const { status_product, delete_product } = store;

const helpers = useHelperStore();
const { url } = helpers;

const dialog = useDialogStore()

const changeStatus = (_id) => {
  status_product(_id);
};


const editProduct = (_id) => {
  emit('edit', _id)
  dialog.setToggle(true)
  dialog.setEditToggle(true)
}


const remove = (_id) => {
  if (confirm("Qaroringiz qat`iymi")) {
    delete_product(_id);
  }
};
</script>

<style lang="scss">
.table-img {
    border-radius: 5px;
    box-shadow: 0px 2px 5px;
}
</style>

<template lang="">
    <el-table :data="priceprods">
      <el-table-column type="index" label="#" />
      <el-table-column prop="product.title" label="Mahsulot nomi" />
      <el-table-column prop="price" label="Narhi">
        <template #default="scope">
          <div>
            {{scope.row.price.toLocaleString() || 0 }} so'm
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Sana" prop="data"/>
      <el-table-column prop="status" label="Holati" width="80">
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
                <el-dropdown-item @click="editPriceprod(scope.row._id)">
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
  
  import { usePriceprodStore } from "../../stores/data/priceprod";
  import { useDialogStore } from "../../stores/usefull/dialog";
  import { storeToRefs } from "pinia";
  const store = usePriceprodStore();
  
  const { priceprods } = storeToRefs(store);
  const { status_priceprod, delete_priceprod } = store;

  const dialog = useDialogStore()
  
  const changeStatus = (_id) => {
    status_priceprod(_id);
  };
  
  
  const editPriceprod = (_id) => {
    emit('edit', _id)
    dialog.setToggle(true)
    dialog.setEditToggle(true)
  }
  
  
  const remove = (_id) => {
    if (confirm("Qaroringiz qat`iymi")) {
      delete_priceprod(_id);
    }
  };
  </script>
  
  <style lang="scss">
  .table-img {
      border-radius: 5px;
      box-shadow: 0px 2px 5px;
  }
  </style>
  
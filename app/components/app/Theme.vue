<script lang="ts" setup>
import { useDark, useToggle} from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const theme = ref(false)

toggleDark(false)
</script>
<template>
  <ClientOnly>
    <el-switch
        v-model="theme"
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny"
        @click="toggleDark(theme)"
        style="--el-switch-on-color: #4c4c4c; --el-switch-off-color: #a9a9a9"
    />
  </ClientOnly>
</template>
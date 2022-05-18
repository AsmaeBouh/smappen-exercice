<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn

      :loading="progress.loading"
      :percentage="progress.percentage"
      dark-percentage
      unelevated
      color="purple"
      text-color="grey-9"
      @click="startSearching()"
      style="width: 100px"
    >
        Search
    </q-btn>
  </div>
</template>
<script>
import { ref, onBeforeUnmount } from 'vue'

export default {
  setup () {
    const progress = ref({ loading: false, percentage: 0 })


    function startSearching () {
      progress.value.loading = true
      progress.value.percentage = 0

    }

    onBeforeUnmount(() => {
      
    })

    return {
      progress,
      startSearching
    }
  }
}
</script>

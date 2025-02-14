<template>
  <div class="container mt-3">
    <h2>Upload File</h2>
    <UploadForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UploadForm from '../components/UploadForm.vue'

export default defineComponent({
  name: 'HomeView',
  components: { UploadForm }
})
</script>

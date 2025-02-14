<template>
  <div class="upload-form p-4 border rounded shadow-sm bg-white">
    <form @submit.prevent="handleUpload" novalidate>
      <div class="mb-3">
        <label class="form-label fw-bold">Select Image</label>
        <input type="file" class="form-control" @change="handleFileChange" />
        <div v-if="errors.file" class="text-danger small mt-1">{{ errors.file }}</div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Dropdown</label>
        <select v-model="dropdownValue" class="form-select">
          <option disabled value="">Select an option</option>
          <option value="Option1">Option 1</option>
          <option value="Option2">Option 2</option>
          <option value="Option3">Option 3</option>
        </select>
        <div v-if="errors.dropdownValue" class="text-danger small mt-1">{{ errors.dropdownValue }}</div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Input Field</label>
        <input type="text" class="form-control" v-model="inputField" />
        <div v-if="errors.inputField" class="text-danger small mt-1">{{ errors.inputField }}</div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Free Text</label>
        <textarea class="form-control" v-model="freeText" rows="3"></textarea>
      </div>

      <div class="d-grid">
        <button type="submit" class="btn btn-primary">Upload</button>
      </div>
    </form>

    <div v-if="uploadResult" class="alert alert-success mt-3">
      File uploaded! <a :href="uploadResult" target="_blank">View File</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { uploadFile } from '../api/fileUpload'

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']

const selectedFile = ref<File | null>(null)
const dropdownValue = ref<string>('')
const inputField = ref<string>('')
const freeText = ref<string>('')

const uploadResult = ref<string>('')

interface FormErrors {
  file?: string
  dropdownValue?: string
  inputField?: string
}

const errors = reactive<FormErrors>({})

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  errors.file = undefined
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    const fileName = file.name.toLowerCase()
    const extension = fileName.substring(fileName.lastIndexOf('.'))
    if (!allowedExtensions.includes(extension)) {
      errors.file = 'Only image files (JPG, JPEG, PNG, GIF) are allowed.'
      target.value = ''
      selectedFile.value = null
      return
    }
    selectedFile.value = file
  }
}

function validateForm(): boolean {
  let isValid = true
  if (!selectedFile.value) {
    errors.file = 'File is required.'
    isValid = false
  } else {
    errors.file = undefined
  }
  if (!dropdownValue.value) {
    errors.dropdownValue = 'Dropdown value is required.'
    isValid = false
  } else {
    errors.dropdownValue = undefined
  }
  if (!inputField.value.trim()) {
    errors.inputField = 'Input field is required.'
    isValid = false
  } else {
    errors.inputField = undefined
  }
  return isValid
}

async function handleUpload() {
  if (!validateForm()) {
    return
  }
  const formData = new FormData()
  formData.append('file', selectedFile.value as File)
  formData.append('dropdownValue', dropdownValue.value)
  formData.append('inputField', inputField.value)
  formData.append('freeText', freeText.value)
  try {
    const response = await uploadFile(formData)
    uploadResult.value = response.data.fileMetadata.blobUrl
  } catch (error: any) {
    console.error(error)
    alert("Error uploading file.")
  }
}
</script>

<style scoped>
.upload-form {
  max-width: 500px;
  margin: 0 auto;
}
</style>

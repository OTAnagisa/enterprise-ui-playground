<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">UI Library - Dev Playground</h1>
      
      <!-- Button Component -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">Button Component</h2>
        <div class="space-y-4">
          <div class="flex gap-4 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="danger">Danger</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div>
            <Button full-width>Full Width Button</Button>
          </div>
        </div>
      </div>

      <!-- TextField Component -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">TextField Component</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField 
            v-model="textValue"
            label="Name"
            placeholder="Enter your name"
          />
          <TextField 
            v-model="emailValue"
            label="Email"
            type="email"
            placeholder="email@example.com"
            :error="emailError"
          />
          <TextField 
            label="Password"
            type="password"
            placeholder="Enter password"
            helperText="Must be at least 8 characters"
          />
          <TextField 
            label="Disabled"
            disabled
            modelValue="This field is disabled"
          />
        </div>
      </div>

      <!-- DateInput Component -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">DateInput Component</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateInput 
            v-model="dateValue"
            label="Birth Date"
          />
          <DateInput 
            v-model="appointmentDate"
            label="Appointment Date"
            :min="minDate"
            :max="maxDate"
            helperText="Select a date in the current month"
          />
        </div>
      </div>

      <!-- Card Component -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Default Card">
          <p class="text-gray-700">This is a default card with title and content.</p>
        </Card>
        
        <Card title="Elevated Card" variant="elevated" hoverable>
          <p class="text-gray-700">This card has shadow and hover effect.</p>
        </Card>
        
        <Card title="Card with Footer">
          <p class="text-gray-700">This card has a footer with actions.</p>
          <template #footer>
            <div class="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Save</Button>
            </div>
          </template>
        </Card>
      </div>

      <!-- Calendar Component -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">Calendar Component</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Calendar v-model="selectedDate" />
          </div>
          <div>
            <div class="p-4 bg-gray-50 rounded-md">
              <p class="text-sm font-medium text-gray-700 mb-2">Selected Date:</p>
              <p v-if="selectedDate" class="text-lg font-semibold text-gray-900">
                {{ formatDate(selectedDate) }}
              </p>
              <p v-else class="text-gray-500">No date selected</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Component -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">Table Component</h2>
        <Table 
          :columns="tableColumns" 
          :data="tableData"
          striped
          hoverable
        >
          <template #cell-status="{ value }">
            <span 
              :class="[
                'px-2 py-1 text-xs font-medium rounded-full',
                value === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              ]"
            >
              {{ value }}
            </span>
          </template>
        </Table>
      </div>

      <div class="mt-8 text-center text-gray-600">
        <p>Run <code class="bg-gray-100 px-2 py-1 rounded">pnpm storybook</code> to view components in Storybook</p>
        <p class="mt-2">Run <code class="bg-gray-100 px-2 py-1 rounded">pnpm test</code> to run unit tests</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from './components/atoms/Button/Button.vue'
import TextField from './components/atoms/TextField/TextField.vue'
import DateInput from './components/atoms/DateInput/DateInput.vue'
import Card from './components/molecules/Card/Card.vue'
import Calendar from './components/organisms/Calendar/Calendar.vue'
import Table from './components/organisms/Table/Table.vue'
import type { TableColumn } from './components/organisms/Table/Table.vue'

// TextField
const textValue = ref('')
const emailValue = ref('')
const emailError = computed(() => {
  if (emailValue.value && !emailValue.value.includes('@')) {
    return 'Please enter a valid email address'
  }
  return ''
})

// DateInput
const dateValue = ref('')
const appointmentDate = ref('')
const today = new Date()
const minDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]
const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0]

// Calendar
const selectedDate = ref<Date | null>(null)

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// Table
const tableColumns: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true, width: '20' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', align: 'center' },
]

const tableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Manager', status: 'Active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
]
</script>

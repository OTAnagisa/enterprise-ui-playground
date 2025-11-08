<script setup lang="ts">
import { ref } from 'vue';
import Input from '../../atoms/Input/Input.vue';
import Button from '../../atoms/Button/Button.vue';

export interface SearchBarProps {
  placeholder?: string;
  buttonText?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<SearchBarProps>(), {
  placeholder: 'Search...',
  buttonText: 'Search',
  disabled: false,
});

const emit = defineEmits<{
  search: [query: string];
}>();

const query = ref('');

const handleSearch = () => {
  emit('search', query.value);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
};
</script>

<template>
  <div class="flex gap-2 w-full">
    <div class="flex-1">
      <Input
        v-model="query"
        type="search"
        :placeholder="placeholder"
        :disabled="disabled"
        @keydown="handleKeydown"
      />
    </div>
    <Button :disabled="disabled || !query" @click="handleSearch">
      {{ buttonText }}
    </Button>
  </div>
</template>

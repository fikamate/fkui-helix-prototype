<script setup lang="ts">
import type { Slots } from 'vue'

import { FTextField } from '@fkui/vue'
import { useAttrs, useSlots } from 'vue'

import { type HxTextFieldProps } from './HxTextFieldProps'

const props = defineProps<HxTextFieldProps>()
const attrs = useAttrs()
const modelValue = defineModel<null | number | string>()
const slots: Slots = useSlots()

const passThroughProps = {
  ...attrs,
  ...props
}
</script>

<template>
  <FTextField
    v-bind="passThroughProps"
    v-model="modelValue"
  >
    <template
      v-for="(_, name) in slots"
      :key="name"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>

    <!-- Kombinera description och formatDescription i description-sloten -->
    <template
      v-if="description || formatDescription"
      #description
    >
      <div
        v-if="description"
        class="text-field__description"
      >
        {{ description }}
      </div>
      <div
        v-if="formatDescription"
        class="text-field__format-description"
      >
        {{ formatDescription }}
      </div>
    </template>
  </FTextField>
</template>

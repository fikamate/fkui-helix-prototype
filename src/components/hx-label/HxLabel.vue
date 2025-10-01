<script setup lang="ts">
import type { Slots } from 'vue'

import { FLabel } from '@fkui/vue'
import { useAttrs, useSlots } from 'vue'

import { type HxLabelProps } from './HxLabelProps'

const props = defineProps<HxLabelProps>()
const attrs = useAttrs()
const slots: Slots = useSlots()

const passThroughProps = {
  ...attrs,
  ...props
}
</script>

<template>
  <FLabel
    v-bind="passThroughProps"
    class="label"
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

    <!-- Standard slot content -->
    <slot />

    <!-- Kombinera description och formatDescription i description-sloten -->
    <template
      v-if="description || formatDescription"
      #description
    >
      <div
        v-if="description"
        class="label__description"
      >
        {{ description }}
      </div>
      <div
        v-if="formatDescription"
        class="label__description label__description--format"
      >
        {{ formatDescription }}
      </div>
    </template>
  </FLabel>
</template>

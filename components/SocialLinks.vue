<template>
  <div>
    <div class=" dark:text-gray-500 text-md">
      Checkout my other pages:
      <span v-for="(item, i) in items" :key="i" class="">
        <n-link :to="item.to" class="n-link" :aria-label="`Route to ${item.name}`">
          {{ item.name }}
        </n-link>
        {{ i !== items.length - 1 ? ' | ' : '' }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

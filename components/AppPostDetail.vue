<template>
  <article>
    <dl>
      <dt class="sr-only">
        Published on
      </dt>

      <dd class="font-medium text-gray-500 dark:text-gray-400">
        <time :datetime="post.createdAt">
          {{ $dayjs(post.createdAt).utc().format('MMMM D, YYYY') }}
        </time>
      </dd>
    </dl>
    <div class="space-y-5">
      <n-link :to="`/${post.slug}`" :aria-label="`Read - ${post.title}`">
        <h2
          class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
        >
          {{ post.title }}
        </h2>
      </n-link>
      <p class="font-light leading-7 text-gray-500 text-lg dark:text-gray-400">
        {{ post.description }}
      </p>

      <div class="mt-5">
        <n-link
          class="font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          :to="`/${post.slug}`"
          :aria-label="`Read - ${post.title}`"
        >
          Full Article →
        </n-link>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      requried: true,
      default: () => {},
    },
  },
}
</script>

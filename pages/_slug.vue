<template>
  <article class="divide-y divide-gray-300">
    <header class="mx-auto text-center pb-10">
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

      <h2
        class="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-200"
      >
        {{ post.title }}
      </h2>
    </header>

    <NuxtContent
      class="prose dark:prose-dark prose-lg mx-auto max-w-none mt-5"
      :document="post"
    />
  </article>
</template>

<script>
export default {
  async asyncData ({ $content, params, error }) {
    const post = await $content('posts')
      .where({ slug: params.slug })
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    if (post === undefined || post.length === 0)
      error({ statusCode: 404, message: 'Page not found' })

    return { post: post[0] }
  },
  head () {
    return {
      title: `${this.post.title} - `,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.description,
        },
        {
          hid: 'article:published_time',
          property: 'article:published_time',
          content: this.post.createdAt,
        },
        {
          hid: 'article:modified_time',
          property: 'article:modified_time',
          content: this.post.updatedAt,
        },
        {
          hid: 'article:url',
          property: 'article:url',
          content: `${this.$config.baseUrl}/${this.post.slug}`,
        },
        {
          hid: 'article:title',
          property: 'article:title',
          content: `${this.post.title} - Blog`,
        },
        {
          hid: 'article:description',
          property: 'article:description',
          content: this.post.description,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/${this.post.slug}`,
        },
      ],
    }
  },
}
</script>

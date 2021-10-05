const createSitemapRoutes = async () => {
  const routes = []
  const { $content } = require('@nuxt/content')
  const posts = await $content('posts').fetch()

  for (const post of posts)
    routes.push(`/${post.slug}`)

  const totalPosts = posts.length
  const lastPage = Math.ceil(totalPosts / process.env.PER_PAGE)

  for (let i = lastPage; i > 1; i--)
    routes.push(`/pages/${i}`)

  return routes
}

const siteUrl = process.env.BASE_URL || 'http://localhost:3000'

export default {
  target: 'static',

  publicRuntimeConfig: {
    baseUrl: siteUrl,
    perPage: process.env.PER_PAGE || '5',
  },

  head: {
    title: '',
    titleTemplate: '%s Blog',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Personal blog where I share my thoughts on various development topics I use everyday.',
      },
      {
        hid: 'base:image',
        property: 'base:image',
        content: `${siteUrl}/img/og-logo.png`,
      },
      { property: 'base:image:width', content: '1200' },
      { property: 'base:image:height', content: '627' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        hid: 'canonical',
        rel: 'canonical',
        href: siteUrl,
      },
    ],
  },

  css: [
    //
  ],

  plugins: [
    //
  ],

  components: [
    '@/components',
    '@/components/icons',
  ],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  colorMode: {
    classSuffix: '',
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/dayjs',
  ],

  dayjs: {
    plugins: [
      'utc',
      'relativeTime',
    ],
  },

  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },

  robots: [
    {
      UserAgent: '*',
      Allow: '/',
      Sitemap: `${siteUrl}/sitemap.xml`,
    },
  ],

  sitemap: {
    hostname: siteUrl,
    gzip: true,
    routes: createSitemapRoutes,
  },

  generate: {
    async routes () {
      return await createSitemapRoutes()
    },
  },

  build: {
    //
  },
}

<template>
  <div class="w-full dark:bg-gray-900">
    <div class="flex flex-col min-h-screen max-w-3xl mx-auto px-4 divide-y divide-gray-300 dark:divide-gray-400">
      <div class="pt-6 pb-4 text-center">
        <!-- PAGE HEADER -->
        <div class="flex items-center justify-center space-x-3 relative">
          <div class="absolute top-0 right-0">
            <app-dark-mode-toggle />
          </div>
          <n-link to="/" aria-label="Main page">
            <h1
              class="text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-100"
            >
              Tanner's Blog
            </h1>
          </n-link>
        </div>

        <p class="text-xs text-gray-500 mt-1 dark:text-gray-400">
          By: Tanner Campbell
        </p>

        <!-- QUICK NAV TOGGLES -->
        <nav class="mt-7">
          <ul class="flex items-center justify-center space-x-5">
            <li>
              <n-link to="/" class="n-link" aria-label="Home page">
                Blog
              </n-link>
            </li>
            <li>
              <n-link to="/about" class="n-link" aria-label="About page">
                About
              </n-link>
            </li>
          </ul>
        </nav>
      </div>

      <!-- DYNAMIC CONTENT -->
      <main class="flex-grow py-10">
        <Nuxt />
      </main>

      <!-- FOOTER -->
      <footer class="text-center py-5 text-gray-500 text-sm">
        <p>© {{ $dayjs().format('YYYY') }} Tanner Campbell</p>
      </footer>
    </div>
  </div>
</template>

<style lang="postcss">
.n-link {
  @apply text-purple-600 hover:text-purple-700 underline dark:text-purple-500 dark:hover:text-purple-400;
}
</style>

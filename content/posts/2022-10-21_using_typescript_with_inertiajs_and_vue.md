---
title: Integrating TypeScript with Inertia.js and Vue.js
description: How to setup and use TypeScript with Inertia.js and Vue.js
createdAt: 2022-10-21
updatedAt: 2022-10-21
slug: using_typescript_with_inertiajs_and_vue
---

## Integrating TypeScript with Inertia.js and Vue.js

Why use Typescript?

If you are like me and have been web projecting in Laravel using Inertia and Vue you might think adding Typescript is a bit of overkill and too much of a learning curve. Why add another layer of complexity?

But adding Typescript to your project can be a great way to add some structure to your code and make it easier to maintain. It can also help you catch bugs before they happen.

Luckily, Typescript plays nicely with Vue 3 and adding it to your Inertia/Vue project is pretty easy. In this post, I will show you how to add Typescript to your Inertia/Vue project and how to use it.

## Setup

Before getting started, you will need to have the following installed:

- Node.js
- Yarn/NPM/PNPM (I prefer Yarn which is what I will be using in this post)
- A new Laravel project with Inertia and Vue installed (You can use Jetstream if you want to make it super easy)

> Small note: If you are using VSCode, I highly recommend installing the Volar extension. It will make working with Typescript in Vue much easier.
> Here are the links to that extension:
> [Vue.volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
> [Vue.vscode-typescript-vue-plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)


... TODO

<!-- List of commands -->

```bash
laravel new ts-inertia-vue && cd ts-inertia-vue
```

```bash
composer require laravel/jetstream
```

```bash
php artisan jetstream:install inertia
```

```bash
touch tsconfig.json
```
```json
{
  "compilerOptions": {
      "target": "esnext",
      "module": "esnext",
      "moduleResolution": "node",
      "strict": true,
      "jsx": "preserve",
      "sourceMap": true,
      "resolveJsonModule": true,
      "esModuleInterop": true,
      "allowJs": true,
      "lib": [
          "esnext",
          "dom"
      ],
      "types": [
          "@types/node",
          "@types/ziggy-js"
      ],
      "paths": {
          "@/*": [
              "./resources/js/*",
          ]
      },
      "outDir": "./public/build/assets",
  },
  "typeRoots": [
      "./node_modules/@types",
      "resources/js/types"
  ],
  "include": [
      "resources/js/**/*.ts",
      "resources/js/**/*.d.ts",
      "resources/js/**/*.vue"
  ],
  "exclude": [
      "node_modules",
      "public"
  ]
}
```

```bash
yarn install
```

```bash
yarn add -D @types/lodash @types/node @types/ziggy-js typescript ziggy-js
```

```bash
mkdir resources/js/types && touch resources/js/types/vue-shim.d.ts
```

```typescript
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}
```

```bash
touch resources/js/types/inertia.d.ts
```

```typescript
import { PageProps } from '@inertiajs/inertia'

export {}
declare global {
    export namespace inertia {
        export interface Props extends PageProps {
            user: {
              id: number
              name: string
              email: string
              created_at: Date
              updated_at: Date
            }
            jetstream: {
              [key: string]: boolean
            }
            errorBags: unknown
            errors: unknown            
        }
    }
}

```

```bash
touch resources/js/Types/env.d.ts
```

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  // ... could include environment variables

  /** Stripe API Key */
  readonly VITE_STRIPE_API_KEY: string    
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```


Lets update the `resources/js/Pages/Welcome.vue`
  
```vue
<script lang="ts" setup>
import { PropType } from 'vue'
import route from 'ziggy-js'
import { Head, Link } from '@inertiajs/inertia-vue3';

defineProps({
    canLogin: Boolean as PropType<boolean>,
    canRegister: Boolean as PropType<boolean>,
    laravelVersion: String as PropType<string>,
    phpVersion: String as PropType<string>,
});
</script>

<template>
    <Head title="Welcome" />

    <div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
        <div v-if="canLogin" class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
            <Link v-if="($page.props as inertia.Props).user" :href="route('dashboard')" class="text-sm text-gray-700 dark:text-gray-500 underline">Dashboard</Link>

            <template v-else>
                <Link :href="route('login')" class="text-sm text-gray-700 dark:text-gray-500 underline">Log in</Link>

                <Link v-if="canRegister" :href="route('register')" class="ml-4 text-sm text-gray-700 dark:text-gray-500 underline">Register</Link>
            </template>
        </div>
        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
            <div class="flex justify-center mt-4 sm:items-center sm:justify-between">
                <div class="ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0">
                    Laravel v{{ laravelVersion }} (PHP v{{ phpVersion }})
                </div>
            </div>
        </div>
    </div>
</template>
```

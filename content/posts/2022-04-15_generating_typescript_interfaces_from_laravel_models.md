---
title: Generating TypeScript Interfaces & Types from Laravel Models
description: How to easily generate TypeScript interfaces and types based off your Laravel models.
createdAt: 2022-04-15
updatedAt: 2022-04-15
slug: generating_typescript_interfaces_from_laravel_models
---

In most of the Laravel applications I work in, I primarily use Laravel as just an API and I have a separate front-end built with something like Vue, Nuxt, Next to handle all the client side. Recently I have also been using TypeScript within each one of these. I like to keep most of the intensive business logic within the Laravel application, but this sometimes would leave an issue for my client side application. Often when I made changes to a database table, or added some new attributes and relationships to my models, my front-end was last to be kept informed of these updates. Which left a lot of sloppy logic and unnecessary checks to see if data exists. With TypeScript we can be a little more strict on the structure of our data objects using types and interfaces. But that can be a lot to maintain, keeping both of your Laravel models updated and keeping your TypeScript interfaces in sync with those changes. Luckily there is a package to a solution for this!

To start off we can add a new package into your Laravel application

```bash
composer require --dev fumeapp/modeltyper
```

Once this packages has been successfully instead you will now have access to a new artisan command `php artisan model:typer` which will scan your model files and build a TypeScript interface for each one.

Say you have a Model `app/Users/Models` you will get an output like:
```ts
export interface User {
  // columns
  id: number
  email: string
  name: string
  created_at?: Date
  updated_at?: Date
  // mutators
  first_name: string
  initials: string
  // relations
  teams: Teams
}
export type Users = Array<User>
```

Once you run this command you can pipe the output to a file and use in your front-end to keep everything in sync.
```bash
php artisan model:typer > types/index.d.ts
```

You may also export some additional properties to these interfaces like `enum` casts, model attributes, and relationships. Check out the [Docs](https://github.com/fumeapp/modeltyper#readme) and see what more you can do!

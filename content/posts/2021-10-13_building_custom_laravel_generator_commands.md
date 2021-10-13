---
title: Building our own custom Laravel generator commands
description: How to setup your own Laravel "make" generator commands.
createdAt: 2021-10-13
updatedAt: 2021-10-13
slug: building_custom_laravel_generator_commands
---

The Laravel framework comes with some very efficient tools via artisan for quickly scaffolding out new files and classes. This can very useful for making models and building them with default Factories, Seeders, and Migration files all within a single command.

```bash
$ php artisan make:model Podcast -f -s -m
```

However, that is the default Laravel can build... What if you want to create other files that are not within the artisan command scope?

Well you can create customize Laravel artisan commands that extend the `GeneratorCommand` class and build out what you need!

First thing is to set up a `stub` folder, which is common across your existing Laravel application. You might see if you run:

```bash
$ php artisan stub:publish
```

Which will copy all the default Laravel stub files allow you to make additional customizations.

So lets setup that up. By creating a folder called `stubs` which will be an easy place to store all of our custom generator template files.

```bash
$ mkdir stubs
```

Next let's create and edit a very simple file that we'd like artisan to quickly build out for us.

```bash
$ touch stubs/service.stub
```

And fill with the following content:

```txt
<?php

namespace App\Services;

class {{service_name}}
{
    // Build out service class
}

```

Take notice of `{{service_name}}` which might resemble some FE/JS templating languages like blade and vue, but this is for doing a string replace later on.

Now lets create a new file within our `app/Console/Commands` directory:

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;

class MakeService extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new Service.';

    protected $type = 'Service';

    protected function getStub()
    {
        return base_path('stubs/service.stub');
    }

    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace . '\Services';
    }

    protected function replaceClass($stub, $name)
    {
        $class = str_replace($this->getNamespace($name) . '\\', '', $name);

        // Do string replacement
        return str_replace('{{service_name}}', $class, $stub);
    }
}

```

This file will extend the `GeneratorCommand` class that exists with Laravel allowing to use some existing methods to make creating files from stubs very simple.

With your command created its very simple to use `artisan` just as efficiently to build Service classes out!

```bash
$ php artisan make:service PodcastService
```

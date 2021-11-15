---
title: Mocking External API Requests in Laravel
description: How to mock "fake" external API requests in Laravel in both PHPUnit and Pest tests.
createdAt: 2021-11-15
updatedAt: 2021-11-15
slug: mocking_external_api_requests_in_laravel
---

When writing either PHPUnit or Pest tests you can run into the scenario where you need to test your application making some 3rd party API requests. Your application could for example be pulling in news feeds, or list of movies from an external API. As this is most likely an important part of your app its best practice to write test cases for this. Often these test suites (PHPUnit, or Pest) are connected to some type of pre-deployment pipeline i.e. GitHub Action's. So its important for a number of reasons these API tests don't make actual external calls out to these API's, as you could be getting billed by the usage of them, or cause your pipeline to fail/run for to long.

Luckily there is a solution to this, where you can mock "fake" the request and return an predefined response as it would come from the API provider itself.


First lets create our example endpoint in our `routes/api.php` that when hit will make the external request out to the API. 
```php [routes/api.php]
Route::get('/example', ExampleController::class);
```

Next lets setup the controller method to handle when we hit the `/api/example` route of the application:

```php [app/Http/Controllers/ExampleController.php]
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ExampleController extends Controller
{
  public function __invoke(Request $request)
  {
    // Here just using the built in Laravel HTTP Client
    $response = Http::get('http://dummy.restapiexample.com/api/v1/employee/1');

    if ($response->successful()) {
      return response()->json($response->json()['data'], $response->status())
    }

    return response()->json([
      'data' => null,
      'message' => 'Failed',
    ], 500);
  }
}
```

Finally lets build our test case:

```php [tests/Feature/ExampleControllerTest.php]
use Illuminate\Support\Facades\Http;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class ExampleControllerTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
    }

    public function testExampleEndpoint()
    {
        // Here we can use the same HTTP Facade to "catch" the request to the external endpoint and return our own "mocked" response
        Http::fake([
            'http://dummy.restapiexample.com/api/v1/*' => Http::response([
                'data' => [
                    'id' => 1,
                    'employee_name' => 'Tiger Nixon',
                    'employee_salary' => 320800,
                    'employee_age' => 61,
                ],
            ], 200)
        ]);

        // Now we can make our assertions that the endpoint will provide us with the data we expect
        $this->json('get', '/api/example')
            ->assertOk()
            ->assertJson(fn(AssertableJson $json) =>
                $json->has('data', fn($json) =>
                        $json->has('id')
                            ->where('employee_name', 'Tiger Nixon')
                            ->where('employee_salary', 320800)
                            ->where('employee_age', 61)
                            ->etc()));
    }
}
```
### TL;DR

To summarize using Laravel's built in [HTTP Client](https://laravel.com/docs/8.x/http-client#faking-responses) we can easily mock external API requests still keeping feature tests accurate without the effect of actually making external API requests.

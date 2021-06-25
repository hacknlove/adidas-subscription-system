<a name="top"></a>
# subscription v1.0.0

Documentation for the subscription service of the adidas subscription system

# Table of contents

- [Subscription](#Subscription)
  - [Get all subscriptions](#Get-all-subscriptions)
  - [Get subscriptions for one newsletter](#Get-subscriptions-for-one-newsletter)

___


# <a name='Subscription'></a> Subscription

## <a name='Get-all-subscriptions'></a> Get all subscriptions
[Back to top](#top)

<p>Returns an array with all the subscriptions</p> <p>The result is cached for CACHE_EXPIRY_MS miliseconds Request to mongo are throttled by REVALIDATE_CACHE_MS milliseconds</p>

```
GET /all
```

## <a name='Get-subscriptions-for-one-newsletter'></a> Get subscriptions for one newsletter
[Back to top](#top)

<p>Returns an array with the subscriptions of the expecified newsletter</p> <p>The result is cached for CACHE_EXPIRY_MS miliseconds Request to mongo are throttled by REVALIDATE_CACHE_MS milliseconds</p>

```
GET /[newsletterId]
```

### Parameters - `path`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| newsletterId | `ObjectId` | <p>Id of the newsletter</p> |


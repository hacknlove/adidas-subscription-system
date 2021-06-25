<a name="top"></a>
# private-api v1.0.0

Documentation for the private api of the adidas subscription system

# Table of contents

- [Subscription](#Subscription)
  - [Get all subscriptions](#Get-all-subscriptions)
  - [Get subscription details](#Get-subscription-details)
  - [Get subscriptions for one newsletter](#Get-subscriptions-for-one-newsletter)

___


# <a name='Subscription'></a> Subscription

## <a name='Get-all-subscriptions'></a> Get all subscriptions
[Back to top](#top)

<p>Returns an array with all the subscriptions</p>

```
GET /all
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | **optional**<p>&quot;bearer &quot; + authentication token.</p> <p>Alternatively a cookie named jwt or query parameter named jwt can be used to send the authentication token at your convenience.</p> |

## <a name='Get-subscription-details'></a> Get subscription details
[Back to top](#top)

<p>Returns the details of the subscription</p>

```
GET /[newsletterId]/[email]
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | **optional**<p>&quot;bearer &quot; + authentication token.</p> <p>Alternatively a cookie named jwt or query parameter named jwt can be used to send the authentication token at your convenience.</p> |

### Parameters - `path`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| newsletterId | `ObjectId` | <p>Id of the newsletter</p> |
| email | `string` | <p>email to operate with</p> |

## <a name='Get-subscriptions-for-one-newsletter'></a> Get subscriptions for one newsletter
[Back to top](#top)

<p>Returns an array with the subscriptions of the expecified newsletter</p>

```
GET /[newsletterId]
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | **optional**<p>&quot;bearer &quot; + authentication token.</p> <p>Alternatively a cookie named jwt or query parameter named jwt can be used to send the authentication token at your convenience.</p> |

### Parameters - `path`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| newsletterId | `ObjectId` | <p>Id of the newsletter</p> |


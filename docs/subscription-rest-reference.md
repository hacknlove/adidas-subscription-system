<a name="top"></a>
# subscription v1.0.0

Documentation for the subscription service of the adidas subscription system

# Table of contents

- [Subscription](#Subscription)
  - [Get all subscriptions](#Get-all-subscriptions)
  - [Get subscriptions for one newsletter](#Get-subscriptions-for-one-newsletter)
  - [New Subscription](#New-Subscription)

___


# <a name='Subscription'></a> Subscription

## <a name='Get-all-subscriptions'></a> Get all subscriptions
[Back to top](#top)

<p>Returns an array with all the subscriptions</p>

```
GET /all
```

## <a name='Get-subscriptions-for-one-newsletter'></a> Get subscriptions for one newsletter
[Back to top](#top)

<p>Returns an array with the subscriptions of the expecified newsletter</p>

```
GET /[newsletterId]
```

### Parameters - `path`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| newsletterId | `ObjectId` | <p>Id of the newsletter</p> |

## <a name='New-Subscription'></a> New Subscription
[Back to top](#top)

<p>It $addToSet the newsletterId to the subscription, upserting if needed</p>

```
POST /[newsletterId]/[email]
```

### Parameters - `body`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| firstName | `string` | <p>First name of the user</p> |
| gender | `string` | <p>Gender of the user</p> <ul> <li><code>&quot;M&quot;</code> -&gt; male</li> <li><code>&quot;F&quot;</code> -&gt; female</li> <li><code>&quot;X&quot;</code> -&gt; other</li> </ul> |
| birthDate | `string` | <p>birth date of the user</p> <p>Any string that can be parsed by <code>new Date(birthDate)</code> will work</p> |
| consent | `boolen` | **optional** <p>Does the user consent? Only <code>true</code> is accepted</p> |

### Parameters - `path`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| newsletterId | `ObjectId` | <p>Id of the newsletter</p> |
| email | `string` | <p>email to operate with</p> |


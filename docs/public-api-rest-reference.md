<a name="top"></a>
# public-api v1.0.0

Documentation for the public api of the adidas subscription system

# Table of contents

- [Subscription](#Subscription)
  - [Cancel Subscriptiption](#Cancel-Subscriptiption)
  - [New Subscription](#New-Subscription)

___


# <a name='Subscription'></a> Subscription

## <a name='Cancel-Subscriptiption'></a> Cancel Subscriptiption
[Back to top](#top)

<p>It checks the permisions, validate the parameters, and cancels a subscription</p>

```
DELETE /[newsletterId]/[email]/[token]
```

### Parameters - `path`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| newsletterId | `ObjectId` | <p>Id of the newsletter</p> |
| email | `string` | <p>email to operate with</p> |
| token | `String` | <p>authentication token.</p> |

## <a name='New-Subscription'></a> New Subscription
[Back to top](#top)

<p>It checks the permissions, validates the parameters, and sends a request to the subscription service and pipes the response back</p>

```
POST /[newsletterId]/[email]/[token]
```

### Parameters - `body`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| firstName | `string` | **optional** <p>First name of the user</p> |
| gender | `string` | **optional** <p>Gender of the user</p> <ul> <li><code>&quot;M&quot;</code> -&gt; male</li> <li><code>&quot;F&quot;</code> -&gt; female</li> <li><code>&quot;X&quot;</code> -&gt; other</li> </ul> |
| birthDate | `string` | <p>birth date of the user</p> <p>Any string that can be parsed by <code>new Date(birthDate)</code> will work</p> |

### Parameters - `path`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| newsletterId | `ObjectId` | <p>Id of the newsletter</p> |
| email | `string` | <p>email to operate with</p> |
| token | `String` | <p>authentication token.</p> |


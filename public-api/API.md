<a name="top"></a>
# public-api v1.0.0

Documentation for the public api of the adidas subscription system

# Table of contents

- [Subscription](#Subscription)
  - [Cancel Subscriptiption](#Cancel-Subscriptiption)
  - [New Subscription](#New-Subscription)
  - [Verify Email](#Verify-Email)

___


# <a name='Subscription'></a> Subscription

## <a name='Cancel-Subscriptiption'></a> Cancel Subscriptiption
[Back to top](#top)

<p>It checks the permisions, validate the parameters, and send a request to the subscription service and pipes the response back</p>

```
DELETE /[newsletterId]/[email]
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

## <a name='New-Subscription'></a> New Subscription
[Back to top](#top)

<p>It checks the permisions, validate the parameters, and send a request to the subscription service and pipes the response back</p>

```
POST /[newsletterId]/[email]
```

### Parameters - `body`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| firstName | `string` | **optional** <p>First name of the user</p> |
| gender | `string` | **optional** <p>Gender of the user</p> <ul> <li><code>&quot;M&quot;</code> -&gt; male</li> <li><code>&quot;F&quot;</code> -&gt; female</li> <li><code>&quot;X&quot;</code> -&gt; other</li> </ul> |
| birthDate | `string` | <p>birth date of the user</p> <p>Any string that can be parsed by <code>new Date(birthDate)</code> will work</p> |
| consent | `boolen` | **optional** <p>Does the user consent? Only <code>true</code> is accepted</p> |

### Parameters - `path`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| newsletterId | `ObjectId` | <p>Id of the newsletter</p> |
| email | `string` | <p>email to operate with</p> |

## <a name='Verify-Email'></a> Verify Email
[Back to top](#top)

<p>This is the url that is linked on the verification email that is sent to every user to verify his email address</p>

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


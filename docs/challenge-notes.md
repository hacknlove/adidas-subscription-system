# Challenge notes

## DX statment

I have tried with this project, not just to fulfill the coding challenge requeriments, but also to make a statement about how I envision DX:

* Information should be handy and abundant. People should be able to find any information easily. 
* Simple things are easier to read and to maintain.
* Prepare for the future without overengineering the present.
* The developers that are going to consume and use our services and libraries are our users too (sort of). We should care about the value we provide them, meaning also their development experience. We should aim to make them happier, this more productive.

## Kafka

I have never used kafka. I would never dare to use it in production like this.

I just though it was the right tool for the task, and I supposed in a real scenario this would be a team effort, and I guess the team would have someone that could make it production ready.

## kubernetes

I have never deployed with kubernetes, and I did not feel capable of doing anything that I would like to show.


## CD/CI pipeline

I like the CD/CI to be image-centric instead of code-centric

The repository is meant to deal with code, it's for the developers to work, to communicate, and even to break sometimes.

So, the CD/CI should not be triggered by a `git push` but by a `docker push`

Let say a developer has something he wants to be QAed.

He runs 
```
yarn build
```

and a docker image is built and pushed with a tag equals to branch-commit-ready-to-QA, and it's deployed in a testing environment where it will be QAed

If the QA finds no bugs, the image is retagged as branch-commit-ready-to deploy

When we want to deploy it, we don't need to run any pipeline that starts cloning the repo, we can just deploy the image we have, the very same image that is tested and approved.

In order to deploy, we just retagg the image as latest

We can keep last images, for the case we need to rollback quick.

## public and private

I have breaked PUBLIC SERVICE in two, public-api and private-api, because the public-api endpoints need to be accesible from outsiders, but the private-api endpoints can only be accessed by adidas' user-admins, so we can add an extra security layer to protect this senstive data (users' emails, names, genders, and birth dates) from being leacked by some hacker exploiting a zero day vulnerability on jwt, for instance.  

## subscription system completion

I would make another service to manage newsletters, (CRUD + sending emails to the subscribers)

## Regarding high availability

For these kind of services I asume that most of the time they don't deal with high volume of requests, but could have huge spikes when a new marketing action is performed.

I think serverless could decrease the costs (most of the time they will be idle) while matching better the architecture principles.

At least, it's something we should try.

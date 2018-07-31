# Vue-Serverless

Vue-Serverless is a skeleton Vue application that uses Amazon's S3, Cognito, API Gateway, Lambda, and DynamoDB. to create a completely serverless app with user sign-up, login, and document saving. It's ready for you to build on top of.



The architecture of the app looks like the following.

IMAGE

You'll have to copy and paste some things from the repo into your AWS account following the steps below, but you should have a live, server less app up and running without writing any code.

This app uses the following packages

- vue
- vue-auth-cognito
- vue-resource
- vue-router
- vue-simple-spinner

Apart from that, it's just a simple  

```vue create vue-serverless-app```

We're going to create an app that allows users to sign-up with email verification, login, logout, reset and change their password, and create, edit, and delete a relatively simple model in the database.

When I first did this figuring out this stuff was the hardest (Most annoying) part, so this should allow you to skip to the fun part of actually writing meaningful code. 

## Steps to get it running

Ok, there's quite a bit here, you'll have to login into AWS and add a lot, but all the code you need is provided. 

1. Checkout this repo locally
2. Navigate to the repo
3. Run ```npm i```
4. 




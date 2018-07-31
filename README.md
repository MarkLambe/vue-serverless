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
- vue-material-design-icons
- vue-js-popover

Apart from that, it's just a simple  

```vue create vue-serverless-app```

We're going to create a responsive app that allows users to sign-up with email verification, login, logout, reset and change their password, and create, edit, and delete a relatively simple model in the database. Again, you won't have to write any code to get this working, but there will be a fuck-tonne of copy-pasting.

When I first did this figuring out this stuff was the hardest (Most annoying) part, so this should allow you to skip to the fun part of actually writing meaningful code. 

There's a couple of places where we're going to do simple things (Like password requirements) because once everything's working you can go back and make them more complex.

## Steps to get it running

### The Basics

Ok, there's quite a bit here, you'll have to login into AWS and add a lot, but all the code you need is provided. 

1. Checkout this repo locally
2. Navigate to the repo
3. Run ```npm i```
4. Ok, if you run ```npm run serve``` and navigate to ```http://localhost:8080/``` you should now get an app being served. Here's where the fun starts.

### Cognito

1. Log into the AWS Console and in 'Services' open 'Cognito'
2. Click 'Manage User Pools'
3. Click 'Create a user pool' (Note which AWS region you're in, I used EU West (Ireland))
4. I called mine aws-serverless-up (up -> user pool) for this example
5. Click 'Review Defaults'
6. In Attributes, Select 'email address or phone number', and then 'Allow email addresses'
7. In 'Which standard attributes do you want to require?' uncheck email, since we'l' be sending the email as a username.
8. Move to policies and set a minimum length of 12, we'll leave it at that for now, uncheck the other password strength boxes.
9. Make sure 'Allow users to sign themselves up' is checked
10. Click on 'App Clients' and 'Add an app client', I named mine aws-serverless-client, uncheck 'Generate Client Secret Key' and click 'Create App Client'
11. Skip to review and click 'Create'
12. We have a user pool!
13. Copy the app client ID (In App Clients on the left) into your Vue app in config/cognito.js, then navigate back to General Settings in cognito and copy your pool id into the same config file, as well as the AWS region you're using (list here). Finally, into IdentityPoolId copy everything _after_ arn:aws:cognito-idp: in the Pool ARN. Your config/cognito.js should now have all four elements filled out.
14. Go back to Users and Groups in AWS Cognito. Now go to your local app and create a user, make sure you use your real email address and a 12-or-more character password.
15. Check your inbox! The App should redirect you to a page to enter the 6-digit code waiting for you and once you enter that you should be prompted to log in.
16. You can also try the reset password functionality on the login page and it should work just fine.

### DynamoDB

Well that's awesome! But there's no point in having users if they can't create things, so let's set up a database!

1. Back in the AWS Console, click on 'Services' again and this time go to DynamoDB. (For some reason there's no link from cognito to 'Services' so you have to open the AWS console from scratch again)
2. Click on 'Tables' and 'Create Table', I named mine aws-serverless-table and the Primary Key 'user_id', apart from that leave 'Use default settings' checked and click create.

Ok let's talk for a second about what we're going to store. Here's the object we'll put in the DB for each user, we're just creating one per user, and it's a profile that is uniquely identified by the user's (AWS Cognito) unique ID.

```json
{
    "user_id": "ABCD",
    "username": "Mark Lambe",
    "user_best_skill": "No one knows"
}
```



Ok, so now we want to create a profile every time a new user is created. We'll do this by creating a lambda function, and setting a Cognito trigger to call that Lambda function on user creation. This is actually pretty easy. First though, we need to create an IAM role that we can use to access the database from lambda.

### IAM

1. In the AWS Console, go to 'Services' and 'IAM'
2. Click 'Roles', and 'Create Role', the type is 'AWS service' and the service that will use this role is Lambda
3. Click 'Next: Permission' and search for 'AmazonDynamoDBFullAccess', check the box beside it and click 'Next: Review', give your role a name, I went with 'lambda_db_role'



### Lambda

1. In the AWS Console, go to 'Services' and 'Lambda'
2. Click 'Create Function', and choose Node 8.10, I named it (unsurprisingly) serverless_user_created
3. Under Role, choose 'use an existing role', and then the role we just created, 'lambda_db_role', or whatever you called it.
4. Create the function
5. Copy the contents of aws/lambda/serverless_user_created.js into the function and save it.

### Cognito 

1. Quickly jump back to Cognito ('Services' -> 'Cognito'), open your user pool and go to 'Triggers', for the 'Post confirmation' trigger add our new function serverless_user_created. Then go to Users and Groups, we should see out user there, so open them up, disable them, and then delete them.

   

### DynamoDB

1. Go back to our app and sign up again, but this time navigate to DynamoDB in the AWS console ('Services' -> 'DynamoDB') and open out table
2. Click the 'Items' tab are you should see our brand new profile!.


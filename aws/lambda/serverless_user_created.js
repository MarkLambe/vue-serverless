const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

exports.handler = async (event, context, callback) => {
    let tableName = "aws-serverless-table";

    let item = {
        "user_id": event.userName,
        "signup_date": new Date().toString(),
        "notes": [{created_date: new Date().toString(), text: "Note: Today I joined this website!"}]
    };
    await dynamo.putItem({"TableName": tableName, "Item": item}).promise();
    callback(null, event);
};

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

exports.handler = async (event, context, callback) => {
    let tableName = "user_cvs";

    let item = {
        "user_id": event.userName,
        "username": "",
        "user_best_skill": ""
    };
    await dynamo.putItem({"TableName": tableName, "Item": item}).promise();
    callback(null, event);
};

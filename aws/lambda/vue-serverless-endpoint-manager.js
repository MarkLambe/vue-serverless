console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();


/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - tableName: required for operations that interact with DynamoDB
 *   - payload: a parameter to pass to the operation being performed
 */
exports.handler = async (event) => {
    let tableName = "aws-serverless-table";

    const operation = event.operation;
    let payload = {};
    payload.TableName = tableName;
    if(operation === 'create'){
        payload.Item = event.payload;
        payload.ReturnValues = "ALL_OLD";
    }
    else if(operation === 'read' || operation === 'delete'){
        payload.Key = event.key;
    }
    if(operation === 'update'){
        payload.Item = event.payload;
        payload.ConditionExpression = "user_id <> :u";
        payload.ExpressionAttributeValues = {
            ":u": {"S": payload.Item.user_id}
        };
    }

    switch (operation) {
        case 'create':
            await dynamo.putItem(payload).promise();
            return await dynamo.getItem({'Key': event.key, 'TableName': tableName}).promise();
        case 'read':
            return await dynamo.getItem(payload).promise();
        case 'update':
            await dynamo.putItem(payload).promise();
            return await dynamo.getItem({'Key': event.key, 'TableName': tableName}).promise();
        case 'delete':
            return await dynamo.deleteItem(payload).promise();
        case 'list':
            return await dynamo.scan(payload).promise();
        case 'echo':
            return payload;
        case 'ping':
            return 'pong';
        default:
            throw new Error(`Unrecognized operation "${operation}"`);
    }
};

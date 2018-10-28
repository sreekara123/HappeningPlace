const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'us-east-1',apiVersion:'2012-08-10'});
exports.handler = (event, context, callback) => {
    // TODO implement
    
    var params1 = {
        TableName : "Event",
        Key: {
            EventID: {
                S: event.event_id
            }
        }
    };

    dynamodb.getItem(params1,function(err,data1){
        if(err)
        {
            callback("Failed to get Item");
        }
        else
        {
            //callback(null,data1.Item.guest_list.SS);
            //console.log(data1.Item.contributors.SS);
            (data1.Item.guest_list.SS).forEach(function(_element){
                var aws=require('aws-sdk');
                var lambda=new aws.Lambda({
                    region: 'us-east-1'
                });

                var temp_param={
                    username: _element,
                    eventID:  data1.Item.eventID.S
                };
                var params2={
                    FunctionName: 'removeEventService',
                    Payload: JSON.stringify(temp_param,null,2)
                };
                
                lambda.invoke(params2,function(err1,data2){
                   
                    if(err1){
                        
                        context.done('error_invoke_error',err1);
                    }
                    /*
                    else if(data2.Payload){
                        //console.log(data2.Payload);
                        context.succeed(data2.Payload);
                    }
                    */
                    else
                    {
                        callback("Success in invoking");
                    }
                });
                //console.log("Test_12_3");
                //console.log(_element);
            });
        }
        
        
    });

};


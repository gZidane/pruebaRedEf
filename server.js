const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const api = express();


api.set("port", process.env.PORT || 4000);

api.use(cors({origin: '*'}));
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true}));

api.use(express.json());

//api.use(checkSession);

api.get("/", function(req, res)
{
  res.json(
    {
      status: "OK",
      message: "API running OK"
    })
});


api.post("/snstest", function(req, res)
{
    console.log(req.body);

    let payload = req.body.payload;

//     let payload =
//     {
//   Records: [
//     {
//       EventSource: "aws:sns",
//       EventVersion: "1.0",
//       EventSubscriptionArn: "arn:aws:sns:us-east-1:{{{accountId}}}:ExampleTopic",
//       Sns: {
//         Type: "Notification",
//         MessageId: "95df01b4-ee98-5cb9-9903-4c221d41eb5e",
//         TopicArn: "arn:aws:sns:us-east-1:123456789012:ExampleTopic",
//         Subject: "example subject",
//         Message: "example message",
//         Timestamp: "1970-01-01T00:00:00.000Z",
//         SignatureVersion: "1",
//         Signature: "EXAMPLE",
//         SigningCertUrl: "EXAMPLE",
//         UnsubscribeUrl: "EXAMPLE",
//         MessageAttributes: {
//           InstanceId: {
//             Type: "String",
//             Value: "dddddddd-b64e-40c5-921b-109fd92499ae"
//           },
//           TestBinary: {
//             Type: "Binary",
//             Value: "TestBinary"
//           }
//         }
//       }
//     }
//   ]
// }

console.log(payload);

    // Send a POST request
    axios(
    {
        method: 'post',
        url: 'https://p78e72u93e.execute-api.us-east-1.amazonaws.com/Test/snstest',
        data: payload
    })
    .then(function (response)
    {
        console.log(response.data);

        res.json(response.data);
    })
    .catch(err =>
    {
        console.log('Error: ', err);

        res.json(
            {
                status: "Error",
                message: "An error ocurred"
            })
    });


});

// Poner a escuchar las peticiones al servidor mediante un puerto
api.listen(api.get("port"),()=>
{
    console.log(`API listening on port: ${api.get('port')}`);
});

---
title: List Object By Bucket Name
order: 6
---
# List Object By Bucket Name
Metadata provides the enhanced api to get all the objects' information under a specific bucket name.
Select a bucket name as the query input and send ListObjectsByBucketName message, then user can get
all the available objects' information from chain.

## Gateway
* Receives the Metadata request from the client.
* Checks whether the input value is in the correct format, e.g. bucket name matches the corresponding format
* Dispatches the request to Metadata.

## Metadata
* Receives the Metadata request from the Gateway.
* Checks whether the request has permission to read object information according to the type of visibility
* Returns all object responses to the Gateway service.
    * Retrieves all object information from the BS DB.
    * Converts the data format inside BSDB to the response type of the corresponding interface
* Provides additional extensions such as Sort Key, and filtering. etc.

### ListObjectsByBucketName Message
```protobuf
// ListObjectsByBucketNameRequest is request type for the ListObjectsByBucketName RPC method
message ListObjectsByBucketNameRequest {
  // bucket_name is the name of the bucket
  string bucket_name = 1;
  // account_id is the account address of user
  string account_id = 2;
}

// ListObjectsByBucketNameResponse is response type for the ListObjectsByBucketName RPC method.
message ListObjectsByBucketNameResponse {
  // objects defines the list of object
  repeated Object objects = 1;
}
```

Below is the schema of `Object`:
```protobuf
// Object is the structure for user object
message Object {
  // object_info defines the information of the object.
  bnbchain.greenfield.storage.ObjectInfo object_info = 1;
  // locked_balance defines locked balance of object
  string locked_balance = 2;
  // removed defines the object is deleted or not
  bool removed = 3;
}
```
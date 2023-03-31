---
title: Get User Buckets
order: 5
---
# Get User Buckets
Metadata provides the enhanced api to get all the buckets' information a specific user account.
Select a user address as the query input and send GetUserBuckets message, then user can get 
all the available buckets' information from chain.

## Gateway
* Receives the Metadata request from the client.
* Checks whether the input value is in the correct format, e.g. account address matches the corresponding format
* Dispatches the request to Metadata.

## Metadata
* Receives the Metadata request from the Gateway.
* Checks whether the request has permission to read bucket information according to the type of visibility
* Returns all bucket responses to the Gateway service.
    * Retrieves all bucket information from the BS DB.
    * Converts the data format inside BSDB to the response type of the corresponding interface
* Provides additional extensions such as Sort Key, and filtering. etc.

### GetUserBuckets Message
```protobuf
// GetUserBucketsRequest is request type for the GetUserBuckets RPC method.
message GetUserBucketsRequest {
  // account_id is the account address of user
  string account_id = 1;
}

// GetUserBucketsResponse is response type for the GetUserBuckets RPC method.
message GetUserBucketsResponse {
  // buckets defines the list of bucket
  repeated Bucket buckets = 1;
}
```

Below is the schema of `Bucket`:
```protobuf
// Bucket is the structure for user bucket
message Bucket {
  // bucket_info defines the information of the bucket.
  bnbchain.greenfield.storage.BucketInfo bucket_info = 1;
  // removed defines the bucket is deleted or not
  bool removed = 2;
}
```
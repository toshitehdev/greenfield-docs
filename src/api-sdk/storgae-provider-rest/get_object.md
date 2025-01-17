---
title: Get Object
order: 3
---

# GetObject

## RESTful API Description

This API is used to download an object from Greenfield SP.

## HTTP Request Format

| Desscription | Definition                                |
| ------------ | ----------------------------------------- |
| Host         | BucketName.gnfd-testnet-sp-1.bnbchain.org |
| Path         | /ObjectName                               |
| Method       | GET                                       |

You should set `BucketName` in url host to download an object.

## HTTP Request Header

| ParameterName | Type   | Required | Description                                                                                   |
| ------------- | ------ | -------- | --------------------------------------------------------------------------------------------- |
| Authorization | string | yes      | The authorization string of the HTTP request.                                                 |
| Range         | string | yes      | The Range HTTP request header indicates the part of a document that the server should return. |

## HTTP Request Parameter

### Path Parameter

The request does not have a path parameter.

### Query Parameter

The request does not have a query parameter.

### Request Body

The request does not have a request body.

## Request Syntax

```shell
GET /ObjectName HTTP/1.1
Host: BucketName.gnfd-testnet-sp-*.bnbchain.org
Authorization: Authorization
Range: Range
```

## HTTP Response Header

| ParameterName     | Type   | Description                            |
| ----------------- | ------ | -------------------------------------- |
| X-Gnfd-Request-ID | string | defines trace id, trace request in sp. |

## HTTP Response Parameter

### Response Body

If the request is successful, the service sends back an HTTP 200 response.

If you failed to send request to get approval, you will get error response body in [XML](./common/error.md#sp-error-response-parameter).

## Response Syntax

```shell
HTTP/1.1 200
X-Gnfd-Request-ID: RequestID

Body
```

## Examples

### Example 1: Download an object

```shell
GET /my-image.jpg HTTP/1.1
Host: myBucket.gnfd-testnet-sp-*.bnbchain.org
Date: Fri, 31 March 2023 17:32:00 GMT
Authorization: authorization string
```

### Sample Response: Download an object successfully

```shell
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT
Last-Modified: Fri, 31 March 2023 17:32:10 GMT
ETag: "1b2cf535f27731c974343645a3985328"
Content-Length: 11434

[11434 bytes of object data]
```

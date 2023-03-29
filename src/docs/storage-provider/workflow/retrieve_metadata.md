---
title: Challenge Object Data
order: 5
---
# Retrieve Metadata
Retrieve service is to supply better query service for the Inscription network. Users can interact with SP for some complex query services.
Some interfaces can be costly to implement on the chain or can cause significant latency.
metadata service is designed to implement the corresponding interface under the chain and provide it to the SP to achieve high performance and low latency.
The events' data are optimally stored by the block syncer and provided to the metadata.

## Gateway
* Receives the Metadata request from the client.
* Checks whether the input value is in the correct format, e.g., bucket name/account id matches the corresponding format
* Dispatches the request to Metadata.

## Metadata
* Receives the Metadata request from the Gateway.
* Checks whether the request has permission to read object/bucket information according to the type of visibility
* Returns all object/bucket/payment responses to the Gateway service.
  * Retrieves all object/bucket/payment information from the BS DB.
  * Converts the data format inside BSDB to the response type of the corresponding interface
* Provides additional extensions such as Pagination, Sort Key, and filtering. etc.
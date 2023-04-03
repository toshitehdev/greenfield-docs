---
title: Primitive Interfaces
order: 3
---

# Primitive Interfaces

This document provides an overview of the core components of the dApp SDK, designed to facilitate the development of community-driven projects. The SDK is organized into four primary parts: BaseApp, BucketApp, ObjectApp, and GroupApp. These components serve as the building blocks for developers, enabling them to create and manage a variety of cross-chain resources.

## Overview

The BaseApp serves as the foundation for the other three components, providing common functions required by the BucketApp, ObjectApp, and GroupApp. The BucketApp is responsible for managing bucket-related operations, while the ObjectApp handles object-related actions. The GroupApp, being the most complex of the four, is designed to handle group-related operations. Each of these components is equipped with unique functions and virtual functions that require implementation to suit specific project needs.

## Components

1. **BaseApp:** Contains common functions used by the other components, as well as three virtual functions that need to be implemented for specific project requirements.
2. **BucketApp:** A specialized module designed to handle bucket-related operations, such as creating and deleting buckets, and processing bucket resource calls.
3. **ObjectApp:** A specialized module focused on object-related operations, specifically object deletion since creating objects from BSC is not supported.
4. **GroupApp:** A more complex module that handles group-related operations, such as creating, deleting, and updating groups, and managing group resource calls.

## BaseApp

The BaseApp contains common functions that are shared by BucketApp, ObjectApp, and GroupApp. These functions are essential for setting up and managing the environment for cross-chain operations. The BaseApp provides the following core functions:

1. **_getTotalFee():** This function returns the total value required to send a cross-chain package.
2. **Setters:** There are several setters available for configuring various aspects of the smart contract, such as:
   - `callbackGasLimit`: Sets the gas limit for the callback function.
   - `refundAddress`: Sets the address to which refunds should be sent.
   - `failureHandleStrategy`: Sets the strategy for handling failures during the execution of the smart contract.

In addition to these functions, BaseApp requires the implementation of three virtual functions:

1. **greenfieldCall(uint32 status, uint8 resourceType, uint8 operationType, uint256 resourceId, bytes calldata callbackData):** This function is responsible for initiating a new call, given the provided parameters. It needs to be implemented by the developer, depending on the specific use case.
2. **retryPackage(uint8 resourceType):** This function handles the retry mechanism for a package, based on its resource type. Developers should implement this function to define the behavior when a package needs to be retried.
3. **skipPackage(uint8 resourceType):** This function allows for skipping a package, based on its resource type. Developers should implement this function to define the behavior when a package needs to be skipped.

By implementing these virtual functions, developers can customize the behavior of their smart contracts to meet their specific requirements. With the BaseApp component, developers have a solid foundation on which to build their smart contract applications using BucketApp, ObjectApp, and GroupApp.

## BucketApp

The BucketApp component is a specialized module designed to handle bucket-related operations in the smart contract SDK. This component offers a range of functions to create, delete, and manage buckets, as well as to route and handle various bucket resource calls. Below, we provide a detailed overview of the functions included in the BucketApp:

1. **_bucketGreenfieldCall(uint32 status, uint8 operationType, uint256 resourceId, bytes calldata callbackData):** This function serves as a router for bucket resource greenfield calls. It processes and directs the call based on the provided parameters.
2. **_retryBucketPackage():** This function retries a failed bucket resource package.
3. **_skipBucketPackage():** This function skips a failed bucket resource package.
4. **_createBucket(address _creator, string memory _name, BucketStorage.BucketVisibilityType _visibility, uint64 _chargedReadQuota, address _spAddress, uint256 _expireHeight, bytes calldata _sig):** This function sends a create bucket cross-chain request to greenfield without a callback. It takes various parameters, such as creator, name, visibility type, charged read quota, service provider address, expire height, and signature.
5. **_createBucket(address _creator, string memory _name, BucketStorage.BucketVisibilityType _visibility, uint64 _chargedReadQuota, address _spAddress, uint256 _expireHeight, bytes calldata _sig, bytes memory _callbackData):** This function sends a create bucket cross-chain request to greenfield with a callback. It takes the same parameters as the previous function, along with an additional `_callbackData` parameter for the callback.
6. **_deleteBucket(uint256 _tokenId):** This function sends a delete bucket cross-chain request to greenfield without a callback, using the provided token ID.
7. **_deleteBucket(uint256 _tokenId, bytes memory _callbackData):** This function sends a delete bucket cross-chain request to greenfield with a callback, using the provided token ID and callback data.

In addition to these functions, the BucketApp component requires the implementation of two virtual functions:

1. **_createBucketCallback(uint32 _status, uint256 _tokenId, bytes memory _callbackData):** Developers need to implement this function to define the behavior for the create bucket callback. The function receives the status, token ID, and callback data as parameters.
2. **_deleteBucketCallback(uint32 _status, uint256 _tokenId, bytes memory _callbackData):** Developers need to implement this function to define the behavior for the delete bucket callback. The function receives the status, token ID, and callback data as parameters.

By implementing these virtual functions, developers can tailor the BucketApp component to suit their specific bucket-related operations and handle the corresponding callbacks as needed.

## ObjectApp

The ObjectApp component is a specialized module designed to handle object-related operations in the smart contract SDK. This component offers a range of functions to manage objects and process object resource calls. However, please note that creating objects from BSC is currently not supported. Below, we provide a detailed overview of the functions included in the ObjectApp:

1. **_objectGreenfieldCall(uint32 status, uint8 operationType, uint256 resourceId, bytes calldata callbackData):** This function serves as a router for object resource greenfield calls. It processes and directs the call based on the provided parameters.
2. **_retryObjectPackage():** This function retries a failed object resource package.
3. **_skipObjectPackage():** This function skips a failed object resource package.
4. **_deleteObject(uint256 _tokenId):** This function deletes an object using the provided token ID. As creating objects from BSC is not supported, the ObjectApp focuses on deletion operations.
5. **_deleteObject(uint256 _tokenId, bytes memory _callbackData):** This function deletes an object with a callback, using the provided token ID and callback data.

In addition to these functions, the ObjectApp component requires the implementation of one virtual function:

1. **_deleteObjectCallback(uint32 _status, uint256 _tokenId, bytes memory _callbackData):** Developers need to implement this function to define the behavior for the delete object callback. The function receives the status, token ID, and callback data as parameters.

By implementing this virtual function, developers can customize the ObjectApp component to handle object deletion operations and manage the corresponding callbacks as needed.

## GroupApp

The GroupApp component is a specialized module designed to handle group-related operations in the smart contract SDK. This component is more complex compared to the BucketApp and ObjectApp, as it offers a range of functions to create, delete, update, and manage groups. Below, we provide a detailed overview of the functions included in the GroupApp:

1. **_groupGreenfieldCall(uint32 status, uint8 operationType, uint256 resourceId, bytes calldata callbackData):** This function serves as a router for group resource greenfield calls. It processes and directs the call based on the provided parameters.
2. **_retryGroupPackage():** This function retries a failed group resource package.
3. **_skipGroupPackage():** This function skips a failed group resource package.
4. **_createGroup(address _owner, string memory _groupName):** This function creates a new group with the provided owner address and group name.
5. **_createGroup(address _owner, string memory _groupName, bytes memory _callbackData):** This function creates a new group with a callback, using the provided owner address, group name, and callback data.
6. **_deleteGroup(uint256 _tokenId):** This function deletes a group using the provided token ID.
7. **_deleteGroup(uint256 _tokenId, bytes memory _callbackData):** This function deletes a group with a callback, using the provided token ID and callback data.
8. **_updateGroup(address _owner, uint256 _tokenId, uint8 _opType, address[] memory _members):** This function updates a group based on the provided owner address, token ID, operation type, and an array of member addresses.
9. **_updateGroup(address _owner, uint256 _tokenId, uint8 _opType, address[] memory _members, bytes memory _callbackData):** This function updates a group with a callback, using the provided owner address, token ID, operation type, an array of member addresses, and callback data.

In addition to these functions, the GroupApp component requires the implementation of three virtual functions:

1. **_createGroupCallback(uint32 _status, uint256 _tokenId, bytes memory _callbackData):** Developers need to implement this function to define the behavior for the create group callback. The function receives the status, token ID, and callback data as parameters.
2. **_deleteGroupCallback(uint32 _status, uint256 _tokenId, bytes memory _callbackData):** Developers need to implement this function to define the behavior for the delete group callback. The function receives the status, token ID, and callback data as parameters.
3. **_updateGroupCallback(uint32 _status, uint256 _tokenId, bytes memory _callbackData):** Developers need to implement this function to define the behavior for the update group callback. The function receives the status, token ID, and callback data as parameters.

By implementing these virtual functions, developers can customize the GroupApp component to suit their specific group-related operations and handle the corresponding callbacks as needed.
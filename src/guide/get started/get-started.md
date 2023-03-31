---
title: Get Started
order: 1
---

# DCellar

DCellar is the ultimate tool enabling user to start their decentralized data management journey on Greenfield. With DCellar 
V1.0, You can store, download and delete your files, mange your account assets, while more functions are under planing. 
It is currently avaible as a WebUI, you can easily login with Metamask Wallet. This document helps you get started with DCellar.

::: warning
**Before using DCellar, please make sure you have already installed [MetaMask browser extension](https://metamask.io/) on your web browser and you have already created your Metamask account.**
:::

## Login

For first time users, open your browser, and enter [dcellar.io](http://dcellar.io), you will be able to see the Welcome Screen:

Click **Connect Wallet**, your Metamask wallet extension will be automatically avoked, and you will be login in with your current Metamask account.

<div align="center"><img src="../../asset/201-Welcome-Page.jpg"  height="95%" width="95%"></div>
<div align="center"><i>Login</i></div>

For first time users, you will need to add Greenfield Testnet to your Metamask Wallet, and you will be asked to switch your network to Greenfield Testnet to start following operations.

::: info
Greenfield Blockchain is fully EVM compatible, it shares the same address format with other EVM compatible chains. After you successfully login, 
your Greenfield Testnet's Owner account is automatically created, and it shares the same account address with your Greenfield BSC Testnet account.
:::

::: tip
If you are not able to add Greenfield Testnet automatically, you can try to [Add Network to Metamask Manually](https://support.metamask.io/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC).
You can find Greenfield Testnet RPC info at [BNBCain List](https://www.bnbchainlist.org).
:::


For returning users, you will stay login in for a default time period. During the default time period, you will stay login when you come back. After that, you will need to login with Metamask Again.

If you want to switch to your other metamask accounts, you can try **Disconnect** first, and then login again with another account.

## Transfer In

Before start using Dcellar to store your files, you need to transfer in serveral amounts of BNB tokens from your *Greenfild BSC Testnet* Account to your *Greenfield Testnet* account, these two account share the same account address.

::: info
To claim test BNB token on *Greenfield BSC Testnet*, you can use our [**Faucet**](https://faucet-greenfield-testnet.nodereal.io/).
:::

After you login, you can see the Transfer In Tab under Wallet Page. Before you Transfer In, you shoud make sure you are currently under *Greenfild BSC Testnet*. If you are under *Greenfield Testnet*, your Transfer In page will be shown as follows:

<div align="center"><img src="../../asset/202-Switch-Network.jpg"  height="95%" width="50%"></div>
<div align="center"><i>Switch to BNB Smart Chain</i></div>

Click **Switch to BNB Smart Chain**, your Metamask will be avoked, informing  you to switch network, by clicking **Switch Network** button on Metamask pop-up, you will be able to switch to *Greenfild BSC Testnet*. If you havn't add *Greenfild BSC Testnet* yet, Metamask will ask you to add network first, then switch to this network.

You will be able to Transfer in certain amount of BNB token from your *Greenfild BSC Testnet* account to your  *Greenfild Testnet* account which shares the same address. Transfer In will cost you two kinds of fees, all charged by BNB token:

- **Gas fee**: covers the gas cost for sending your transfer on the destination chain.
- **Relayer fee**: paid to relayers for handling cross-chain packets.

Input the amount you want to Transfer In, Click **Transfer In**, your trasaction will be send. You can view your transaction details in [Greenfield BSC Testnet](https://greenfield-bsc-testnet-explorer.nodereal.io/).

## Create Bucket

Before you start using DCellar to manage your files, you shoud make sure you are currently under *Greenfild Testnet*. If you are under other network, you will be asked to Switch to *BNB Greenfield* first.

<div align="center"><img src="../../asset/205-switch-network.jpg"  height="95%" width="95%"></div>
<div align="center"><i>Switch to BNB Greenfield</i></div>

A bucket is a logical container for storing objects in Greenfield. Once a bucket has been created, you can upload your files to a certain bucket.

After Login, you can see  **New Bucket** button at your bucket list page.

<div align="center"><img src="../../asset/203-bucket-list.jpg"  height="95%" width="95%"></div>
<div align="center"><i>Bucket List</i></div>

Click **New Bucket** to start, and follow the naming rules to pick your bucket name:

- Bucket names must be between 3 (min) and 63 (max) characters long.
- Bucket names can consist only of lowercase letters, numbers, dots (.), and hyphens (-).
- Bucket names must begin and end with a letter or number.
- Bucket names must not contain two adjacent periods.
- Bucket names must not be formatted as an IP address (for example, 192.168.5.4).
- Bucket names must be global unique in Greenfield
- A bucket name cannot be used by another Greenfield account until the bucket is deleted.

<div align="center"><img src="../../asset/204-create-bucket.jpg"  height="95%" width="95%"></div>
<div align="center"><i>Create Bucket</i></div>

When you are creating a bucket, gas fee will be charged from your current login account, which is also your owner account. If your balance is insufficient, you will be informed to Transfer In first.

Since the owner's account will be the default payment account, in DCellar V1.0, your owner account will be used to pay for all your opreations. For more information about Owner Account and Payment Account, Please Go to [Billing and Payment](../concept/billing-payment.md).

:::info
Every user account can create several buckets. The account will become the "owner" of the bucket.
:::

## Upload File

Choose one bucket on your bucket list page, you can see the files within this bucket. Click **Upload File** , you will be able to choose a locally storaged file.

<div align="center"><img src="../../asset/206-file-list.jpg"  height="95%" width="95%"></div>
<div align="center"><i>File List</i></div>

::: tip
Please notice that you can only choose one file at a time, and the file size should be no bigger than 2GB.
:::

When you are uploading a file, gas fee will be charged from your current login account, which is also your owner account.

Besides, once your file is uploaded successfully, you will be charging storage fee under a certain flow rate. You can see more detail about flow rate at [Billing and Payment](../greenfield-blockchain/modules/billing-and-payment.md).

Therefore, when you are uploading a file, you need to make sure that your owner account has enough balance to cover the storage fee for the following six months. which will be shown as Prelocked storage fee as follow.

<div align="center"><img src="../../asset/207-upload-file.png"  height="95%" width="95%"></div>
<div align="center"><i>Upload File</i></div>

::: info
Please notice that prelocked fee is not charged at the beginning, it still in your owner account. But you are not allowd to use it for other purpose because it's "locked".
:::

You can view your total "locked fee" at your account page by clicking your account button on the top right corner.

<div align="center"><img src="../../asset/209-locked-fee.png"  height="95%" width="40%"></div>
<div align="center"><i>Locked Fee</i></div>

## Download File



You can downloard your own file in DCellar V1.0. When you are downloading a file, gas fee will be charged from your current login account, which is also your owner account. If your balance is insufficient, you will be informed to Transfer In first.

::: warning
Each download operation will consume **Download Quota**, which is related to file size. In current testing phase, each bucket will be given **10G**'s free quota. And users are not able to buy new quota for now.
:::

When your remaining quota is smaller than the required quota for a certain file you are downloading, your download will be failed, you will receive an error message as follow:

<div align="center"><img src="../../asset/211-download-fail.png"  height="95%" width="95%"></div>
<div align="center"><i>Download Fail</i></div>

## Delete File

When you are deleting a file, gas fee will be charged from your current login account, which is also your owner account. If your balance is insufficient, you will be informed to Transfer In first.

Besides, when your file is deleted, your flow rate will be recalculated, part of your storage fee will be "unlocked". So you can see your "Unlocked storage fee" as follow when deleting file.

<div align="center"><img src="../../asset/208-confirm-delete.png"  height="95%" width="95%"></div>
<div align="center"><i>Delete File</i></div>

## Delete Bucket

You can delete the bucket created by you. Please notice you are only allowed to delete an empty bucket, which means you need to delete all your files in the bucket before you delete the bucket.

When you are deleting a bucket, gas fee will be charged from your current login account, which is also your owner account.


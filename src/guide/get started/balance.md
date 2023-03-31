---
title: Balance Management
order: 3
---

# Blance Managment

Greenfield Blockchain is fully EVM compatible, it shares the same address format with other EVM compatible chains. Greenfield provides multiple tools such as CLI, SDKs and DCellar to help you bridge your assets. This document mainly describe how to use DCellar to bridge your assets between **Greenfield BSC Testnet** and  **Greenfield Testnet**, as well as  moving assets between **Greenfield Testnet**'s accounts. DCellar is the ultimate tool enabling user to start their decentralized data management journey on Greenfield.

## Transfer In

With DCellar, you can transfer in serveral amounts of tBNB tokens from your **Greenfild BSC Testnet** Account to your **Greenfield Testnet**'s owner account, these two accounts share the same account address.  You can find out more here about [Owner Accounts](../concept/accounts.md). 

::: info

To claim test BNB token on *Greenfield BSC Testnet*, you can use our [**Faucet**](https://faucet-greenfield-testnet.nodereal.io/).

::: 

After you login, you can see the Transfer In Tab under Wallet Page. Before you Transfer In, you shoud make sure you are currently under *Greenfild BSC Testnet*. If you are under *Greenfield Testnet*, your Transfer In page will be shown as follow. Learn more about how to login [DCellar](get-started.md).

<div align="center"><img src="../../asset/202-Switch-Network.jpg"  height="95%" width="50%"></div>
<div align="center"><i>Switch to BNB Smart Chain</i></div>

Click **Switch to BNB Smart Chain**, your Metamask will be avoked, informing  you to switch network, by clicking **Switch Network** button on Metamask pop-up, you will be able to switch to *Greenfild BSC Testnet*. If you havn't add *Greenfild BSC Testnet* yet, Metamask will ask you to add network first, then switch to this network.

You will be able to Transfer in certain amount of BNB token from your *Greenfild BSC Testnet* account to your  *Greenfild Testnet* account which shares the same address. Transfer In will cost you two kinds of fees, all charged by BNB token:

- **Gas fee**: covers the gas cost for sending your transfer on the destination chain.
- **Relayer fee**: paid to relayers for handling cross-chain packets. 

Input the amount you want to Transfer In, Click **Transfer In**, your trasaction will be send. You can view your transaction details in [Greenfield BSC Testnet Explorer](https://greenfield-bsc-testnet-explorer.nodereal.io/).

<div align="center"><img src="../../asset/214-transfer-in.png"  height="95%" width="95%"></div>
<div align="center"><i>Transfer In</i></div>

## Transfer Out

With DCellar V1.0, you can transfer out BNB token from your Greenfield Testnet account  to your Greenfield BSC Testnet account which shares the same address. 

Before you Transfer Out, you shoud make sure you are currently under *Greenfild  Testnet*. If you are under *Greenfield BSC Testnet*, your Transfer Out page will be shown as follows:

<div align="center"><img src="../../asset/212-transfer-out-switch-network.png"  height="95%" width="50%"></div>
<div align="center"><i>Switch to BNB Greenfield</i></div>

Click **Switch to BNB Greenfield**, your Metamask will be avoked, informing  you to switch network, by clicking **Switch Network** button on Metamask pop-up, you will be able to switch to *Greenfild Testnet*. 

Transfer Out will cost you two kinds of fees, all charged by BNB token:

- **Gas fee**: covers the gas cost for sending your transfer on the destination chain.
- **Relayer fee**: paid to relayers for handling cross-chain packets. 

Input the amount you want to Transfer Out, Click **Transfer Out, your trasaction will be send. You can view your transaction details in [GreenfieldScan](https://greenfieldscan.com/).

<div align="center"><img src="../../asset/213-transfer-out.png"  height="95%" width="95%"></div>
<div align="center"><i>Transfer Out</i></div>

## Send

With DCellar V1.0, you can send BNB token from your Greenfield owner account  to other Greenfield owner account.

Before you send token to others, you shoud make sure you are currently under *Greenfild  Testnet*. If you are under *Greenfield BSC Testnet*, your Send page will be shown as follows:

<div align="center"><img src="../../asset/215-send-switch-network.png"  height="95%" width="50%"></div>
<div align="center"><i>Switch to BNB Greenfield</i></div>

Click **Switch to BNB Greenfield**, your Metamask will be avoked, informing  you to switch network, by clicking **Switch Network** button on Metamask pop-up, you will be able to switch to *Greenfild Testnet*.

::: warning
Before Sending, please make sure the address you enter is a valid Greenfield Testnet account address.
:::

Enter receiver's address and the amount you want the send, click **Send**, your transaction will be sent to Greenfield Testnet, and you will need to pay the gas fee on Greenfield Testnet.

<div align="center"><img src="../../asset/216-send.png"  height="95%" width="95%"></div>
<div align="center"><i>Send</i></div>

You can view transaction details in [GreenfieldScan](https://greenfieldscan.com/).




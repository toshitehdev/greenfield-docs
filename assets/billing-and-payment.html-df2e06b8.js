import{_ as e,W as t,X as a,a1 as s}from"./framework-a045178c.js";const n="/assets/04-Funds-Flow-e4106a36.jpg",i={},o=s('<h1 id="billing-and-payment" tabindex="-1"><a class="header-anchor" href="#billing-and-payment" aria-hidden="true">#</a> Billing and Payment</h1><p>Greenfield will charge the users in two parts. Firstly, every transaction will require gas fees to pay the Greenfield validator to write the metadata on-chain. Secondly, the SPs charge the users for their storage service. Such payment also happens on the Greenfield. This document is about the latter: how such off-chain service fees are billed and charged.</p><p>There are two kinds of fees for the off-chain service: object storage fee and read fee:</p><ol><li><p>Every object stored on Greenfield is charged a fee based on its size. The storage price is determined by the service providers.</p></li><li><p>There is a free quota for users&#39; objects to be read based on their size, content types, and more. If exceeded, i.e. the object data has been downloaded too many times, SP will limit the bandwidth for more downloads. Users can raise their read quota to get more download quota. The read quota price is determined by the Primary Storage Provider users selected.</p></li></ol><p>The fees are paid on Greenfield in the style of &quot;Stream&quot; from users to the SPs at a constant rate. The fees are charged every second as they are used.</p><h2 id="concepts-and-formulas" tabindex="-1"><a class="header-anchor" href="#concepts-and-formulas" aria-hidden="true">#</a> Concepts and Formulas</h2><p>Streaming is a constant by-the-second movement of funds from a sending account to a receiving account. Instead of sending payment transactions now and then, Greenfield records the static balance, the latest update timestamp, and flow rate in its payment module, and calculates the dynamic balance with a formula using this data in the records. If the net flow rate is not zero, the dynamic balance will change as time elapses.</p><h3 id="terminology" tabindex="-1"><a class="header-anchor" href="#terminology" aria-hidden="true">#</a> Terminology</h3><ul><li><p><strong>Payment Module:</strong> This is a special module and ledger system managing the billing and payment on the Greenfield blockchain. Funds will be deposited or charged into it from users&#39; balance or payment accounts in this Payment Module.</p></li><li><p><strong>Stream Account</strong>: The Payment Module has its own ledger for billing management. Users can deposit and withdraw funds into their corresponding &quot;accounts&quot; on the payment module ledger. These accounts are called &quot;Stream Account&quot;, which will directly interact with the stream payment functions and bill the users for the storage and data service.</p></li><li><p><strong>Payment Account</strong>: Payment account has been discussed in other sections of Part 1 and Part 3 already. It is actually a type of Stream Account. Users can create different payment accounts and associate it with different buckets for different purposes.</p></li><li><p><strong>Payment Stream:</strong> Whenever the users add/delete/change a storage object or download a data package, they add or change one or more &quot;payment streams&quot; for that service provided by SPs.</p></li><li><p><strong>Flow Rate</strong>: The per-second rate at which a sender decreases its net outflow stream and increases a receiver&#39;s net inflow stream when creating or updating a payment stream.</p></li><li><p><strong>Netflow Rate</strong>: The per-second rate that an account&#39;s balance is changing. It is the sum of the account&#39;s inbound and outbound flow rates.</p></li><li><p><strong>Sender</strong>: The stream account that starts the payment stream by specifying a receiver and a flow rate at which its net flow decreases.</p></li><li><p><strong>Receiver</strong>: The stream account on the receiving end of one or more payment streams.</p></li><li><p><strong>CRUD Timestamp</strong>: The timestamp of when the user creates, updates, or deletes a payment stream.</p></li><li><p><strong>Delta Balance</strong>: The amount of the stream account&#39;s balance has changed since the latest CRUD timestamp due to the flow. It can be positive or negative.</p></li><li><p><strong>Static Balance</strong>: The balance of the stream account at the latest CRUD timestamp.</p></li><li><p><strong>Dynamic Balance</strong>: The actual balance of a stream account. It is the sum of the Static Balance and the Delta Balance.</p></li></ul><p>When a user&#39;s stream account is initiated in the payment module by deposit, several fields will be recorded for this stream account:</p><ul><li><p>CRUD Timestamp - will be the timestamp at the time.</p></li><li><p>Static Balance - will be the deposit amount.</p></li><li><p>Netflow Rate - will be 0.</p></li><li><p>Buffer Balance - will be 0.</p></li></ul><h3 id="formula" tabindex="-1"><a class="header-anchor" href="#formula" aria-hidden="true">#</a> Formula</h3><p><em>Static Balance = Initial Balance at latest CRUD timestamp</em></p><p><em>Delta Balance = Netflow Rate * Seconds elapsed since latest CRUD timestamp</em></p><p><em>Current Balance = Static Balance + Delta Balance</em></p><p><em>Buffer Balance = - Netflow Rate * pre-configed ReserveTime if Netflow Rate is negative</em></p><div align="center"><img src="'+n+`" height="80%" width="80%"></div><div align="center"><i>How a User Receives Inflow and Outflow of Funds</i></div><p>Every time a user creates, updates, or deletes a payment stream, many variables in the above formulas will be updated and the users&#39; stream accounts in the payment module will be settled.</p><ul><li><p>The net flow for the user&#39;s stream account in the payment module will be re-calculated to net all of its inbound and outbound flow rates by adding/removing the new payment stream against the current NetFlow Rate. E.g. when a user creates a new object whose price is $0.4/month, its NetFlow Rate will add -$0.4/month.</p></li><li><p>If the NetFlow rate is negative, the associated amount of BNB will be reserved in a buffer balance. It is used to avoid the dynamic balance becoming negative. When the dynamic balance becomes under the threshold, the account will be forced settled.</p></li><li><p>CRUD Timestamp will become the current timestamp.</p></li><li><p>Static Balance will be re-calculated. The previous dynamic balance will be settled. The new static Balance will be the Current Balance plus the change of the Buffer Balance.</p></li></ul><h2 id="key-workflow" tabindex="-1"><a class="header-anchor" href="#key-workflow" aria-hidden="true">#</a> Key Workflow</h2><h3 id="deposit-and-withdrawal" tabindex="-1"><a class="header-anchor" href="#deposit-and-withdrawal" aria-hidden="true">#</a> Deposit and Withdrawal</h3><p>All users(including SPs) can deposit and withdraw BNB in the payment module. The StaticBalance in the StreamPayment data struct will be &quot;settled&quot; first: the CRUDTimeStamp will be updated and StaticBalance will be netted with DeltaBalance. Then the deposit and withdrawal number will try to add/reduce the StaticBalance in the record. If the static balance is less than the withdrawal amount, the withdrawal will fail.</p><p>Deposit/withdrawal via cross-chain will also be supported to enable users to deposit/withdraw from BSC directly.</p><p>Specifically, the payment deposit can be triggered automatically during the creation of objects or the addition of data packages. As long as users have assets in their address accounts and payment accounts, the payment module may directly charge the users by moving the funds from address accounts.</p><h3 id="payment-stream" tabindex="-1"><a class="header-anchor" href="#payment-stream" aria-hidden="true">#</a> Payment Stream</h3><p>Payment streams are flowing in one direction. Whenever the users deposit from their address accounts into the stream accounts (including users&#39; default stream account and created payment accounts), the funds first go from the users&#39; address accounts to a system account maintained by the Payment Module, although the fund size and other payment parameters will be recorded on the users&#39; stream account, i.e. the StreamPayment record, in the Payment Module ledger. When the payment is settled, the funds will go from the system account to SPs&#39; address accounts according to their in-flow calculation.</p><p>Every time users do the actions below, their StreamRecord will be updated:</p><ul><li><p>Creating an object will create new streams to the SPs</p></li><li><p>Deleting an object will delete associated streams to the SPs</p></li><li><p>Adjusting the read quota will create/delete/update the associated streams</p></li></ul><h3 id="forced-settlement" tabindex="-1"><a class="header-anchor" href="#forced-settlement" aria-hidden="true">#</a> Forced Settlement</h3><p>If a user doesn&#39;t deposit for a long time, his previous deposit may be all used up for the stored objects. Greenfield has a forced settlement mechanism to ensure enough funds are secured for further service fees.</p><p>There are two configurations, ReserveTime and ForcedSettleTime. Let&#39;s say 7 days and 1 day. If a user wants to store an object at the price of approximately $0.1 per month($0.00000004/second), he must reserve fees for 7 days in buffer balance, which is <code>$0.00000004 * 7 * 86400 = $0.024192</code>. If the user deposits $1 initially, the stream payment record will be as below.</p><ul><li><p>CRUD Timestamp: 100</p></li><li><p>Static Balance: $0.975808</p></li><li><p>Netflow Rate: -$0.00000004/sec</p></li><li><p>Buffer Balance: $0.024192</p></li></ul><p>After 10000 seconds, the dynamic balance of the user is <code>0.975808 - 10000 * 0.00000004 = 0.975408</code>.</p><p>After 24395200 seconds(approximately 282 days), the dynamic balance of the user will become negative. Users should have some alarms for such events that remind them to supply more funds in time.</p><p>If no more funds are supplied and the dynamic balance plus buffer balance is under the forced settlement threshold, the account will be forcibly settled. All payment streams of the account will be closed and the account will be marked as out of balance. The download speed for all objects associated with the account or payment account will be downgraded. The objects will be deleted by the SPs if no fund is provided within the predefined threshold.</p><p>The forced settlement will also charge some fees which is another incentive for users to replenish funds proactively.</p><p>Let&#39;s say the ForceSettlementTime is 1 day. After 24913601 seconds(approximately 288 days), the dynamic balance becomes <code>0.975808 - 24913601 *0.00000004 = -0.02073604</code>, plus the buffer balance is $0.00345596. The forced settlement threshold is <code>86400* 0.00000004 = 0.003456</code>. The forced settlement will be triggered, and the record of the user will become as below:</p><ul><li><p>CRUD Timestamp: 24913701</p></li><li><p>Static Balance: $0</p></li><li><p>Netflow Rate: $0/sec</p></li><li><p>Buffer Balance: $0</p></li></ul><p>The validators will get the remaining $0.00345596 as a reward. The account will be marked as &quot;frozen&quot; and his objects get downgraded by SPs.</p><p>Every time a stream record is updated, Greenfield calculates the time when the account will be out of balance. So Greenfield can keep an on-chain list to trace the timestamps for the potential forced settlement. The list will be checked by the end of every block processing. When the block time passes the forced settlement timestamp, the settlement of the associated stream accounts will be triggered automatically.</p><h3 id="payment-account" tabindex="-1"><a class="header-anchor" href="#payment-account" aria-hidden="true">#</a> Payment Account</h3><p>Payment account is a special &quot;Stream Account&quot; type in the Payment Module. Users can create multiple payment accounts and have the permission to link buckets to different payment accounts to pay for storage and data package.</p><p>The payment accounts have the below traits:</p><ul><li><p>Every user can create multiple payment accounts. The payment accounts created by the user are recorded with a map on the Greenfield blockchain.</p></li><li><p>The address format of the payment account is the same as normal accounts. It&#39;s derived by the hash of the user address and payment account index. The payment account only exists in the storage payment module. Users can deposit into, withdraw from and query the balance of payment accounts in the payment module, which means payment accounts cannot be used for transfer or staking.</p></li><li><p>Users can only associate their buckets with their payment accounts to pay for storage and bandwidth. Users cannot associate their own buckets with others&#39; payment accounts, and users cannot associate others&#39; buckets with their own payment accounts.</p></li><li><p>The owner of a payment account is the user who creates it. The owner can set it non-refundable. It&#39;s a one-way setting and can not be revoked. Thus, users can set some objects as &quot;public goods&quot; which can receive donations for storage and bandwidth while preserving the ownership.</p></li></ul><h3 id="account-freeze-and-resume" tabindex="-1"><a class="header-anchor" href="#account-freeze-and-resume" aria-hidden="true">#</a> Account Freeze and Resume</h3><p>If a payment account is out of balance, it will be settled and set a flag as out of balance.</p><p>The NetflowRate will be set to 0, while the current settings of the stream pay will be backed up in another data structure. The download speed for all objects under this account will be downgraded.</p><p>If someone deposits into a frozen account and the static balance is enough for reserved fees, the account will be resumed automatically. The stream pay will be recovered from the backup.</p><p>During the OutOfBalance period, no objects can be associated with this payment account again, which results in no object can be created under the bucket associated with the account.</p><p>If the associated object is deleted, the backup stream pay settings will be changed accordingly to ensure it reflects the latest once the account is resumed.</p><h3 id="storage-fee-price-and-adjustment" tabindex="-1"><a class="header-anchor" href="#storage-fee-price-and-adjustment" aria-hidden="true">#</a> Storage Fee Price and Adjustment</h3><p>The storage fee prices are determined by the SPs who supply the storage service. The cost of the SPs are composed of 3 parts:</p><ul><li>The primary SP will store the whole object file.</li><li>The secondary SPs will store part of the object file as a replica.</li><li>The primary SP will supply all the download requests of the object.</li></ul><p>There are 3 different on-chain prices.</p><ul><li>Primary SP Store Price</li><li>Primary SP Read Price</li><li>Secondary SP Store Price</li></ul><p>Every SP can set their own store price and read price via on-chain transactions. While the secondary SP store price is calculated by averaging all SPs&#39; store price.</p><p>The unit of price is a decimal, which indicates wei BNB per byte per second. E.g. the price is 0.027, means approximately $0.022 / GB / Month. (<code>0.027 * (30 * 86400) * (1024 * 1024 * 1024) * 300 / 10 ** 18 ≈ 0.022</code>, assume the BNB price is 300 USD)</p><p>The storage fees are calculated and charged in bucket level. The store price and read price is up to the SP of bucket. The secondary store price is stored in the chain state and the same for all buckets. The total size of all objects and per secondary SP served size in a bucket will be recorded in the bucket metadata. The charge size will be used instead of the real size, e.g. files under 1KB will be charged as 1KB to cover the cost. The payment bill will be calculated by the size statistics and prices, and it will be charged from the stream account specified in the bucket to the SPs.</p><h2 id="state" tabindex="-1"><a class="header-anchor" href="#state" aria-hidden="true">#</a> State</h2><p>The payment module keeps state of the following primary objects:</p><ul><li>The stream payment ledger.</li><li>The payment accounts and total account created by users.</li><li>An AutoSettleRecord list to keep track of the auto-settle timestamp of the stream accounts.</li></ul><p>In addition, the payment module keeps the following indexes to manage the aforementioned state:</p><ul><li>StreamRecord Index. <code>address -&gt; StreamRecord</code></li><li>PaymentAccount Index. <code>address -&gt; PaymentAccount</code></li><li>PaymentAccountCount Index. <code>address -&gt; PaymentAccountCount</code></li><li>AutoSettleRecord Index. <code>settle-timestamp | address -&gt; 0</code></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>message StreamRecord {
  string account = 1 [(cosmos_proto.scalar) = &quot;cosmos.AddressString&quot;];
  int64 crud_timestamp = 2;
  string netflow_rate = 3 [
    (cosmos_proto.scalar) = &quot;cosmos.Int&quot;,
    (gogoproto.customtype) = &quot;github.com/cosmos/cosmos-sdk/types.Int&quot;,
    (gogoproto.nullable) = false
  ];
  string staticBalance = 4 [
    (cosmos_proto.scalar) = &quot;cosmos.Int&quot;,
    (gogoproto.customtype) = &quot;github.com/cosmos/cosmos-sdk/types.Int&quot;,
    (gogoproto.nullable) = false
  ];
  string bufferBalance = 5 [
    (cosmos_proto.scalar) = &quot;cosmos.Int&quot;,
    (gogoproto.customtype) = &quot;github.com/cosmos/cosmos-sdk/types.Int&quot;,
    (gogoproto.nullable) = false
  ];
  string lockBalance = 6 [
    (cosmos_proto.scalar) = &quot;cosmos.Int&quot;,
    (gogoproto.customtype) = &quot;github.com/cosmos/cosmos-sdk/types.Int&quot;,
    (gogoproto.nullable) = false
  ];
  int32 status = 7;
  int64 settleTimestamp = 8;
  repeated OutFlow outFlows = 9 [(gogoproto.nullable) = false];
}

message PaymentAccount {
  string addr = 1 [(cosmos_proto.scalar) = &quot;cosmos.AddressString&quot;];
  string owner = 2 [(cosmos_proto.scalar) = &quot;cosmos.AddressString&quot;];
  bool refundable = 3;
}

message PaymentAccountCount {
  string owner = 1 [(cosmos_proto.scalar) = &quot;cosmos.AddressString&quot;];
  uint64 count = 2;
}

message AutoSettleRecord {
  int64 timestamp = 1;
  string addr = 2 [(cosmos_proto.scalar) = &quot;cosmos.AddressString&quot;];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="parameters" tabindex="-1"><a class="header-anchor" href="#parameters" aria-hidden="true">#</a> Parameters</h2><p>The payment module contains the following parameters, they can be updated with governance.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>message Params {
  // Time duration which the buffer balance need to be reserved for NetOutFlow e.g. 6 month
  uint64 reserve_time = 1 [(gogoproto.moretags) = &quot;yaml:\\&quot;reserve_time\\&quot;&quot;];
  // The maximum number of payment accounts that can be created by one user
  uint64 payment_account_count_limit = 2 [(gogoproto.moretags) = &quot;yaml:\\&quot;payment_account_count_limit\\&quot;&quot;];
  // Time duration threshold of forced settlement.
  // If dynamic balance is less than NetOutFlowRate * forcedSettleTime, the account can be forced settled.
  uint64 forced_settle_time = 3 [(gogoproto.moretags) = &quot;yaml:\\&quot;forced_settle_time\\&quot;&quot;];
  // the maximum number of accounts that will be forced settled in one block
  uint64 max_auto_force_settle_num = 4 [(gogoproto.moretags) = &quot;yaml:\\&quot;max_auto_force_settle_num\\&quot;&quot;];
  // The denom of fee charged in payment module
  string fee_denom = 5 [(gogoproto.moretags) = &quot;yaml:\\&quot;fee_denom\\&quot;&quot;];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th style="text-align:center;">Key</th><th style="text-align:center;">Type</th><th style="text-align:center;">Example</th></tr></thead><tbody><tr><td style="text-align:center;">reserve_time</td><td style="text-align:center;">uint64</td><td style="text-align:center;">15552000 (180 days)</td></tr><tr><td style="text-align:center;">payment_account_count_limit</td><td style="text-align:center;">uint64</td><td style="text-align:center;">200</td></tr><tr><td style="text-align:center;">forced_settle_time</td><td style="text-align:center;">uint64</td><td style="text-align:center;">604800 (7 days)</td></tr><tr><td style="text-align:center;">max_auto_force_settle_num</td><td style="text-align:center;">uint64</td><td style="text-align:center;">100</td></tr><tr><td style="text-align:center;">fee_denom</td><td style="text-align:center;">string</td><td style="text-align:center;">BNB</td></tr></tbody></table><h2 id="keepers" tabindex="-1"><a class="header-anchor" href="#keepers" aria-hidden="true">#</a> Keepers</h2><p>The payment module keeper provides access to query the parameters, payment account owner, storage price and several ways to update the ledger.</p><p>Currently, it&#39;s only used by the storage module.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>type PaymentKeeper interface {
	GetParams(ctx sdk.Context) paymenttypes.Params
	IsPaymentAccountOwner(ctx sdk.Context, addr string, owner string) bool
	GetStoragePrice(ctx sdk.Context, params paymenttypes.StoragePriceParams) (price paymenttypes.StoragePrice, err error)
	ApplyFlowChanges(ctx sdk.Context, from string, flowChanges []paymenttypes.OutFlow) (err error)
	ApplyUserFlowsList(ctx sdk.Context, userFlows []paymenttypes.UserFlows) (err error)
	UpdateStreamRecordByAddr(ctx sdk.Context, change *paymenttypes.StreamRecordChange) (ret *paymenttypes.StreamRecord, err error)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="messages" tabindex="-1"><a class="header-anchor" href="#messages" aria-hidden="true">#</a> Messages</h2><h3 id="msgcreatepaymentaccount" tabindex="-1"><a class="header-anchor" href="#msgcreatepaymentaccount" aria-hidden="true">#</a> MsgCreatePaymentAccount</h3><p>Used to create new payment account for a user.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>message MsgCreatePaymentAccount {
  option (cosmos.msg.v1.signer) = &quot;creator&quot;;

  // creator is the address of the stream account that created the payment account
  string creator = 1 [(cosmos_proto.scalar) = &quot;cosmos.AddressString&quot;];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="msgdeposit" tabindex="-1"><a class="header-anchor" href="#msgdeposit" aria-hidden="true">#</a> MsgDeposit</h3><p>Used to deposit to a stream account.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>message MsgDeposit {
  option (cosmos.msg.v1.signer) = &quot;creator&quot;;

  // creator is the message signer for MsgDeposit and the address of the account to deposit from
  string creator = 1 [(cosmos_proto.scalar) = &quot;cosmos.AddressString&quot;];
  // to is the address of the account to deposit to
  string to = 2 [(cosmos_proto.scalar) = &quot;cosmos.AddressString&quot;];
  // amount is the amount to deposit
  string amount = 3 [
    (cosmos_proto.scalar) = &quot;cosmos.Int&quot;,
    (gogoproto.customtype) = &quot;github.com/cosmos/cosmos-sdk/types.Int&quot;,
    (gogoproto.nullable) = false
  ];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="msgwithdraw" tabindex="-1"><a class="header-anchor" href="#msgwithdraw" aria-hidden="true">#</a> MsgWithdraw</h3><p>Used to withdraw from a stream account.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>message MsgWithdraw {
  option (cosmos.msg.v1.signer) = &quot;creator&quot;;

  // creator is the message signer for MsgWithdraw and the address of the receive account
  string creator = 1 [(cosmos_proto.scalar) = &quot;cosmos.AddressString&quot;];
  // from is the address of the account to withdraw from
  string from = 2 [(cosmos_proto.scalar) = &quot;cosmos.AddressString&quot;];
  // amount is the amount to withdraw
  string amount = 3 [
    (cosmos_proto.scalar) = &quot;cosmos.Int&quot;,
    (gogoproto.customtype) = &quot;github.com/cosmos/cosmos-sdk/types.Int&quot;,
    (gogoproto.nullable) = false
  ];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="msgdisablerefund" tabindex="-1"><a class="header-anchor" href="#msgdisablerefund" aria-hidden="true">#</a> MsgDisableRefund</h3><p>Used to make a stream account non-refundable.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>message MsgDisableRefund {
  option (cosmos.msg.v1.signer) = &quot;owner&quot;;

  // owner is the message signer for MsgDisableRefund and the address of the payment account owner
  string owner = 1 [(cosmos_proto.scalar) = &quot;cosmos.AddressString&quot;];
  // addr is the address of the payment account to disable refund
  string addr = 2 [(cosmos_proto.scalar) = &quot;cosmos.AddressString&quot;];
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,86),r=[o];function d(l,c){return t(),a("div",null,r)}const m=e(i,[["render",d],["__file","billing-and-payment.html.vue"]]);export{m as default};

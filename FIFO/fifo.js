function Node(amount, token) {
  this.amount = amount;
  this.token = token;
  this.next = null;
}

var queue = {
  front:null,
  rear:null
}

var ledger = {
  head:null
}

function SellBid(amount, token) {
  var NewSellOrder = new Node(amount, token);

  if (queue.rear === null) {
    queue.front = queue.rear = NewSellOrder;
  }
  else{
    queue.rear.next = NewSellOrder;
    queue.rear = NewSellOrder;
  }
}

function BuyBid(amount, token) {
  var head = queue.front;
  if (head.token === token) {
    if (head.amount <= amount) {
      amount = amount - head.amount;
      queue.front = queue.front.next;
      SalesLedger(head.amount,token);
    } else {
      head.amount -= amount;
      SalesLedger(amount,token);
      amount = 0;
    }
  }
  while (amount != 0) {
    if (head.next.token == token) {
      if (head.next.amount <= amount) {
        amount = amount - head.next.amount;
        SalesLedger(head.next.amount,token);
        head.next.amount = 0;
      } else {
        head.next.amount -= amount;
        SalesLedger(amount,token);
        amount = 0;
      }
    }
    head = head.next;
  }
}

function PrintOrderBook() {
  var head = queue.front;
  console.log("Amount \t Token Accepted");
  while (head != null) {
    if(head.amount!=0)
      console.log(head.amount + "\t " + head.token);
    head = head.next;
  }
}

function SalesLedger(amt,tkn)
{
  var newsale = new Node(amt,tkn);
  if(ledger.head == null)
  {
    ledger.head = newsale;
  }
  else
  {
    var LedgerHead = ledger.head;
    while(LedgerHead.next)
    {
      LedgerHead = LedgerHead.next;
    }
    LedgerHead.next = newsale;
  }
}

function PrintSalesLedger()
{
  console.log("\n | UPDATED SALES LEDGER | ");
  console.log("Amount \t Token");
  var ledgerHead=ledger.head;
  while(ledgerHead!=null)
  {
    console.log(ledgerHead.amount + " \t " + ledgerHead.token);
    ledgerHead=ledgerHead.next;
  }
}

SellBid(1, "BTC");
SellBid(2, "BTC");
SellBid(3, "ETH");
SellBid(4, "BTC");
SellBid(5, "ETH");
SellBid(6, "ETH");
SellBid(7, "LTC");

console.log("The Sell Order Book is : ");
PrintOrderBook();

console.log("\nBuy bid Placed for 6 tokens in exchange of ETH");
BuyBid(6, "ETH");
console.log("\nAfter Execution of Order \n | ORDER BOOK | ");
PrintOrderBook();
PrintSalesLedger();

console.log("\nBuy bid Placed for 2 tokens in exchange of LTC");
BuyBid(2, "LTC");
console.log("\nAfter Execution of Order \n | ORDER BOOK | ");
PrintOrderBook();
PrintSalesLedger();

BuyBid(4, "BTC");
console.log("\nBuy bid Placed for 4 tokens in exchange of BTC");
console.log("\nAfter Execution of Order \n | ORDER BOOK | ");
PrintOrderBook();
PrintSalesLedger();
function Node(amount, token) {
  this.amount = amount;
  this.token = token;
  this.date = new Date();
  var hours = this.date.getHours();
  var min = this.date.getMinutes();
  this.time = hours + " : " + min;
  this.next = null;
}

var SellQueue = {
  front: null,
  rear: null
};

var BuyQueue = {
  front: null,
  rear: null
};

var ledger = {
  head: null
};

function SellBid(amount, token) {
  var AmountLeft = MatchOrder(BuyQueue, amount, token);
  if (AmountLeft !== 0) {
    var NewSellOrder = new Node(AmountLeft, token);
    if (SellQueue.rear === null) {
      SellQueue.front = SellQueue.rear = NewSellOrder;
    } else {
      SellQueue.rear.next = NewSellOrder;
      SellQueue.rear = NewSellOrder;
    }
    PrintSellOrderBook();
  }
  PrintBuyOrderBook();
}

function BuyBid(amount, token) {
  var AmountLeft = MatchOrder(SellQueue, amount, token);
  if (AmountLeft !== 0) {
    var NewBuyOrder = new Node(AmountLeft, token);
    if (BuyQueue.rear === null) {
      BuyQueue.front = BuyQueue.rear = NewBuyOrder;
    } else {
      BuyQueue.rear.next = NewBuyOrder;
      BuyQueue.rear = NewBuyOrder;
    }
    PrintBuyOrderBook();
  }
  PrintSellOrderBook();
}

function MatchOrder(Queue, amount, token) {
  if (Queue.front) {
    var head = Queue.front;
    var flag = 0;
    var matchedToken;
    for (var i = 0; i < head.token.length; i++) {
      for (var j = 0; j < token.length; j++) {
        if (head.token[i] === token[j]) {
          matchedToken = token[j];
          flag = 1;
          break;
        }
      }
    }
    if (flag == 1) {
      if (head.amount <= amount) {
        amount = amount - head.amount;
        Queue.front = Queue.front.next;
        SalesLedger(head.amount, matchedToken);
      } else {
        head.amount -= amount;
        SalesLedger(amount, matchedToken);
        amount = 0;
      }
    }

    while (head.next && amount != 0) {
      flag = 0;
      for (var i = 0; i < head.next.token.length; i++) {
        for (var j = 0; j < token.length; j++) {
          if (head.next.token[i] === token[j]) {
            matchedToken = token[j];
            flag = 1;
            break;
          }
        }
      }
      if (flag == 1) {
        if (head.next.amount <= amount) {
          amount = amount - head.next.amount;
          SalesLedger(head.next.amount, matchedToken);
          head.next.amount = 0;
        } else {
          head.next.amount -= amount;
          SalesLedger(amount, matchedToken);
          amount = 0;
        }
      }
      head = head.next;
    }
  }
  return amount;
}

function PrintSellOrderBook() {
  var head = SellQueue.front;
  console.log("Amount \t Token \t Time");
  $("#Sell-Order-Book-div").empty();
  while (head != null) {
    if (head.amount != 0) {
      $("#Sell-Order-Book-div").append(
        "<p style='color:white;'>" +
          head.amount +
          "<span style='padding:10px;'></span>" +
          head.token +
          "<span style='padding:10px;'></span>" +
          head.time +
          "</p>"
      );
    }
    console.log(head.amount + "\t\t " + head.token + "\t " + head.time);
    head = head.next;
  }
}

function PrintBuyOrderBook() {
  var head = BuyQueue.front;
  console.log("Amount \t Token \t Time");
  $("#Buy-Order-Book-div").empty();
  while (head != null) {
    if (head.amount != 0) {
      $("#Buy-Order-Book-div").append(
        "<p style='color:white;'>" +
          head.amount +
          "<span style='padding:40px;'></span>" +
          head.token +
          "<span style='padding:30px;'></span>" +
          head.time +
          "</p>"
      );
    }
    console.log(head.amount + "\t\t " + head.token + "\t " + head.time);
    head = head.next;
  }
}

function SalesLedger(amt, tkn) {
  var newsale = new Node(amt, tkn);
  if (ledger.head == null) {
    ledger.head = newsale;
  } else {
    var LedgerHead = ledger.head;
    while (LedgerHead.next) {
      LedgerHead = LedgerHead.next;
    }
    LedgerHead.next = newsale;
  }
  PrintSalesLedger();
}

function PrintSalesLedger() {
  console.log("\n | UPDATED SALES LEDGER | ");
  console.log("Amount \t Token \t Time");
  var ledgerHead = ledger.head;
  $("#Ledger-div").empty();
  while (ledgerHead != null) {
    if (ledgerHead.amount !== 0) {
      $("#Ledger-div").append(
        "<p>" +
          ledgerHead.amount +
          "<span style='padding:50px;'></span>" +
          ledgerHead.token +
          "<span style='padding:50px;'></span>" +
          ledgerHead.date +
          "</p>"
      );
    }
    ledgerHead = ledgerHead.next;
  }
}

$(function() {
  let SellSubmitButton = $("#Sell-Order-Submit");
  let SellOrderValueBox = $("#Sell-Order-Value-Box");

  SellSubmitButton.click(function() {
    let SellOrderValue = SellOrderValueBox.val();
    if (SellOrderValue < 0.000001 || SellOrderValue > 10)
      $("#error-msg1").text("Enter amount between 0.000001 and 1");
    else {
      let Submittedtoken = [];
      if ($("#All-Tokens").is(":checked")) {
        Submittedtoken = ["BTC", "BCH", "ETH", "EOS", "LTC"];
      } else {
        $.each($("input[name='Specific-Token-Value']:checked"), function() {
          Submittedtoken.push($(this).val());
        });
      }
      SellBid(SellOrderValue, Submittedtoken);
    }
  });
});

$(function() {
  let BuySubmitButton = $("#Buy-Order-Submit");
  let BuyOrderValueBox = $("#Buy-Order-Value-Box");
  BuySubmitButton.click(function() {
    let BuyOrderValue = BuyOrderValueBox.val();
    if (BuyOrderValue < 0.000001 || BuyOrderValue > 10)
      $("#error-msg2").text("Enter amount between 0.000001 and 1");
    else {
      let Submittedtoken = [];
      Submittedtoken.push($("input[name='Buy-Order-Option']:checked").val());
      BuyBid(BuyOrderValue, Submittedtoken);
    }
  });
});
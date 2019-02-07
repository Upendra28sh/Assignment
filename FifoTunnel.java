package fifo;

class Node 
{ 
	String token;
    int amount;  
    Node next; 
   
    public Node(int amount, String token) 
    { 
        this.amount = amount; 
        this.token = token;
        this.next = null; 
    } 
} 
  
class Queue
{ 
    Node front, rear; 
       
    public Queue() 
    { 
        this.front = this.rear = null; 
    } 
        
    public void SellBid(int amount, String token) 
    { 
          
        Node NewSellOrder = new Node(amount,token); 
       
        if (this.rear == null) 
        { 
           this.front = this.rear = NewSellOrder; 
           return; 
        } 
       
        this.rear.next = NewSellOrder; 
        this.rear = NewSellOrder; 
    } 
        
    public void BuyBid(int amount, String token) 
    {      
    	Node head=front;
    	if(head.token==token)
    	{
    		if(head.amount<=amount)
			{
				amount=amount-head.amount;
				front=front.next;
			}
			else
			{
				head.amount-=amount;
				amount=0;
			}
    	}
    	
    	while(amount!=0)
    	{
    		if(head.next.token == token)
    		{	
    			if(head.next.amount<=amount)
    			{
    				amount=amount-head.next.amount;
    				head.next = head.next.next;
    			}
    			else
    			{
    				head.next.amount-=amount;
    				amount=0;
    			} 				
    		}
    		head=head.next;
    	}         
    } 

    public void print()
    {
    	Node head=front;
    	System.out.println("Amount \t Token Accepted");
    	while(head!=null)
    	{
    		System.out.println(head.amount +"\t "+ head.token);
    		head=head.next;
    	}
    }
} 
   
public class FifoTunnel
{ 
    public static void main(String[] args)  
    { 
        Queue q=new Queue(); 
        q.SellBid(1,"BTC"); 
        q.SellBid(2,"BTC");  
        q.SellBid(3,"ETH"); 
        q.SellBid(4,"BTC"); 
        q.SellBid(5,"ETH");
        q.SellBid(6,"ETH"); 
        q.SellBid(7,"LTC");
        
        System.out.println("The Sell Order Book is : ");
        q.print();
        
        q.BuyBid(6,"ETH");
        System.out.println("\nBuy bid Placed for 6 tokens in exchange of ETH");
        System.out.println("After Execution, Sell Order Book is : ");
        q.print();
        
        q.BuyBid(2,"LTC");
        System.out.println("\nBuy bid Placed for 2 tokens in exchange of LTC");
        System.out.println("After Execution, Sell Order Book is : ");
        q.print();       
    } 
} 

//
//   OUTPUT 
//Amount 	 Token Accepted
//1	 BTC
//2	 BTC
//3	 ETH
//4	 BTC
//5	 ETH
//6	 ETH
//7	 LTC
//
//Buy bid Placed for 6 tokens in exchange of ETH
//After Execution, Sell Order Book is : 
//Amount 	 Token Accepted
//1	 BTC
//2	 BTC
//4	 BTC
//2	 ETH
//6	 ETH
//7	 LTC
//
//Buy bid Placed for 2 tokens in exchange of LTC
//After Execution, Sell Order Book is : 
//Amount 	 Token Accepted
//1	 BTC
//2	 BTC
//4	 BTC
//2	 ETH
//6	 ETH
//5	 LTC

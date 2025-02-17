let express = require('express');
let cors=require('cors');

let app = express();
const port = 3000;

app.use(cors());

//Server-side values
let taxRate=5; //5%
let discountPercentage=10; //10%
let loyaltyRate=2; //2 points per ₹1


//Function1:calculate total cart price
function calculateTotalCartPrice(newItemPrice,cartTotal){
  let totalCartPrice=newItemPrice+cartTotal;
  return totalCartPrice.toString();
} 

//Endpoint1:Calculte the total price of items in the cart
//I have updated
app.get("/cart-total",(req,res)=>{
  let newItemPrice=parseFloat(req.query.newItemPrice);
  let cartTotal=parseFloat(req.query.cartTotal);
  res.send(calculateTotalCartPrice(newItemPrice,cartTotal));
})

//2:Function to apply a discount based on membership status
function finalPrice(cartTotal,isMember){
    let finalprice=isMember==="true" ? cartTotal-(cartTotal*discountPercentage)/100:cartTotal;
     return finalprice.toString();
}

//2:Endponit to apply a discount based on membership status
app.get('/membership-discount',(req,res)=>{
  let cartTotal=parseFloat(req.query.cartTotal);
  let isMember=req.query.isMember;
  res.send(finalPrice(cartTotal,isMember));

}); 

//3.Function to calculate tax on cart total
function totalTax(cartTotal) {
let totaltax=(cartTotal*taxRate)/100;
return totaltax.toString();
}

//3.End point to calculate tax on cart total
app.get('/calculate-tax',(req,res)=>{
  let cartTotal=parseFloat(req.query.cartTotal);
  res.send(totalTax(cartTotal));
});

//4.function to estimate delivery time based on shipping method
function estimateDeliveryTime(shippingMethod,distance) {
  let estimateTime;
  if(shippingMethod==='express')
  {
    estimateTime=distance/100;
  }else
  {
    estimateTime=distance/50;
  }
  return estimateTime.toString();
}
//4.EndPoint to stimate delivery time based on shipping method
app.get('/estimate-delivery',(req,res)=>{
  let shippingMethod=req.query.shippingMethod;
  let distance=parseInt(req.query.distance);
  res.send(estimateDeliveryTime(shippingMethod,distance));
});

//5:Function to calculate the shipping cost based on weight and distance
function shippingCost(weight,distance){
  let shippingcost=weight*distance*0.1;
  return shippingcost.toString();
}
//5:Endponit to calculate the shipping cost based on weight and distance
app.get('/shipping-cost',(req,res)=>{
  let weight=parseFloat(req.query.weight);
  let distance=parseFloat(req.query.distance);
  res.send(shippingCost(weight,distance));
});

//5:Function to calculate the loyalty points earned from a purchase
function loyaltyPoint(purchaseAmount) {
  let loyaltypoint=2*purchaseAmount;
  return loyaltypoint.toString();
}
//5:Function to calculate the loyalty points earned from a purchase
app.get('/loyalty-points',(req,res)=>{
  let purchaseAmount=parseFloat(req.query.purchaseAmount);
  res.send(loyaltyPoint(purchaseAmount));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

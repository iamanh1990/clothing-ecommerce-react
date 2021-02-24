import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IOLUMAiMt5PSalNx1UyhpeqOZuaNumoDFeApn9qTxvPAKaCC2IeCLlNrn6DAD3SaX5emAq6Qy1v9HEMjHMdMbTS00JG2s7E42";
  const onToken = (token) => {
    console.log(token);
    alert("Payment successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;

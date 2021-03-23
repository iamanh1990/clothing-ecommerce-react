import React from "react";
import { connect } from "react-redux";
import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.action";
import {
  CheckoutItemContainer,
  CheckoutItemImageContainer,
  TextContainer,
  CheckoutItemQuantity,
  CheckoutItemRemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <CheckoutItemImageContainer>
        <img src={imageUrl} alt="item" />
      </CheckoutItemImageContainer>
      <TextContainer>{name}</TextContainer>
      <CheckoutItemQuantity>
        <div onClick={() => removeItem(cartItem)}>&#10094;</div>
        {quantity}
        <div onClick={() => addItem(cartItem)}>&#10095;</div>
      </CheckoutItemQuantity>
      <TextContainer>{price}</TextContainer>
      <CheckoutItemRemoveButton onClick={() => clearItem(cartItem)}>
        &#10005;
      </CheckoutItemRemoveButton>
    </CheckoutItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);

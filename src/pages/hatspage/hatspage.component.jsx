import React from "react";
import CollectionItem from "../../components/collection-item/collection-item.component";

import data from "../../pages/shoppage/shop.data";
const { items } = data[0];

const HatsPage = () => {
  return (
    <div>
      {items.map(({ id, ...otherProps }) => (
        <CollectionItem key={id} {...otherProps} />
      ))}
    </div>
  );
};

export default HatsPage;

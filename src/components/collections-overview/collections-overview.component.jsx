import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./collections-overview.styles.scss";
import { selectCollectionsForOverview } from "../../redux/shop/shop.selectors";
import CollectionPreview from "../collection-preview/collection-preview.component";

const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...otherProps }) => (
      <CollectionPreview key={id} {...otherProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForOverview,
});

export default connect(mapStateToProps, null)(CollectionsOverview);

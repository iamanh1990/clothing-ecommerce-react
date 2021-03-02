import React from "react";
import { HomePageContainer } from "./homepage.styles";
import Directory from "../../components/directory/directory.component";

const homepage = () => {
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
};

export default homepage;

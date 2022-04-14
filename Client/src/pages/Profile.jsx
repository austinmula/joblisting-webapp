import React from "react";
import { Container } from "@material-ui/core";
import ProfileInner from "../components/Profile";

const Profile = ({ user }) => {
  return (
    <Container>
      <ProfileInner user={user} />
    </Container>
  );
};

export default Profile;

import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Button,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import ProfileForm from "./ProfileForm";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ProfileInner = () => {
  const [open, setopen] = useState(false);
  const { user } = useContext(AuthContext);
  const [bio, setbio] = useState(user.profilebio);
  const [address, setaddress] = useState(user.address);
  const [tel, settel] = useState(user.telnum);
  const location = useLocation();
  const path = location.pathname.split("/")[3];

  function handleClick() {
    setopen(!open);
    console.log(user);
  }

  const handleEdit = async (details) => {
    await axios.put(`http://localhost:4000/api/users/${user._id}`, details);

    setbio(details.profilebio);
    setaddress(details.address);
    settel(details.telnum);
    console.log(details);
  };

  const classes = useStyles();
  return (
    <>
      <BrandCardHeader
        image={
          "https://pngimage.net/wp-content/uploads/2019/05/user-icon-png-blue-.png"
        }
        extra={user && (user.usertype === "employee" ? "Employee" : "Employer")}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title={user ? `${user.firstname} ${user.lastname}` : "username"}
              subheader={user ? `${user.email}` : "email address"}
            />

            <CardContent>
              <Grid spacing={2} container alignItems="center">
                <Grid item xs={12} md={9}>
                  <Divider variant="fullWidth" />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={handleClick}
                  >
                    Edit Profile
                  </Button>
                </Grid>
              </Grid>

              {open && <ProfileForm user={user} handleEdit={handleEdit} />}

              <Typography variant="body1">{bio}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Contact Information" />
            <CardContent>
              <Typography>{address}</Typography>
              <Typography>{tel}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileInner;

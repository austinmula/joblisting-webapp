import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useState } from "react";
// import { useHistory } from "react-router";

const ProfileForm = ({ handleEdit, user }) => {
  const classes = useStyles();
  const [details, setDetails] = useState({
    userId: user._id,
    profilebio: "",
    address: "",
    telnum: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(details);
    setDetails({
      profilebio: "",
      address: "",
      telnum: "",
    });
  };

  return (
    <>
      <form action="" className={classes.form} onSubmit={handleSubmit}>
        <TextField
          name="profileBio"
          value={details.profilebio}
          onChange={(e) =>
            setDetails({ ...details, profilebio: e.target.value })
          }
          id="bio"
          fullWidth
          color="secondary"
          variant="outlined"
          placeholder="Give a Brief Description of yourself or your Company"
          multiline
          rows={4}
          className={classes.field}
        />
        <Typography
          variant="subtitle1"
          align="center"
          className={classes.field}
        >
          Edit Contact Info
        </Typography>
        <TextField
          className={classes.field}
          id="physical address"
          name="physical address"
          value={details.address}
          onChange={(e) => setDetails({ ...details, address: e.target.value })}
          label="Address"
          fullWidth
          color="secondary"
          variant="outlined"
          placeholder="Physical Address"
        />
        <TextField
          className={classes.field}
          id="Phone Number"
          name="Phone Number"
          value={details.telnum}
          onChange={(e) => setDetails({ ...details, telnum: e.target.value })}
          label="Tel. No"
          fullWidth
          color="secondary"
          variant="outlined"
          placeholder="Phone number"
        />
        <Button
          className={classes.field}
          type="submit"
          color="primary"
          variant="contained"
        >
          Edit
        </Button>
      </form>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: theme.spacing(1),
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  form: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export default ProfileForm;

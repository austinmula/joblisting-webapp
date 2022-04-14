import React from "react";
import { Container, TextField, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function Search({ query, onQueryChange }) {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper} elevation={4}>
        <TextField
          placeholder="Search for jobs..."
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Paper>
    </Container>
  );
}

export default Search;

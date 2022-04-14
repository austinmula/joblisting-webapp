import React, { useContext, useState } from "react";
import clsx from "clsx";
import { Divider, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import { useHistory, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { MenuListItems } from "./MenuLists";
import grey from "@material-ui/core/colors/grey";
//import { Link } from "react-router-dom";
import { Link } from "@material-ui/core";

const drawerWidth = 240;

const Dashboard = ({ children }) => {
  const classes = useStyles();
  //const history = useHistory();
  //const location = useLocation();
  const { user, dispatch } = useContext(AuthContext);

  const handleLogOut = (user) => {
    dispatch({ type: "LOGOUT" });
  };

  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar
        className={clsx(classes.appbar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link
            href="/"
            className={classes.welcome}
            variant="h5"
            underline="none"
          >
            {`The Freelancer`}
          </Link>

          {user && (
            <>
              <Typography variant="body2" noWrap>
                {user ? `${user.firstname} ${user.lastname}` : "username"}
              </Typography>

              {/* <Avatar className={classes.avatar}>
                {user ? `${user.firstname[0]}${user.lastname[0]}` : "US"}
              </Avatar> */}

              <Button
                className={classes.avatar}
                color="inherit"
                onClick={handleLogOut}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        {/* Links */}

        <MenuListItems user={user} />
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.page}>
          <div className={classes.toolbar}></div>
          {children}
        </div>
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    page: {
      padding: theme.spacing(0),
      minHeight: "70vh",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: grey[800],
    },
    root: {
      display: "flex",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolbar: theme.mixins.toolbar,
    welcome: {
      flexGrow: "1",
      color: grey[50],
    },
    avatar: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      background: "#f9f9f9",
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    hide: {
      display: "none",
    },
  };
});

export default Dashboard;

import React from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import AddCircleIcon from "@material-ui/icons/AddCircle";
// import DonutLargeIcon from "@material-ui/icons/DonutLarge";
// import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { useHistory, useLocation } from "react-router";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const useStyles = makeStyles((theme) => {
  return {
    active: {
      backgroundColor: theme.palette.primary.dark,
      color: "#f3f3f3",
    },
    icon: {
      color: "#fff",
    },
  };
});

export const MenuListItems = ({ user }) => {
  const history = useHistory();
  const location = useLocation();
  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/thefreelancer",
      color: "secondary",
    },
    {
      text: "Profile",
      icon: <PersonIcon />,
      path: `/thefreelancer/profile/${user.firstname}${user.lastname}`,
      color: "secondary",
    },
    {
      text: "Posts",
      icon: <ListAltIcon />,
      path: "/thefreelancer/posts",
      color: "secondary",
    },
  ];

  const classes = useStyles();

  return (
    <>
      <List className={classes.icon}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => history.push(item.path)}
            className={location.pathname === item.path ? classes.active : null}
          >
            <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {user.isAdmin && (
          <ListItem
            button
            onClick={() => history.push("/thefreelancer/admin")}
            className={
              location.pathname === "/thefreelancer/admin"
                ? classes.active
                : null
            }
          >
            <ListItemIcon className={classes.icon}>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItem>
        )}
      </List>
    </>
  );
};

// export const EmployeeListItems = () => {
//   const history = useHistory();
//   const location = useLocation();
//   const menuItems = [
//     {
//       text: "Find Jobs",
//       icon: <AddCircleIcon />,
//       path: "/employee",
//       color: "secondary",
//     },
//     {
//       text: "My Jobs",
//       icon: <DonutLargeIcon />,
//       path: "/employee/myposts",
//       color: "secondary",
//     },
//     {
//       text: "Completed Jobs",
//       icon: <CheckCircleOutlineIcon />,
//       path: "/fulfilled",
//       color: "secondary",
//     },
//   ];

//   const classes = useStyles();

//   return (
//     <>
//       <List className={classes.icon}>
//         {menuItems.map((item) => (
//           <ListItem
//             key={item.text}
//             button
//             onClick={() => history.push(item.path)}
//             className={location.pathname === item.path ? classes.active : null}
//           >
//             <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//     </>
//   );
// };

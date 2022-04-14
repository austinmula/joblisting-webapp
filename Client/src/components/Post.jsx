import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import {
  CardActions,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { deepPurple, green, grey, yellow } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { format } from "timeago.js";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    backgroundColor: grey[300],
  },
  avatar: {
    backgroundColor: deepPurple[700],
  },
  link: {
    flexGrow: 1,
  },
  completed: {
    color: green[500],
  },
  star: {
    color: (isInterested) => {
      if (isInterested) {
        return yellow[900];
      }
      return grey[500];
    },
  },
}));

const Post = ({ post, user, handleDelete }) => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [interested, setInterested] = useState(post.interestedEmployees.length);
  const [isInterested, setIsInterested] = useState(false);

  useEffect(() => {
    setIsInterested(post.interestedEmployees.includes(user._id));
    const getUserdata = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/users/${post.userId}`
        );
        setfirstname(res.data.firstname);
        setlastname(res.data.lastname);
      } catch (error) {
        console.log(error);
      }
    };

    getUserdata();
  }, [post.userId]);

  const AddtoInterests = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/posts/${id}/interested`,

        {
          userId: user._id,
        }
      );
      setInterested(isInterested ? interested - 1 : interested + 1);
      setIsInterested(!isInterested);
    } catch (err) {
      console.log(err);
    }
  };

  const classes = useStyles(isInterested);
  return (
    <Card className={classes.root} elevation={3}>
      <CardHeader
        avatar={
          <IconButton>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {!firstname ? (
                <CircularProgress />
              ) : (
                `${firstname[0]}${lastname[0]}`
              )}
            </Avatar>
          </IconButton>
        }
        title={post.title}
        subheader={format(post.date)}
        action={
          user &&
          user.usertype === "employer" && (
            <IconButton onClick={() => handleDelete(post._id)}>
              <DeleteIcon />
            </IconButton>
          )
        }
      />
      {user.usertype === "employer" && (
        <CardContent className={classes.content} component="div">
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            //noWrap={user.usertype === "employee" && true}
          >
            {post.summary}
          </Typography>
        </CardContent>
      )}

      <CardActions>
        {user.usertype === "employee" && (
          <IconButton
            onClick={() => AddtoInterests(post._id)}
            aria-label="add to favorites"
          >
            <StarIcon color="primary" className={classes.star} />
          </IconButton>
        )}
        <Typography
          variant="body2"
          noWrap
        >{`${interested} employees`}</Typography>
        <Link
          to={`/thefreelancer/post/${post._id}`}
          style={{ textDecoration: "none" }}
          className={classes.link}
        >
          <Button size="small" variant="contained" disableElevation>
            More...
          </Button>
        </Link>

        {post.isfullfilled && (
          <IconButton aria-label="completed-job">
            <CheckCircleOutlineIcon className={classes.completed} />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;

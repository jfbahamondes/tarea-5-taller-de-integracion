import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  })
);

export default function SearchBar() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  function handleSearch() {
    window.location.href = `/tarea-5-taller-de-integracion/#/search/${search}`;
  }

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
        placeholder="Search on Wiki"
        inputProps={{ "aria-label": "search on wiki" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

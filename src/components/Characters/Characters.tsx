import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Box, Pagination, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getCharactersFilterThunk, getCharactersThunk} from "../../redux/reducers/characterReducer";
import {Link, useLocation} from "react-router-dom";
import Character from "./Character";
import Preloader from "../Preloader";
import useDebounce from "../../hooks/useDebounce";
import {getCharactersFilter} from "../../api/charactersAPI";

let StyledCharactersList = {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 auto",
    textAlign: "center",
    justifyContent: "space-around",
    backgroundColor: "#FBF976",
}
let StyledPagiation = {
    background: "linear-gradient(0deg, rgba(251,249,118,1) 81%, rgba(31,30,70,1) 100%)",
    height: "70px",
    margin: "0 auto",
    lineHeight: "50px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
}

const Characters = () => {
    let Chtrs = useSelector((state:any):Array<any> => state.characters.charactersArray);
    let pages = useSelector((state:any):number => state.characters.pages);
    let currentPage = useSelector((state:any):number => state.characters.currentPage);
    let dispatch = useDispatch();
    let inputRef = useRef();
    let [val, setVal] = useState("");
    let debounceValue = useDebounce(val);
    let CharactersList = useMemo(()=>Chtrs.map((el:any) => {
        return <Character key={el.id} id = {el.id} name={el.name} url={el.image}/>}),[Chtrs]);


    useEffect(()=> {
        dispatch(getCharactersThunk(currentPage));
    },[]);

    useEffect(()=>{
        if (!debounceValue) return;
        dispatch(getCharactersFilterThunk(debounceValue));
    },[debounceValue])

    let changePage = (e: React.ChangeEvent<unknown>, value: number) => {
        dispatch(getCharactersThunk(value));
    }
    let location = useLocation();


    return (
        <Box>
            <Box sx={StyledPagiation}>
                <Pagination count={pages} page={currentPage} size="large" onChange={changePage} />
                <TextField ref={inputRef} id="outlined-basic" label="Outlined" variant="outlined"
                           onChange={(event)=>{setVal(event.target.value)}}
                           value={val}/>
            </Box>
            <Box sx={StyledCharactersList}>
                {(Chtrs) ? CharactersList : <Preloader/>}
            </Box>
        </Box>
    );
};

export default Characters;
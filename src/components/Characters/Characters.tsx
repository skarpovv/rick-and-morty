import React, {useEffect, useMemo, useRef} from 'react';
import {Box, Pagination, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getCharactersThunk, onTextChange} from "../../redux/reducers/characterReducer";
import Character from "./Character";
import useDebounce from "../../hooks/useDebounce";
import CloseIcon from '@mui/icons-material/Close';

let StyledInput = {
    flexGrow: "1",
}

let StyledCharactersList = {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 auto",
    textAlign: "center",
    justifyContent: "space-around",
    maxWidth: "1800px",
    alignItems: "center",
    backgroundColor: "#FEFBE8",
    height: "100%",
}
let StyledPagiation = {
    background: "linear-gradient(0deg, rgba(254,251,232,1) 2%, rgba(0,181,204,1) 100%)",
    margin: "0 auto",
    lineHeight: "50px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "column",
    padding: "0 15px",
    "& nav":{
        minWidth: "343px",
    },
    "& label":{
        color: "black",
    }
}

const Characters = () => {
    let Chtrs = useSelector((state:any):Array<any> => state.characters.charactersArray);
    let pages = useSelector((state:any):number => state.characters.pages);
    let currentPage = useSelector((state:any):number => state.characters.currentPage);
    let val = useSelector((state:any):string => state.characters.inputValue);
    let dispatch = useDispatch();
    let inputRef = useRef();
    let debounceValue = useDebounce(val);
    let firstRender = useRef(true);

    let CharactersList = useMemo(()=>Chtrs.map((el:any) => {
        return <Character key={el.id} id = {el.id} name={el.name} url={el.image}/>}),[Chtrs]);

    useEffect(()=> {
        if (Chtrs.length !== 0) return;
        dispatch(getCharactersThunk(currentPage));
    },[]);

    useEffect(()=> {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        dispatch(getCharactersThunk(1,debounceValue))
    },[debounceValue]);

    let changePage = (e: React.ChangeEvent<unknown>, value: number) => {
        dispatch(getCharactersThunk(value, val));
    }


    return (
        <Box sx={{height: "100%"}}>
            <Box sx={StyledPagiation}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <TextField sx={StyledInput} ref={inputRef} id="outlined-basic" label="Character..."  variant="standard"
                               onChange={(event)=>{dispatch(onTextChange(event.target.value))}}
                               value={val}/>
                    <CloseIcon onClick={e => {dispatch(onTextChange(""))}}/>
                </Box>
                <Pagination count={pages} page={currentPage} size="medium" onChange={changePage} />
            </Box>
            <Box sx={StyledCharactersList}>
                {(Chtrs.length === 0 && val !== "") ? <h1>No results</h1> : CharactersList}
            </Box>
        </Box>
    );
};

export default Characters;

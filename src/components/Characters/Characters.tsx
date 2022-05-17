import React, {useEffect} from 'react';
import {Box, Pagination} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getCharactersThunk} from "../../redux/reducers/characterReducer";
import {Link, useLocation} from "react-router-dom";
import Character from "./Character";

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
    height: "50px",
    margin: "0 auto",
    lineHeight: "50px",
    display: "flex",
    justifyContent: "center",
}

const Characters = () => {
    let Chtrs = useSelector((state:any):Array<any> => state.characters.charactersArray);
    let pages = useSelector((state:any):number => state.characters.pages);
    let currentPage = useSelector((state:any):number => state.characters.currentPage);
    let dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getCharactersThunk(currentPage));
    },[]);

    let changePage = (e: React.ChangeEvent<unknown>, value: number) => {
        dispatch(getCharactersThunk(value));
    }
    let location = useLocation();


    return (
        <Box>
            <Box sx={StyledPagiation}>
                <Pagination count={pages} page={currentPage} size="large" onChange={changePage} />
            </Box>
            <Box sx={StyledCharactersList}>

                {(Chtrs) ? Chtrs.map((el:any) => {
                    return <Character key={el.id} id = {el.id} name={el.name} url={el.image}/>
                }) : <div>Loading</div>}
            </Box>
        </Box>
    );
};

export default Characters;
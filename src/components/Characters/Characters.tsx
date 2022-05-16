import React, {useEffect} from 'react';
import {Box, Pagination} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getCharactersThunk} from "../../redux/reducers/characterReducer";
import {useLocation} from "react-router-dom";

const Characters = () => {
    let Chtrs = useSelector((state:any):Array<any> => state.characters.charactersArray);
    let dispatch = useDispatch();

    useEffect(()=> {
        console.log("Effect");
        dispatch(getCharactersThunk());
    },[]);

    let changePage = (e: React.ChangeEvent<unknown>, value: number) => {
        dispatch(getCharactersThunk(value));
    }
    let location = useLocation();


    return (
        <Box>
            <Pagination count={42} size="large" onChange={changePage} />
            <Box sx={{display: "flex", flexWrap: "wrap"}}>
                {(Chtrs) ? Chtrs.map((el:any) => {
                    return <div> <img src={el.image}/> {el.name} </div>
                }) : <div>undef</div>}
            </Box>
        </Box>
    );
};

export default Characters;
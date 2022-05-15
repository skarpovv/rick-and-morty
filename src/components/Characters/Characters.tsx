import React, {useEffect, useState} from 'react';
import {Box, Pagination} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getCharactersThunk} from "../../redux/reducers/characterReducer";

const Characters = () => {
    let Chtrs = useSelector((state:any):Array<any> => state.characters.charactersArray);
    let dispatch = useDispatch();

    useEffect(()=> {
        console.log("Effect");
        dispatch(getCharactersThunk());
    },[]);

    return (
        <Box>
            <Pagination count={20} size="large" />
            <Box>
                {(Chtrs) ? Chtrs.map((el:any) => {
                    return <div> {el.name} </div>
                }) : <div>undef</div>}
            </Box>
        </Box>
    );
};

export default Characters;
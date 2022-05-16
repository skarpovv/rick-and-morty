import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getCharacterThunk} from "../../redux/reducers/characterReducer";
import {useDispatch, useSelector} from "react-redux";



const CharacterPage = () => {
    let param = useParams();
    let dispatch = useDispatch();
    let person = useSelector((state:any) => state.characters.character);

    useEffect(() => {
        dispatch(getCharacterThunk(param.id));
    },[])

    return (
        (person) ?
        <div>
            <img src={person.image}></img>
            <div>{person.name}</div>
            <div>{person.status}</div>
        </div>
            :
            <div>
                Loading
            </div>
    );
};

export default CharacterPage;
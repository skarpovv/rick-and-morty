import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";
import Preloader from "../Preloader";
import {getLocationThunk} from "../../redux/reducers/locationReducer";
import {useNavigate, useParams} from "react-router-dom";
import Character from "../Characters/Character";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const StyledLocationPage = {
    textAlign: "center",
    "h1":{
        fontWeight: "300",
        fontSize:"36px",
        marginTop: "0px",
        "span":{
            padding: "5px",
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "5px",
        }
    },
    ".arrowBack":{
        textAlign: "start",
        padding: "20px 20px 0px 20px",
        cursor: "pointer",
    }
}

const LocationPage = () => {
    let location = useSelector((state:any) => state.locations.location);
    const dispatch = useDispatch();
    const param = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);


    useEffect(()=>{
        dispatch(getLocationThunk(param.id));
    },[]);


    return (
        (location)
            ?
            <Box sx={StyledLocationPage}>
                <div className="arrowBack"><ArrowBackIosIcon onClick={()=>{goBack()}}/></div>
                <h1><span>{location.name}</span></h1>
                <h2>{location.type}</h2>
                <h2>{location.dimension}</h2>
                <h2>Location Residents: </h2>
                <div style = {{display: "flex", flexWrap: "wrap", justifyContent: "space-around", maxWidth: "900px", margin: "0 auto"}}>
                    {(location.residents && location.residents.length === 0) ? <h2>No results</h2> : <></>}
                    {location.residents && location.residents.map((el:any) => {
                        return <Character size={145} key={el.id} name={el.name} url={el.image} id={el.id}/>
                    }) }
                </div>
            </Box>
            :
            <Preloader/>
    );
};

export default LocationPage;
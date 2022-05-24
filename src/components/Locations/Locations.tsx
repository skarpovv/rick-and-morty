import React, {useEffect} from 'react';
import {Box, Pagination} from "@mui/material";
import {getLocationsThunk} from "../../redux/reducers/locationReducer";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../Preloader";
import {Link} from "react-router-dom";


const StyledLocations = {

    ".se":{backgroundColor: "#ddd", borderRadius: "5px", padding: "3px"},
    ".episode":{
        ":hover":{
            backgroundColor: "#bbb",
            "span":{
                backgroundColor: "#333",
                color: "#fff",
            }
        },
        textAlign: "center",
        "h5":{
            marginBottom: "3px",
        },
        "h4":{
            marginTop: "10px",
            marginBottom: "0px",
            paddingBottom: "10px",
            fontWeight: "300",
            fontSize: "28px",
        },
        backgroundColor: "#eee",
    },
};

const Locations = () => {
    let locations = useSelector((state:any) => state.locations.locationsArray);
    let pages = useSelector((state:any) => state.locations.pages);
    let currentPage = useSelector((state:any) => state.locations.currentPage);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getLocationsThunk(1));
    },[])

    const changePage = (e: React.ChangeEvent<unknown>, value: number) => {
        dispatch(getLocationsThunk(value))
    }

    return (
        (locations)
            ?
            <Box sx={StyledLocations}>
                <Pagination count={pages} page={currentPage} size="medium" onChange={changePage} />
                {locations.map((el:any) => {
                    return (
                        <Link key={el.id} to={""+el.id}>
                            <div className="episode">
                                <h5><span className="se">{el.type}</span></h5>
                                <h4>{el.name}</h4>
                                {/*<h4>{el.dimension}</h4>*/}
                            </div>
                        </Link>
                    )
                })}
            </Box>
            :
            <Preloader/>
    );
};

export default Locations;
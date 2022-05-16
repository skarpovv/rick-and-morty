import React from 'react';
type CharacterPagePropsType = {
    name: string,
    status: string,
    species: string,
    gender: string,
    origin: {
        name: string,
        url: string,
    },
    location: {
        "name": string,
        "url": string,
    },
    image: string,
    episode: Array<string>,
    url: string,
    created?:string,
}

const CharacterPage = (props: CharacterPagePropsType) => {



    return (
        <div>

        </div>
    );
};

export default CharacterPage;
import * as React from 'react';
import likeIconFilled from "../assets/like-icon-filled.svg";
import likeIconEmpty from "../assets/like-icon-empty.svg";
import {IPeople} from "swapi-ts";

export type Props = {
    name: IPeople['name']
    isFavourite: boolean;
    onFavouriteClick: (name:IPeople['name'])=>void
};
export const ListItem = ({name,isFavourite,onFavouriteClick}: Props) => {
    return (
        <div className="p-2 bg-gray-900 m-2 rounded-xl flex max-w-lg">
            <div className="text-lg mx-4 my-auto flex-1">{name}</div>
            <div className="flex">
                <button className="text-base rounded-xl bg-gray-800 py-2 px-4 hover:bg-gray-700">
                    MORE INFORMATION
                </button>
                <button className="my-auto h-full ml-4" onClick={() => onFavouriteClick(name)}>
                    <img
                        className="w-8 h-8 my-auto"
                        src={isFavourite ? likeIconFilled : likeIconEmpty}
                    />
                </button>
            </div>
        </div>
    );
};

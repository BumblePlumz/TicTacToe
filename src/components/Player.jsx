import { useState } from "react";

export default function Player({name: initialName, playerSymbol, isActive, onChangeName}){
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEditing(){
        setIsEditing(editing => !editing);
        onChangeName(playerSymbol, playerName);
    }

    function handleChange(event){
        console.log(event);
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className='player-name'>{playerName}</span>;
    // let playerSymbol = <span className='player-symbol'>{symbol}</span>;
    let buttonCaption = "Edit";

    if (isEditing){
        editablePlayerName = <input type='text' maxLength={12} require="true" value={playerName} onChange={handleChange}/>;
        // playerSymbol = <input type='text' maxLength={12} require value={symbol} />;
        buttonCaption = "Save";
    }


    return(
        <li className={isActive ? "active" : undefined}>
        <span className="player">
            {editablePlayerName}
            {playerSymbol}
        </span>
        <button onClick={handleEditing}>{buttonCaption}</button>
      </li>
    )
}
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function Gameboard({onSelectSquare, turns}){
    // const [gameboard, setGameboard] = useState();

    // function handleSelectSquare(rowIndex, colIndex){
    //     setGameboard((prevGameboard) => {
    //         const updatedBoard = [...prevGameboard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }

    let gameboard = initialGameBoard;
    for (const turn of turns){
        const { square, player } = turn;
        const { row, col } = square;

        gameboard[row][col] = player;
    }

    return (
        <ol id="game-board">
            {gameboard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                    </li>
                    ))}
                </ol>
            </li>)}
        </ol>
    )
}
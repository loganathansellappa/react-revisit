import {useCallback, useState} from "react";

type TicTacToeProps = {
    boardSize: number
}

const generateBoard = (size: number) => {
    const board = []
    for(let i=0; i< size; i++) {
        board.push(new Array(size).fill(''))
    }
    return board;
}

const checkWinner = (board: Array<Array<number | string>>) => {
    // horizontal
    for(const row of board) {
        const rowSet = new Set([...row])
        if(rowSet.size === 1 && !rowSet.has("")) {
            return true
        }
    }
    // vertical
    for(let i=0; i < board.length; i++) {
        const colSet = new Set()
        for(const row of board) {
            colSet.add(row[i])
        }
        if(colSet.size === 1 && !colSet.has("")) {
            return true
        }
    }
    //diagonal
    const mainDiagonal = new Set()
    const rightDiagonal = new Set()
    for(let i=0; i < board.length; i++) {
        const leftIndex = i;
        const rightIndex = board.length-1-i;
        mainDiagonal.add(board[i][leftIndex])
        rightDiagonal.add(board[i][rightIndex])
    }
    if(mainDiagonal.size === 1 && !mainDiagonal.has("")) {
        return true
    }
    if(rightDiagonal.size === 1 && !rightDiagonal.has("")) {
        return true
    }
}

export const TicTacToe: React.FC<TicTacToeProps> = ({ boardSize = 3}: TicTacToeProps) => {
    const [board, setBoard] = useState(generateBoard(boardSize))
    const [currentPlayer, setCurrentPlayer] = useState('x')
    const [isWinner, setIsWinner] = useState(false)

    const handleCLick = useCallback((row: number, cell: number) => {
        board[row][cell] = currentPlayer
        setBoard([...board])
        if (checkWinner(board)) {
            setIsWinner(!isWinner)
            return;
        }
        setCurrentPlayer(currentPlayer === 'x' ? 'y' : 'x')
    },[board])
    const boardEl = () => {
        return board.map((row, rowNumber) => {
            return(<div key={rowNumber} style={{backgroundColor: "wheat", display: "flex"}}>
                {
                    row.map((cell, cellNumber) =>  <div key={rowNumber-cellNumber} style={{border: "0.5px solid red", height: "100px", width: "100px", textAlign: "center", lineHeight: "100px"}} onClick={() => handleCLick(rowNumber,cellNumber)}>{cell}</div>)
                }
            </div>)
        })
    }

    return (
        <div style={{display: "flex", flexDirection: "column",justifyContent: "center", justifyItems: "center", alignItems: "center"}}>
            {
                (isWinner ? `Player ${currentPlayer} Won` : '')
            }
            {
                boardEl()
            }
        </div>
    )
}
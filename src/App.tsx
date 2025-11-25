import { useRef, useState } from 'react'
import './App.css'
import { Chessboard, type PositionDataType, type ChessboardOptions } from 'react-chessboard'
import { fenToObject, objectToFen } from './utils';

const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

function App() {
  const [position, setPosition] = useState<PositionDataType>(fenToObject(initialPosition));

  const options: ChessboardOptions = {
    onPieceDrop: ({ piece: { pieceType, isSparePiece }, sourceSquare, targetSquare }) => {
      if(isSparePiece) return false;

      setPosition(({ [sourceSquare]: _, ...rest }) => ({ ...rest, [targetSquare!]: { pieceType } }));

      return true;
    },
    position
  };

  return (
    <div className='h-svh w-svw flex flex-col justify-center items-center'>
      <h1>Onchain Chess</h1>
      <div className='w-fit max-w-2/6 max-h-10/12'>
        <Chessboard options={options} />
      </div>
    </div>
  )
}

export default App

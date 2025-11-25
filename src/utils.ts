export type PositionObject = {
    [position: string]: { pieceType: string }
}

const nextCharCode = (ch: string, increment: number = 1): string => {
    if (ch.length > 1) {
        throw new Error("expected unit length input");
    }
    const charCode = ch.charCodeAt(0);
    const nextCharCode = charCode + increment;
    return String.fromCharCode(nextCharCode);
}

export const fenToObject = (posString: string): PositionObject => {
    const newObject: PositionObject = {};
    let row = 8;
    let col = "a";
    for (const piece of posString) {
        if (/[1-8]/.test(piece)) {
            //handle numbers or empty squares
            col = nextCharCode(col, Number(piece));
        } else if (/[a-z]/.test(piece)) {
            //handle black piece
            newObject[col + row] = { pieceType: "b" + piece.toUpperCase() };
            col = nextCharCode(col);
        } else if (/[A-Z]/.test(piece)) {
            //handle white piece
            newObject[col + row] = { pieceType: "w" + piece.toUpperCase() };
            col = nextCharCode(col);
        } else {
            //handle new row
            row--;
            col = "a";
        }
    }

    return newObject;
}

export const objectToFen = (object: PositionObject): string => {
    let fenString = "";

    const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let emptyCount = 0;
    for (let i = 8; i > 0; i--) {
        for (const col of cols) {
            const key = col + i;
            const { pieceType } = object[key] ?? { pieceType: "" };
            if (pieceType) {
                fenString += (emptyCount > 0 ? emptyCount : "")
                    + (pieceType.charAt(0) === "b" ?
                        pieceType.charAt(1).toLowerCase() :
                        pieceType.charAt(1).toUpperCase());
                emptyCount = 0;
            } else {
                emptyCount++;
            }
        }
        if (emptyCount > 0) {
            fenString += emptyCount;
            emptyCount = 0;
        }
        if (i > 1) {
            //we don't want this at the last
            fenString += "/";
        }
        console.log("intermediate fenString: ", fenString);
    }

    return fenString;
}
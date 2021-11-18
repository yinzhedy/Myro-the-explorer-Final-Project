import {useState} from 'react';

export default function useWalk(maxSteps) {
    // STATES
    const [position, setPosition] = useState({x:0, y:0})
    // zero maps to down, getter is dir, setter is setDir
    const [dir, setDir] = useState(0)
    // one step forward
    const [step, setStep] = useState(0)

    // turns directions into integer value
    const directions = {
        down:0,
        left:1,
        right:2,
        up:3,
    };
    const stepSize = 16;

    const modifier = {
        down: { x:0, y:stepSize},
        left: {x: -stepSize, y:0},
        right: {x: stepSize, y: 0},
        up: {x:0, y: -stepSize}
    }

    function walk(dir) {

        setDir(prev => {
            if(directions[dir] === prev) move(dir)
            return directions[dir]
        })
        setStep(prev => prev < maxSteps -1 ? prev +1 : 0)
    }

    function move(dir) {

        if((prev.x + modifier[dir].x) > 20 ) {
            return;
        }
        else if((prev.x + modifier[dir].x) < 20) {
            return;
        }
        if((prev.y + modifier[dir].y) > 20 ) {
            return;
        }
        else if((prev.y + modifier[dir].y) < 20) {
            return;
        }
        else {              
        setPosition(prev => ({
            x: prev.x + modifier[dir].x,
            y: prev.y + modifier[dir].y
        }))}
    }
    return {
        walk,
        dir,
        step,
        position,
    }

}




export default function _collide(dirX, dirY) {
    let row, column;
    // -1 in right and bottom is because image ranges from 0..63
    // and not up to 64
    const left = this.x - this.width / 2;
    const right = this.x + this.width / 2 - 1;
    const top = this.y - this.height / 2;
    const bottom = this.y + this.height / 2 - 1;

    // check for collisions on sprite sides
    const collision =
        this.map.isSolidTileAtXY(left, top) ||
        this.map.isSolidTileAtXY(right, top) ||
        this.map.isSolidTileAtXY(right, bottom) ||
        this.map.isSolidTileAtXY(left, bottom);
    if (!collision) { return; }

    if (dirY > 0) {
        row = this.map.getRow(bottom);
        this.y = -this.height / 2 + this.map.getY(row);
    }
    else if (dirY < 0) {
        row = this.map.getRow(top);
        this.y = this.height / 2 + this.map.getY(row + 1);
    }
    else if (dirX > 0) {
        column = this.map.getColumn(right);
        this.x = -this.width / 2 + this.map.getX(column);
    }
    else if (dirX < 0) {
        column = this.map.getColumn(left);
        this.x = this.width / 2 + this.map.getX(column + 1);
    }
};


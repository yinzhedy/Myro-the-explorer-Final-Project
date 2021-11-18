import React from "react";
import Actor from "../actor/index"
import useKeyPress from '../../hooks/use-key-press'
import useWalk from '../../hooks/use-walk'

export default function Player({skin}) {
    const {dir, step, walk, position} = useWalk(3)
    const data = {
        h: 32,
        w: 32,
    };

    if(position.y < 150) {
        position.y = 150
    }
    if(position.x < 100) {
        position.x = 100
    }
    if(position.x > 900) {
        position.x = 900
    }
    if(position.y > 900) {
        position.y = 900
    }
    // turns directions into integer value
    // const directions = {
    //     down:0,
    //     left:1,
    //     right:2,
    //     up:3,
    // }
    // use hook that captures key press and translates into a direction (up, down, left, right)
    useKeyPress((e) => {
        // if(position.y > 800) {
        //     position.y = (position.y-1)
        // }
        // else if(position.x > 800) {
        //     position.x = (position.x -1)
        // }
        // else {
        // const dir = e.key.replace("Arrow", "").toLowerCase();
        walk(e.key.replace("Arrow", "").toLowerCase())
        // if(directions.hasOwnProperty(dir)) console.log(dir);
        // debugging statement
        e.preventDefault();
        // }
    })

    return (
        <div className="zone-container">
            <Actor 
            sprite={`/sprites/skins/${skin}.png`}
            data={data}
            step={step}
            dir={dir}
            position={position}/>
        </div>
    )
}

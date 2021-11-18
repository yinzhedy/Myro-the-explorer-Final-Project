import React from "react";
import Actor from "../actor/index"
import useKeyPress from '../../hooks/use-key-press'
import randomWalk from "../../hooks/random-walk";
import useRandomWalk from "../../hooks/random-walk";

export default function MonsterNumberOne({skin}) {
    const {dir, step, walk, position} = randomWalk(3)
    const data = {
        h: 32,
        w: 32,
    };
    
    if(position.y < 900) {
        position.y = 900
    }
    if(position.x < 100) {
        position.x = 100
    }
    if(position.x > 500) {
        position.x = 500
    }
    if(position.y > 1000) {
        position.y = 1000
    }

    const directions = ['down', 'left', 'up', 'right']
    const randomDirection = Math.floor(Math.random() * directions.length);
    console.log(randomDirection, directions[randomDirection])
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
        walk(directions[randomDirection])
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

import React from "react";
import useKeyPress from '../../hooks/use-key-press'
import useRandomWalk from "../../hooks/random-walk";
import Actor from "../actor";

export default function Leaf({skin}) {
    const {dir, step, walk, position} = useRandomWalk(3)
    const data = {
        h: 32,
        w: 32,
    };

    if(position.y > -700) {
        position.y = -700
    }
    if(position.x < 200) {
        position.x = 200
    }
    if(position.x > 900) {
        position.x = 900
    }
    if(position.y < -950) {
        position.y = -950
    }

    const directions = ['down', 'left', 'up', 'right']
    const randomDirection = Math.floor(Math.random() * directions.length);
    // console.log(randomDirection, directions[randomDirection])
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
            <div>x:<span id="laurel-location-x">{position.x}</span></div>
            <div>y:<span id="laurel-location-y">{position.y}</span></div>
            <Actor 
            sprite={`/sprites/skins/${skin}.png`}
            data={data}
            step={step}
            dir={dir}
            position={position}/>
        </div>
    )
}

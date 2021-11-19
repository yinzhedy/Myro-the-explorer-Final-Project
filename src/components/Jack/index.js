import React from "react";
import useKeyPress from '../../hooks/use-key-press'
import useRandomWalk from "../../hooks/random-walk";
import Actor from "../actor";

export default function Jack({skin}) {
    const {dir, step, walk, position} = useRandomWalk(3)
    const data = {
        h: 32,
        w: 32,
    };

    if(position.y < 225) {
        position.y = 225
    }
    if(position.x < 225) {
        position.x = 225
    }
    if(position.x > 380) {
        position.x = 380
    }
    if(position.y > 380) {
        position.y = 380
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
            <Actor 
            sprite={`/sprites/skins/${skin}.png`}
            data={data}
            step={step}
            dir={dir}
            position={position}/>
        </div>
    )
}

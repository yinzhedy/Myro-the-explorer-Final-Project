import React from "react";
import Actor from "../../../public/";
import useKeyPress from '../../hooks/use-key-press'
import useRandomWalk from "../../hooks/random-walk";
import CollectMonsterPosition from "../../classes/collect-monster-position";


export default function NewMonster() {
    const {dir, step, walk, position} = useRandomWalk(3)
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

    const skins = ['$Lando124', '$Lando138', '$Lando166', '$Lando123', '$Lando108'];
    let randomNum = (Math.round(Math.random() * (4 - 0 + 1) + 0))
            function randomSkin() {
                console.log(randomNum)
                console.log(skins[randomNum])
                return (skins[randomNum]);
            }


    randomSkin();

    const directions = ['down', 'left', 'up', 'right']
    const randomDirection = Math.floor(Math.random() * directions.length);
    
    // use hook that captures key press and translates into a direction (up, down, left, right)
    useKeyPress((e) => {
        walk(directions[randomDirection])
        CollectMonsterPosition(position.x, position.y);
        e.preventDefault();
        // }
    })

    return (
        <div className="zone-container">
            <div>Monster #1 Position:</div>
            <div>x:<span id="monster-location-x">{position.x}</span></div>
            <div>y:<span id="monster-location-y">{position.y}</span></div>
            <Actor 
            sprite={`/sprites/skins/${skin}.png`}
            data={data}
            step={step}
            dir={dir}
            position={position}/>
        </div>
    )
}

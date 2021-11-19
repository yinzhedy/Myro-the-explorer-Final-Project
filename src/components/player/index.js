import React from "react";
import Actor from "../actor";
import useKeyPress from '../../hooks/use-key-press'
import useWalk from '../../hooks/use-walk'
import CollectPlayerPosition from "../../classes/collect-player-position";
import ComarePositions from "../../classes/compare-positions";
import App from "../../App";

let hp = 100;

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

    // use hook that captures key press and translates into a direction (up, down, left, right)
    useKeyPress((e) => {
        e.preventDefault();
        walk(e.key.replace("Arrow", "").toLowerCase())
        // if(directions.hasOwnProperty(dir)) console.log(dir);
        // debugging statement
        // CollectPlayerPosition(position.x, position.y)
        // // .then((x, y) => {
        // ComarePositions(position.x, position.y)
        
        // })
        // e.preventDefault();
        // }
        let heroLocationX = document.getElementById('hero-location-x').textContent
        let heroLocationY = document.getElementById('hero-location-y').textContent
        console.log(heroLocationX, heroLocationY)
        let monsterLocationX = document.getElementById('monster-location-x').textContent
        let monsterLocationY = document.getElementById('monster-location-y').textContent
        let monsterTwoLocationX = document.getElementById('monster-two-location-x').textContent
        let monsterTwoLocationY = document.getElementById('monster-two-location-y').textContent
        console.log(hp)

        function deductHitPointOnCollision() {
            let hitPointsDisplay = document.getElementById('HP')
            
            if( ((heroLocationY < monsterLocationY + 20) && (heroLocationY > monsterLocationY - 20))
                 && ((heroLocationX < monsterLocationX + 20) && (heroLocationX > monsterLocationX - 20))) 
                 {
                console.log("COLLISION WITH MONSTER ONE!");
               return (hp = hp-1);
            }
            if( ((heroLocationY < monsterTwoLocationY + 20) && (heroLocationY > monsterTwoLocationY - 20))
                 && ((heroLocationX < monsterTwoLocationX + 20) && (heroLocationX > monsterTwoLocationX - 20))) 
                 {
                console.log("COLLISION WITH MONSTER TWO!");
               return (hp = hp-1);
            }
            else {
                console.log('no collision yet...')
            }
        }

        deductHitPointOnCollision();
        
    })

    return (
    
        <div className="zone-container">
            <div>HP:</div>
            <div id="HP">{hp}/100</div>
            <div>Hero Position:</div>
            <div>x:<span id="hero-location-x">{position.x}</span></div>
            <div>y:<span id="hero-location-y">{position.y}</span></div>
            <Actor 
            sprite={`/sprites/skins/${skin}.png`}
            data={data}
            step={step}
            dir={dir}
            position={position}/>
        </div>
    )
}

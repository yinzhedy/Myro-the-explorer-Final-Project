import React from "react";
import Actor from "../actor";
import useKeyPress from '../../hooks/use-key-press'
import useWalk from '../../hooks/use-walk'
import CollectPlayerPosition from "../../classes/collect-player-position";
import ComarePositions from "../../classes/compare-positions";
import App from "../../App";



export default function Ghost({skin}) {
    const {dir, step, walk, position} = useWalk(3)
    const data = {
        h: 32,
        w: 32,
    };

    let hp = 50;
    let maxHp = 50;

 
    if(position.y > -150) {
        position.y = -150
    }
    if(position.x < 70) {
        position.x = 70
    }
    if(position.x > 900) {
        position.x = 900
    }
    if(position.y < -950) {
        position.y = -950
    }


    // use hook that captures key press and translates into a direction (up, down, left, right)
    useKeyPress((e) => {
        e.preventDefault();
        walk(e.key.replace("Arrow", "").toLowerCase()) 

        let heroLocationX = document.getElementById('hero-location-x').textContent
        let heroLocationY = document.getElementById('hero-location-y').textContent
        let monsterLocationX = document.getElementById('monster-location-x').textContent
        let monsterLocationY = document.getElementById('monster-location-y').textContent
        let monsterTwoLocationX = document.getElementById('monster-two-location-x').textContent
        let monsterTwoLocationY = document.getElementById('monster-two-location-y').textContent
        let ghostLocationX = document.getElementById('ghost-location-x').textContent;
        let ghostLocationY = document.getElementById('ghost-location-y').textContent;

        function Collision() {
            let hitPointsDisplay = document.getElementById('HP')
            
            if( ((ghostLocationY < monsterLocationY + 20) && (ghostLocationY > monsterLocationY - 20))
                 && ((ghostLocationX < monsterLocationX + 20) && (ghostLocationX > monsterLocationX - 20))) 
                 {
                console.log("GHOST ATTACKED MONSTER ONE!");
                
               return (hp = hp-1);
            }
            if( ((ghostLocationY < monsterTwoLocationY + 20) && (ghostLocationY > monsterTwoLocationY - 20))
                 && ((ghostLocationX < monsterTwoLocationX + 20) && (ghostLocationX > monsterTwoLocationX - 20))) 
                 {
                console.log("GHOST ATTACKED MONSTER TWO!");
               return (hp = hp-1);
            }
            else {
                console.log('no collision yet...')
            }
        }

        

        Collision();
    })

    return (
    
        <div className="zone-container">
            <div>Ghost HP:<div>{hp}/{maxHp}</div></div>
            <div>Ghost Position:</div>
            <div>x:<span id="ghost-location-x">{position.x}</span></div>
            <div>y:<span id="ghost-location-y">{position.y}</span></div>
            <Actor 
            sprite={`/sprites/skins/${skin}.png`}
            data={data}
            step={step}
            dir={dir}
            position={position}/>
        </div>
    )
}

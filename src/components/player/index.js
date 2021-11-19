import React from "react";
import Actor from "../actor";
import useKeyPress from '../../hooks/use-key-press'
import useWalk from '../../hooks/use-walk'

let hp = 100;
let maxHp = 100;
let exp = 0;
let maxExp = 5;
let level = 1;

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

        function expGain() {
            if( ((ghostLocationY < monsterLocationY + 20) && (ghostLocationY > monsterLocationY - 20))
                 && ((ghostLocationX < monsterLocationX + 20) && (ghostLocationX > monsterLocationX - 20))) 
                 {
                console.log("TOOK 1 DAMAGE BUT HERO RECIEVED 1 EXP!");
                
               return (exp = exp + 1);
            }
            if( ((ghostLocationY < monsterTwoLocationY + 20) && (ghostLocationY > monsterTwoLocationY - 20))
                 && ((ghostLocationX < monsterTwoLocationX + 20) && (ghostLocationX > monsterTwoLocationX - 20))) 
                 {
                console.log("TOOK 1 DAMAGE BUT HERO RECIEVED 1 EXP!");
               return (exp= exp  + 1);
            }
            else {
                console.log('looking for monsters.....')
            }

        }

        function levelUp() {
            if(exp === maxExp || exp > maxExp) {
                return (level = level + 1);
            }
            else {
                console.log('what a grind-fest..')
                return;
            }
            return;
        }

        function adjustMaxExp() {
            if(exp === maxExp || exp > maxExp) {
                return (maxExp = Math.round(maxExp + (maxExp * .2)));
            }
            else {
                return;
            }
            return;
        }
        
        levelUp();
        adjustMaxExp();
        expGain();
        console.log(exp);
        Collision();
        
    })

    return (
    
        <div className="zone-container">
            <div id="HP">HP:{hp}/{maxHp}</div>
            <div id="LEVEL">HERO LEVEL: {level}</div>
            <div id="EXP">EXP :{exp}/{maxExp}</div>
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

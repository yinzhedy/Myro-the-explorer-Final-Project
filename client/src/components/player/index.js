import React from "react";
import Actor from "../actor";
import useKeyPress from '../../hooks/use-key-press'
import useWalk from '../../hooks/use-walk'

let hp = 15;
let exp = 0;
let maxExp = 5;
let level = 1;
let maxHp = 15;
let score = 0;
let highScore = 0;

export default function Player({skin}) {
    const {dir, step, walk, position} = useWalk(3)
    const data = {
        h: 32,
        w: 32,
    };
 
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
        let leafLocationX = document.getElementById('leaf-location-x').textContent;
        let leafLocationY = document.getElementById('leaf-location-y').textContent;
        let laurelLocationX = document.getElementById('laurel-location-x').textContent;
        let laurelLocationY = document.getElementById('laurel-location-y').textContent;
        let jackLocationX = document.getElementById('jack-location-x').textContent;
        let jackLocationY = document.getElementById('jack-location-y').textContent;
        let ScoreDisplay = document.getElementById('score').textContent;
        let HighScoreDisplay = document.getElementById('high-score').textContent;
    

        function Collision() {
    
           
        
            
            if( ((heroLocationY < monsterLocationY + 40) && (heroLocationY > monsterLocationY - 40))
                 && ((heroLocationX < monsterLocationX + 40) && (heroLocationX > monsterLocationX - 40))) 
                 {
                console.log("COLLISION WITH MONSTER ONE!");
                    
               return (hp = hp-1);
            }
            if( ((heroLocationY < monsterTwoLocationY + 40) && (heroLocationY > monsterTwoLocationY - 40))
                 && ((heroLocationX < monsterTwoLocationX + 40) && (heroLocationX > monsterTwoLocationX - 40))) 
                 {
                console.log("COLLISION WITH MONSTER TWO!");
               return (hp = hp-1);
            }
            if( ((heroLocationY < leafLocationY + 40) && (heroLocationY > leafLocationY - 40))
                 && ((heroLocationX < leafLocationX + 40) && (heroLocationX > leafLocationX - 40))) 
                 {
                    console.log('Youve met Leaf!')
                    npcHeal();
            }
            if( ((heroLocationY < laurelLocationY + 40) && (heroLocationY > laurelLocationY - 40))
                 && ((heroLocationX < laurelLocationX + 40) && (heroLocationX > laurelLocationX - 40))) 
                 {
                    console.log('Youve met Laurel!')
                    npcHeal();
            }
            if( ((heroLocationY < jackLocationY + 40) && (heroLocationY > jackLocationY - 40))
                 && ((heroLocationX < jackLocationX + 40) && (heroLocationX > jackLocationX - 40))) 
                 {
                    console.log('Youve met Jack!')
                    npcHeal();
            }
            else {
                console.log('no collision yet...')
            }
        };

        function expGain() {
            if( ((ghostLocationY < monsterLocationY + 40) && (ghostLocationY > monsterLocationY - 40))
                 && ((ghostLocationX < monsterLocationX + 40) && (ghostLocationX > monsterLocationX - 40))) 
                 {
                score = score +1;
                ScoreDisplay = score;
                console.log("TOOK 1 DAMAGE BUT HERO RECIEVED 1 EXP!");
                
               return (exp = exp + 1);
            }
            if( ((ghostLocationY < monsterTwoLocationY + 40) && (ghostLocationY > monsterTwoLocationY - 40))
                 && ((ghostLocationX < monsterTwoLocationX + 40) && (ghostLocationX > monsterTwoLocationX - 40))) 
                 {
                score = score +1;
                ScoreDisplay = score;
                console.log("TOOK 1 DAMAGE BUT HERO RECIEVED 1 EXP!");
               return (exp= exp  + 1);
            }
            else {
                console.log('looking for monsters.....')
            }

        };

        function levelUp() {
            if(exp === maxExp || exp > maxExp) {
                return (level = level + 1);
            }
            else {
                console.log('what a grind-fest..')
                return;
            }
            return;
        };

        function adjustMaxExp() {
            if(exp === maxExp || exp > maxExp) {
                return (maxExp = Math.round(maxExp + (maxExp * .2)));
            }
            else {
                return;
            }
            return;
        };
        
        function adjustMaxHp() {
            if(exp === maxExp || exp > maxExp) {
                return (maxHp = 15 + (level - 1))
            }
            else {
                return;
            }
        };


        function npcHeal() {
            console.log("How's it going?");
            if(hp < maxHp) {
                console.log('let me help you out a little...')
                console.log(hp = (hp + ((maxHp - hp) * .5)))
                // restores half of missing hp
                return (hp = hp + (Math.round((maxHp - hp) * .5)))
            }
            else {
                console.log ('I would help you out, but it looks like youre already good to go!')
            }
        }
        
        if (score > highScore) {
            highScore = score;
        }
        function handleDeath() {
            if(hp === 0 || hp < 0) {
                window.location.reload(true)

        }}

        handleDeath();
        levelUp();
        adjustMaxExp();
        adjustMaxHp();
        expGain();
        console.log(exp);
        Collision();
        
    })

    return (
    
        <div className="zone-container">
            <div id="high-score">{highScore}</div>
            <div id="score">SCORE: {score}</div>
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

import React from 'react';
import Sprite from "../sprite/index"

function Actor({ sprite, data, position={x:0, y:0}, step = 0, dir= 0}) {
    // console.log(sprite)
    const {h , w} = data
    return(
        <Sprite
        image={sprite}
        position={position}
        data={{
            x: step * w,
            y: dir * h,
            w,
            h,
        }}
        />
    )
}

export default Actor;
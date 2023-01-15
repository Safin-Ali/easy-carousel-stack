import React, { Children, cloneElement, useEffect, useState } from 'react';
import './style/carousel-slider.css';
import angleLeft from './icon/angle-left-svgrepo-com.svg';
import angleRight from './icon/angle-right-svgrepo-com.svg';

const CarouselWrapper = ({children,itemName,className,duration,loop,active,slideButton, alternate}) => {

    // initialize state for slide item ofset
    const [index,setIndex] = useState(active || 0);

    // initialize state for slide items moving direction
    const [dir,changeDir] = useState(false);

    // initialize state for stop auto change sliding
    const [hovered,setHoverBool] = useState(false);

    // type index
    const increment = 'increment';
    const decrement = 'decrement';
    const auto = 'auto';

    // update slid item transform ofset
    function updateStyle (idx,type) {

        // check indicate type
        if(type === increment){
            idx = idx+1;
            if(idx > Children.count(children)-1) return setIndex(Children.count(children));
            setIndex(index+1);
        } else if (type === decrement)
        {
            idx = idx-1;
            if(idx < 0) return setIndex(0);
            setIndex(index-1);
        };

        if(type === auto){
            runWithAlt();
        }

        const active = `transform: translateX(-${idx * 100}%)`
        
        const collections = document.querySelectorAll(`.carousel-container .${itemName}`);
        collections.forEach(elm => {
            elm.style= active
        });
    };

    // items alternate slide
    function runWithAlt () {

        // when dir value true
        if(dir) {
            if(index === 0){
                return changeDir(false);
            };
            return setIndex(index-1);
        };
        
        if(index === Children.count(children)-1){
            return changeDir(true)
        };
        setIndex(index+1);
    };

    // setInterval function infinite call
    useEffect(()=>{

        // when mouse hover arrow button auto change stop
        if(hovered) return;

        // auto change slide items
        if(loop){
            const loop = setInterval(()=>{
                updateStyle(index,auto);
            },duration * 1000 || 2000);

            //  when component did unmount automatic clear rendering
            return () => clearInterval(loop);
        }
    });

    return (
        <div>

            <div className={`carousel-container ${className}`}>

            {slideButton && <button onMouseOver={()=>setHoverBool(true)} onMouseOut={()=>setHoverBool(false)} onClick={()=>updateStyle(index,decrement)} className={`carousel-indicator indicator-left`}><img src={angleLeft} alt="arrow_left" /></button>}

                    {
                        Children.map(children,child => {
                            return cloneElement(child,{className:`${itemName} carousel-item`,})
                        })
                    }   

            {slideButton && <button onMouseOver={()=>setHoverBool(true)} onMouseOut={()=>setHoverBool(false)} onClick={()=>updateStyle(index,increment)} className={`carousel-indicator indicator-right`}><img src={angleRight} alt="arrow_right" /></button>}
            
            </div>
        </div>
    );
};

export default CarouselWrapper;
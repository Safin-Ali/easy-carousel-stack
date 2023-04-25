import { memo } from 'react';
import { LeftArrow, RightArrow } from '../icon/Arrow';
import { colorCValue } from '../helpers/default-props';
import { sizeCValue } from '../helpers/default-props';
import getDependedIndex from '../helpers/get-depended-index';

interface Props {
    incrementFunc: () => void,
    decrementFunc: () => void,
    colorC: string,
    sizeC: number,
    translateIndex: number,
    childrenLength: number,
    infiniteChange: boolean,
    viewPort: number,
    slide: number,
    centerMode: boolean
}

function ControllerButton({
    incrementFunc = () => { },
    decrementFunc = () => { },
    colorC = colorCValue,
    sizeC = sizeCValue,
    translateIndex = 0,
    childrenLength = 0,
    infiniteChange = false,
    viewPort = 0,
    centerMode = false,
    slide = 1,

}: Props) {

    const conditionalBtnStyle = (type: string) => {

        const { minSlideIndex, maxSlideIndex } = getDependedIndex(infiniteChange, slide, viewPort, childrenLength,centerMode);


        if (!infiniteChange) return;
        if (type === `inc` && translateIndex >= maxSlideIndex) return `controler-arrow-disable`;
        if (type === `dec` && translateIndex <= minSlideIndex) return `controler-arrow-disable`;

    };


    return (
        <>
            <div onClick={ decrementFunc } className={ `controler-arrow ${conditionalBtnStyle(`dec`)} controler-arrow-left` }>
                <LeftArrow colorC={ colorC } sizeC={ sizeC }></LeftArrow>
            </div>
            <div onClick={ incrementFunc } className={ `controler-arrow ${conditionalBtnStyle(`inc`)} controler-arrow-right` }>
                <RightArrow colorC={ colorC } sizeC={ sizeC }></RightArrow>
            </div>
        </>
    );
};

export default memo(ControllerButton);
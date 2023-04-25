import { Fragment, useMemo } from 'react';
import { AIChangeValue, APIType, centerModeValue, changeSpeedValue, childrenValue, colorCValue, sizeCValue, slideControlerValue, slideValue, } from '../helpers/default-props';
import useSliderState from '../helpers/slider-state';
import ControllerButton from './ControllerButton';
import useCenterMode from '../helpers/center-mode';
import getCarouselStyle from '../helpers/get-carousel-mode-style';

function Slider2D({
    children = childrenValue,
    slideControler = slideControlerValue,
    colorC = colorCValue,
    sizeC = sizeCValue,
    alternate = true,
    viewPort = 1,
    slide = slideValue,
    changeSpeed = changeSpeedValue,
    AIChange = AIChangeValue,
    centerMode = centerModeValue
}: APIType) {

    const slideVal = (slide < 3 && slide > 0) ? slide / 2 : slide;

    if (viewPort % slideVal !== 0) {
        throw new Error('Your Viewport And Slide Calculated Values Modulus Not Equal 0')
    };

    const baseCenterIndex = Math.ceil(viewPort/2)

    const { centerIndex, handleCenterIndex } = useCenterMode({
        childrenLength: children.length,
        baseCenterIndex
    });

    const {
        slideItems,
        handleNext,
        handlePrev,
        transition,
        translateIndex,
    } = useSliderState({
        children,
        viewPort,
        alternate,
        slide: slideVal,
        AIChange,
        changeSpeed,
        centerMode,
        centerModeCallBack: handleCenterIndex
    });

    const elementStyle = {
        width: `calc(100% / ${viewPort})`,
    };

    // recreate current component with current slideMode
    const memoItems = useMemo(() => {
        return slideItems.map((elm, idx) => <div
            // aria-level={`slider-2d-${idx + 1}`}
            style={ elementStyle } key={ idx + 1 }
            className={ `${getCarouselStyle(centerMode)}
            ${centerMode && elm.key == centerIndex ? 'carousel-center-active' : 'carousel-center-deactive'}`
            }
        >
            { elm }
        </div>)
    }, [slideItems, centerIndex]);

    return (
        <Fragment>
            <div style={ {
                transform: `translateX(-${translateIndex}%)`,
                transition: `transform ${transition ? '0.3s' : '0s'} linear`,
                display: `flex`,
                width: `100%`,
            } }>
                { memoItems }
            </div>

            {
                slideControler &&
                <ControllerButton
                    childrenLength={ children.length }
                    colorC={ colorC }
                    decrementFunc={ handlePrev }
                    incrementFunc={ handleNext }
                    infiniteChange={ alternate }
                    sizeC={ sizeC }
                    translateIndex={ translateIndex }
                    viewPort={ viewPort }
                    slide={ slideVal }
                    centerMode={centerMode}

                />
            }

        </Fragment>
    );
};

export default Slider2D;
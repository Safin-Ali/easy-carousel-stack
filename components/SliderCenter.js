import React, { Fragment, memo, useMemo } from 'react';
import useSliderState from '../helpers/slider-state';
import ControllerButton from './ControllerButton';
import useCenterMode from '../helpers/center-mode.tsx';
import { defaultProps, propTypes } from '../helpers/default-props';

function SliderCenter({
    children,
    alternate,
    slideControler,
    changeSpeed,
    colorC,
    viewPort,
    slide,
    sizeC,
    centerMode
}) {

    // get and set centerMode index
    const {
        centerIndex,
        handleCenterIndex
    } = useCenterMode({ childrenLength: children?.length });

    // get slide state all functions and value
    const {
        slideItems,
        handlePrev,
        handleNext,
        translateIndex,
        transition,
    } = useSliderState({
        children,
        slide,
        viewPort,
        centerModeCallBack: handleCenterIndex,
        alternate
    });

    const elementStyle = {
        width: `calc(100% / ${viewPort})`,
    };

    // recreate current component with current slideMode
    const memoItems = useMemo(() => {
        return slideItems?.map((elm, idx) => <div
            aria-level={`slider-center-${idx + 1}`}
            style={elementStyle} key={idx + 1}
            className={`carousel-center-items ${elm.key == centerIndex ? 'carousel-center-active' : 'carousel-center-deactive'}`}>
            {elm}
        </div>)
    }, [centerIndex || slideItems]);

    return (
        <Fragment>
            <div style={{
                transform: `translateX(-${translateIndex}%)`,
                transition: `transform ${transition ? '0.3s' : '0s'} linear`,
                display: `flex`,
                width: `100%`,
            }}>
                {memoItems}
            </div>
            {
                slideControler &&
                <ControllerButton
                childrenLength={slideItems?.length}
                colorC={colorC}
                viewPort
                sizeC={sizeC}
                decrementFunc={handlePrev}
                infiniteChange={!alternate}
                incrementFunc={handleNext}>
            </ControllerButton>
            }
        </Fragment>
    );
};

SliderCenter.defaultProps = defaultProps;

SliderCenter.propTypes = propTypes;
export default memo(SliderCenter);
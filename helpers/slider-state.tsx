import { useMemo } from 'react';
import { AIChangeValue, APIType, alternateValue, centerModeCallBackValue, centerModeValue, changeSpeedValue, childrenValue, slideValue, viewPortValue } from './default-props';
import useSliderStateHook from './slider-reducer-state';
import useSliderController from './controller.function';
import useAutoChange from './auto-change';
import getDependedIndex from './get-depended-index';

function useSliderState({
    children = childrenValue,
    viewPort = viewPortValue,
    alternate = alternateValue,
    slide = slideValue,
    AIChange = AIChangeValue,
    changeSpeed = changeSpeedValue,
    centerModeCallBack = centerModeCallBackValue,
    centerMode = centerModeValue
}: APIType) {

    const { maxSlideIndex, minSlideIndex, slidePercentage } = getDependedIndex(alternate, slide, viewPort, children.length, centerMode);

    const {
        handleDispatch,
        slideState,
    } = useSliderStateHook({
        slidePercentage,
        maxSlideIndex,
    });

    const {
        slideItems,
        translateIndex,
        transition,
        slideDirection,
    } = slideState;

    const {
        handleInfinitedNext,
        handleInfinitedPrev,
        handleLimitedNext,
        handleLimitedPrev,
        handleLimitedChangeAI,
        handleInfiniteChangeAI
    } = useSliderController({
        transition,
        slidePercentage,
        translateIndex,
        handleDispatch,
        maxSlideIndex,
        centerModeCallBack,
        AIChange,
        slideDirection
    });

    const handleNext = () => {
        if(centerMode) centerModeCallBack('increment')
        if (!alternate) {
            handleInfinitedNext();
            return;
        };
        handleLimitedNext();
        return;
    };

    const handlePrev = () => {
        if(centerMode) centerModeCallBack('decrement')
        if (!alternate) {
            handleInfinitedPrev();
            return;
        };
        handleLimitedPrev();
        return;
    };

    useMemo(() => {

        const multiSlideItems = (function () {
            const initFirstNumber = Math.floor(viewPort / 2);
            const revChildren = [...children].reverse();
            const lastFirstElm = revChildren.slice(0, initFirstNumber + 1).sort((a, b) => parseInt(a.key as string) - parseInt(b.key as string));
            const firstLastElm = children.slice(0, 2 + 1);
            return [...lastFirstElm, ...children, ...firstLastElm];
        })();

        if (centerMode && !alternate) return handleDispatch(`initialState`, {
            slideItems: multiSlideItems,
            translateIndex: minSlideIndex
        });

        handleDispatch(`initialState`, {
            slideItems: children,
            translateIndex: minSlideIndex
        });
    }, []);

    useAutoChange({
        changeSpeed: changeSpeed,
        dependence: translateIndex,
        handleLimitedChangeAI,
        handleInfiniteChangeAI,
        AIChange: AIChange,
        handleDispatch: handleDispatch,
        alternate: alternate
    });
    
    return {
        slideItems,
        handleNext,
        transition,
        handlePrev,
        translateIndex
    };

};

export default useSliderState;
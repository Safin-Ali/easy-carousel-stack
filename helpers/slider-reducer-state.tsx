import React, { useReducer, Fragment } from 'react';

interface Props {
    slidePercentage: number,
    maxSlideIndex: number
};

interface InitialStateType {
    slideItems: React.ReactElement[],
    translateIndex: number,
    transition: boolean,
    timerId: NodeJS.Timeout | null,
    slideDirection: boolean,
};

interface ReducerActionType {
    type: string,
    payload: any
};

interface ReturnHooks {
    slideState: InitialStateType,
    handleDispatch: Function
};

function useSliderStateHook({
    slidePercentage = 0,
    maxSlideIndex = 0
}: Props): ReturnHooks {

    const initialState: InitialStateType = {
        slideItems: [<Fragment></Fragment>],
        translateIndex: 0,
        transition: true,
        timerId: null,
        slideDirection: true
    };

    const slideStateReducer = (state: InitialStateType, action: ReducerActionType) => {
        switch (action.type) {
            case `infiniteInc`:
                return { ...state, translateIndex: state.translateIndex + slidePercentage };

            case `initialState`:
                return { ...state, translateIndex: action.payload.translateIndex, slideItems: action.payload.slideItems };

            case `infiniteDec`:
                return { ...state, translateIndex: state.translateIndex - slidePercentage };

            case `limitedInc`:
                return { ...state, translateIndex: state.translateIndex + slidePercentage };

            case `limitedDec`:
                return { ...state, translateIndex: state.translateIndex - slidePercentage };

            case `translateMaxIndex`:
                return { ...state, translateIndex: maxSlideIndex };

            case `translateMinIndex`:
                return { ...state, translateIndex: slidePercentage };

            case `transitionBool`:
                return { ...state, transition: action.payload };

            case `setTimerId`:

                return { ...state, timerId: action.payload };

            case `clearTimerId`:
                if(state.timerId) clearTimeout(state.timerId)
                return { ...state, timerId:  null};

            case `setDirection`:
                return { ...state, slideDirection: action.payload};

            default: return state
        };
    };

    const [slideState, dispatch] = useReducer(slideStateReducer, initialState);

    const handleDispatch = (type:string, payload: any) => dispatch({type,payload});

    return {
        slideState,
        handleDispatch
    };
};

useSliderStateHook.propTypes = {}
export default useSliderStateHook;
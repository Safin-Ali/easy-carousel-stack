import { useMemo } from 'react';
import { AIChangeValue, alternateValue } from './default-props';

interface Props {
    changeSpeed: number,
    dependence: any,
    handleLimitedChangeAI:()=>void,
    handleInfiniteChangeAI:()=>void,
    AIChange: boolean,
    handleDispatch: Function,
    alternate: boolean
};

function useAutoChange({
    changeSpeed = 1,
    dependence = null,
    handleLimitedChangeAI = ()=>{},
    handleInfiniteChangeAI = ()=>{},
    AIChange = AIChangeValue,
    handleDispatch = () => {},
    alternate= alternateValue

}:Props):void {

    useMemo(() => {
        if(!AIChange) return undefined;
        const timerId = setTimeout(()=>{
            if(!alternate) return handleInfiniteChangeAI();
            handleLimitedChangeAI()
        },changeSpeed * 1000 || 1500)
        handleDispatch(`setTimerId`,timerId)
        return () => clearTimeout(timerId);
    }, [dependence]);
};
export default useAutoChange;
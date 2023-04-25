import React, { Fragment } from "react";

export interface APIType {
    children?: React.ReactElement[],
    centerMode?: boolean,
    changeSpeed?: number,
    alternate?: boolean,
    slideControler?: boolean,
    AIChange?: boolean,
    colorC?: string,
    viewPort?: number,
    slide?: number,
    sizeC?: number,
    centerModeCallBack?: (type:string) => void,
    callBackStateIncrement?: () => void,
    callBackStateDecrement?: () => void,
    childrenLength?: number,
}

const defaultProps = {
    childrenValue: [<Fragment key={"1"}></Fragment>],
    centerModeValue: false,
    changeSpeedValue: 1,
    alternateValue: true,
    slideControlerValue: true,
    AIChangeValue: false,
    colorCValue: '#1D1D1D',
    viewPortValue: 1,
    slideValue: 1,
    sizeCValue:50,
    childrenLengthValue: 1,
    centerModeCallBackValue: () => {},
    callBackStateIncrementValue: () => {},
    callBackStateDecrementValue: () => {},
};

export const {
    AIChangeValue,
    alternateValue,
    callBackStateDecrementValue,
    callBackStateIncrementValue,
    centerModeCallBackValue,
    centerModeValue,
    changeSpeedValue,
    childrenLengthValue,
    childrenValue,
    colorCValue,
    sizeCValue,
    slideControlerValue,
    slideValue,
    viewPortValue
} = defaultProps
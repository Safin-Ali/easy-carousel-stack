interface ReturnType {
    slidePercentage: number,
    minSlideIndex: number,
    maxSlideIndex: number,
}

const getDependedIndex = (alternate: boolean, slide: number, viewport: number, childrenLength: number, centermode: boolean):ReturnType => {

    if (alternate) {

        const slidePercentage =centermode ?  parseInt((100 / viewport).toString()) :  parseInt((100 * slide).toString());

        const extraDec = viewport > 1 ? slidePercentage : 0;

        const extraDecCenter = ((viewport-1)+(viewport-1))*10;

        const minSlideIndex = 0;

        const maxSlideIndex = centermode ? Math.floor((((childrenLength - 1) / viewport) * 100) -extraDecCenter) : Math.floor((((childrenLength - 1) / viewport) * 100) -extraDec);

        return { slidePercentage, minSlideIndex, maxSlideIndex }
    };

    const slidePercentage = Math.floor(100 / viewport);

    const minSlideIndex = Math.floor(100 / viewport);

    const maxSlideIndex = Math.floor((childrenLength / viewport) * 100);
    return { slidePercentage, minSlideIndex, maxSlideIndex }
};

export default getDependedIndex;
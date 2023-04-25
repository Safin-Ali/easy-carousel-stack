const getCarouselStyle = (centerMode: boolean):string => {
    if(!centerMode) return 'carousel-slider2d-items'
    return 'carousel-center-items'
};

export default getCarouselStyle;
import React from 'react';
import CarouselWrapper from './lib/Carousel/CarouselWrapper';
import Test from './Test';

const data = [
    {
        name: 'Safin Ali',
        age: 19,
        header: `Lorem ipsum dolor sit amet`
    },
    {
        name: 'Mim Akter',
        age: 17.5,
        header: `Lorem ipsum dolor sit amet`
    },
    {
        name: 'Setu Akter',
        age: 17,
        header: `Lorem ipsum dolor sit amet`
    },
];

const App = () => {
    return (
        <section style={{margin:'10%'}}>
            <CarouselWrapper itemName='xx' className={`mx-auto`} loop={true} slideButton={true} duration={1} alternate={true}>
                {
                    data.map( (elm,idx) => <Test name={elm.name} key={idx} age={elm.age} header={elm.header}></Test>)
                }
            </CarouselWrapper>
        </section>
    );
};

export default App;
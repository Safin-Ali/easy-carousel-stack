import { useState } from 'react';

interface Props {
    childrenLength: number,
    baseCenterIndex: number
}

function useCenterMode({
    childrenLength = 0,
    baseCenterIndex = 0
}: Props) {
    const [centerIndex, setCenterIndex] = useState<number>(baseCenterIndex);

    const handleCenterIndex = (type: string) => {

        switch (type) {
            case `increment`:
                setCenterIndex(centerIndex + 1);
                return

            case `decrement`:
                setCenterIndex(centerIndex - 1);
                return

            case `first`:
                setCenterIndex(0);
                return
            case `last`:
                setCenterIndex(childrenLength - 1);
                return
                default: return
        }
    }
    
    return {
        centerIndex,
        handleCenterIndex
    }
};

export default useCenterMode
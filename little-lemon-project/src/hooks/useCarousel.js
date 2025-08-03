import {useState} from 'react';

function useCarousel(length) {
    const [index , setIndex] = useState(0);

  const next = () =>setIndex(i=> (i+1)  % length);
  const prev = () =>setIndex(i=>  (i-1 + length) % length);

  return {index, next, prev};
}

export default useCarousel;
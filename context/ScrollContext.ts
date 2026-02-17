
import { createContext, useContext } from 'react';

// 1 = Forward (Hacia abajo/derecha), -1 = Backward (Hacia arriba/izquierda)
export const ScrollContext = createContext<number>(1);

export const useScrollDirection = () => useContext(ScrollContext);

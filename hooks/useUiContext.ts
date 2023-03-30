import { useContext } from 'react';
import { UiContext } from '../contexts';

export const useUiContext = () => useContext(UiContext);

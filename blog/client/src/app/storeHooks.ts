import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { StoreType,DispatchType } from './store'

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => DispatchType = useDispatch
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector
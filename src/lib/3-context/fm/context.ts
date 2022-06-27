import { FmElement } from "./element"
import { ContextProviderTypeSymbol, ContextTypeSymbol } from "./types"

interface FmProviderProps<T> {
  value: T
}
interface FmProvider<T> extends FmElement<FmProviderProps<T>> {
  context: FmContext<T>
}

interface FmContext<T> {
  value: T
  Provider: FmProvider<T>
}

export const createContext = <T>(defaultValue: T) => {
  const context = {
    type: ContextTypeSymbol,
    value: defaultValue,
    Provider: null as any
  }

  context.Provider = {
    type: ContextProviderTypeSymbol,
    context: context
  }

  return context
}

export const useContext = <T>(context: FmContext<T>) => context.value

export const isFmContext = (thing: any): thing is FmContext<unknown> => thing?.type === ContextProviderTypeSymbol
export const isFmContextProvider = (thing: any): thing is FmProvider<unknown> => thing?.type === ContextProviderTypeSymbol

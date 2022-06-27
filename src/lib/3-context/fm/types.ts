export const ElementTypeSymbol = Symbol.for('fm.element')
export const ContextTypeSymbol = Symbol.for('fm.context')
export const ContextProviderTypeSymbol = Symbol.for('fm.context.provider')

export type ElementType = typeof ElementTypeSymbol

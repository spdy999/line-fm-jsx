const ElementTypeSymbol = Symbol.for('fm.element')

type ElementType = typeof ElementTypeSymbol

type PropsWithChildren<P> = P & { children: any[] }
type RenderingFunction<P> = (props: PropsWithChildren<P>) => FmElement | Object

export interface FmElement<P = any> {
  type: ElementType
  render: RenderingFunction<P>
  props: P
  children: FmElement[]
}

export const element = <P>(render: RenderingFunction<P>, props: P, ...children: any[]): FmElement => {
  // console.log('element', `${children?.length ?? 0} children`, { render, props, children })
  return {
    type: ElementTypeSymbol,
    render,
    props,
    children
  }
}

export const isFmElement = (thing: any): thing is FmElement => thing?.type === ElementTypeSymbol;

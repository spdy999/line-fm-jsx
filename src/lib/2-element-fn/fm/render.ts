import { isFmElement } from "./element"

const isPromise = <V = unknown>(thing: any): thing is Promise<V> => typeof thing?.then === 'function';

const renderChildren = async (children: any[]): Promise<any[]> =>
  Promise.all(children.flat().map(el => render(el)))

export const render = async (element: any): Promise<any> => {
  if (isPromise(element)) {
    return render(await element)
  }

  if (isFmElement(element)) {
    const combinedChildren = [...(element.props?.children ?? []), ...(element.children ?? [])]
    let renderedChildren = []
    if (combinedChildren.length) {
      renderedChildren = await renderChildren(combinedChildren)
    }
  
    const propsWithChildren = {
      ...element.props,
      children: renderedChildren
    }
  
    // this is not a recursive call; not to be confused with render()
    const renderedRoot = element.render(propsWithChildren)
    
    if (isFmElement(renderedRoot)) {
      return render(renderedRoot)
    }

    if (isPromise(renderedRoot)) {
      return render(await renderedRoot)
    }

    const promises = Object.entries(renderedRoot).map(async ([k, v]) => [k, await render(v)])
    
    return (await Promise.all(promises)).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
  }

  return element
}

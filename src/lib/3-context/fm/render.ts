import { isFmContextProvider } from "./context";
import { isFmElement } from "./element";

export const render = (element: any): any => {
  if (isFmElement(element)) {
    const combinedChildren = [...(element.props?.children ?? []), ...element.children]

    const propsWithChildren = { ...element.props, children: combinedChildren }

    const renderedRoot = element.render(propsWithChildren)

    if (isFmElement(renderedRoot)) {
      return render(renderedRoot)
    }

    return Object.entries(renderedRoot)
      .reduce((acc, [k, v]) => ({
        ...acc,
        [k]: render(v)
      }), {})
  }

  if (isFmContextProvider(element)) {
    // set context value
    const previousValue = element.context.value
    element.context.value = element.props.value
    // render
    const combinedChildren = [...(element.props?.children ?? []), ...element.children]

    const renderedChildren = render(combinedChildren)
    // unset context value
    element.context.value = previousValue

    // return
    return renderedChildren[0]
  }
  
  if (Array.isArray(element)) {
    return element.flat().map(subElement => render(subElement))
  }

  return element
}

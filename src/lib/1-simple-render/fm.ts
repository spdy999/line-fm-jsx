// 1st approach: Simple render
export const render = (el: Function, props: any, ...children: any[]) => el({ ...props, children })

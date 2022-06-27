/* @jsx render */
import { render } from './fm';

describe('approach 1: simple render', () => {
  it('renders', () => {
    const Box = () => ({
      type: 'box'
    })

    expect(<Box />).toEqual({ type: 'box' })
  })

  it('renders with children', () => {
    const Box = (props: any) => ({
      type: 'box',
      contents: props.children ?? [],
    })

    const testExp = (
      <Box>
        <Box />
        <Box />
      </Box>
    )

    expect(testExp).toEqual({
      type: 'box',
      contents: [
        { type: 'box', contents: [] },
        { type: 'box', contents: [] }
      ]
    })
  })
})

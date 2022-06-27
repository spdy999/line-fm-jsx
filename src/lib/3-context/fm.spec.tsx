/// <reference path="./namespace.ts" />

/* @jsx element */
import { createContext, useContext } from './fm/context'
import { element } from './fm/element'
import { render } from './fm/render'

describe('approach 3: no async element', () => {
  describe('render primitives', () => {
    it('renders simple component', () => {
      const SimpleBox = () => ({
        type: 'box',
        contents: []
      })
  
      expect(render(<SimpleBox />)).toEqual({
        type: 'box',
        contents: []
      })
    })
  
    it('renders with children', () => {
      const Box = (props: any) => ({
        type: 'box',
        contents: props.children ?? []
      })
  
      expect(render(<Box />)).toEqual({
        type: 'box',
        contents: []
      })
  
      const testExp = (
        <Box>
          <Box />
          <Box />
        </Box>
      )
      expect(render(testExp)).toEqual({
        type: 'box',
        contents: [
          {
            type: 'box',
            contents: []
          },
          {
            type: 'box',
            contents: []
          }
        ]
      })
    })
  
    it('renders complex element', () => {
      const Box = (props: any) => ({
        type: 'box',
        contents: props.children ?? []
      })
  
      const ComplexBox = () => (
        <Box>
          <Box />
          <Box />
        </Box>
      )
  
      expect(render(<ComplexBox />)).toEqual({
        type: 'box',
        contents: [
          {
            type: 'box',
            contents: []
          },
          {
            type: 'box',
            contents: []
          }
        ]
      })
    })
  
    it('renders mapped children', () => {
      const Box = (props: any) => ({
        type: 'box',
        contents: props.children ?? []
      })
  
  
      const testExp = (
        <Box>
          {
            [1, 2].map(() => <Box />)
          }
        </Box>
      )
  
      expect(render(testExp)).toEqual({
        type: 'box',
        contents: [
          {
            type: 'box',
            contents: []
          },
          {
            type: 'box',
            contents: []
          }
        ]
      })
    })
  
    it('renders complex element with children', () => {
      const Box = (props: any) => ({
        type: 'box',
        contents: props.children ?? []
      })
  
      const ComplexBox = (props: any) => (
        <Box>
          <Box>
            {props.children}
          </Box>
          <Box />
        </Box>
      )
  
      const testExp = (
        <ComplexBox>
          <Box />
          <Box />
        </ComplexBox>
      )
  
      expect(render(testExp)).toEqual({
        type: 'box',
        contents: [
          {
            type: 'box',
            contents: [
              {
                type: 'box',
                contents: []
              },
              {
                type: 'box',
                contents: []
              }
            ]
          },
          {
            type: 'box',
            contents: []
          }
        ]
      })
    })
  })

  describe('render contexts', () => {
    const TestContext = createContext<number>(0);
    const Text = (props: any) => ({
      type: 'text',
      text: `${props.text}` ?? ''
    })
    const ContextConsumer = () => {
      const value = useContext(TestContext);

      return <Text text={value} />
    }

    it('use default value if provider does not exist', () => {
      expect(render(<ContextConsumer />)).toEqual({
        type: 'text',
        text: '0'
      })
    })

    it('use value from provider', () => {
      const testExp = (
        <TestContext.Provider value={1}>
          <ContextConsumer />
        </TestContext.Provider>
      )

      expect(render(testExp)).toEqual({
        type: 'text',
        text: '1'
      })
    })

    it('use value from nearest provider', () => {
      const Box = (props: any) => ({
        type: 'box',
        contents: props.children ?? []
      })

      const testExp = (
        <TestContext.Provider value={1}>
          <Box>
            <TestContext.Provider value={2}>
              <ContextConsumer />
            </TestContext.Provider>
            <ContextConsumer />
            <TestContext.Provider value={3}>
              <ContextConsumer />
            </TestContext.Provider>
          </Box>
        </TestContext.Provider>
      )

      expect(render(testExp)).toEqual({
        type: 'box',
        contents: [
          {
            type: 'text',
            text: '2'
          },
          {
            type: 'text',
            text: '1'
          },
          {
            type: 'text',
            text: '3'
          }
        ]
      })

    })
  })
})

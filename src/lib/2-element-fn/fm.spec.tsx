/// <reference path="./namespace.ts" />

/* @jsx element */
import { delay } from '../../utils/test';
import { element } from './fm/element';
import { render } from './fm/render';

describe('approach 2: element fn', () => {
  const Box = (props: any) => {
    const { children } = props;

    return {
      type: 'box',
      contents: children ?? []
    }
  }

  describe(': synchronous rendering', () => {
    it('renders', async () => {
      expect(await render(<Box />)).toEqual({ type: 'box', contents: [] })
    })
  
    it('renders with children', async () => {
      const testExp = (
        <Box>
          <Box></Box>
          <Box></Box>
        </Box>
      );
  
      expect(await render(testExp)).toEqual({
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
  
    it('renders with mapped children', async () => {
      const testExp = (
        <Box>
          {
            [1, 2].map(() => (
              <Box />
            ))
          }
        </Box>
      );
  
      expect(await render(testExp)).toEqual({
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
  
    it('renders a complex component', async () => {
      const Complex = () => (
        <Box>
          <Box></Box>
          <Box></Box>
        </Box>
      )
  
      expect(await render(<Complex />)).toEqual({
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
  
    it('renders a complex component with mapped children', async () => {
      const Complex = () => (
        <Box>
          {
            [1, 2].map(() => (
              <Box />
            ))
          }
        </Box>
      )
  
      expect(await render(<Complex />)).toEqual({
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
  })

  describe(': asynchronous rendering', () => {
    const DelayedBox = async (props: any) => {
      await delay(1000);
      return <Box {...props} />
    }

    it('renders Promise function components', async () => {
      expect(await render(<DelayedBox />)).toEqual({ type: 'box', contents: [] });
    })

    it('renders nested Promise function components', async () => {
      const testExp = (
        <DelayedBox>
          <DelayedBox />
          <DelayedBox />
        </DelayedBox>
      )

      expect(await render(testExp)).toEqual({
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

    it('renders function components with nested Promise function components', async () => {
      const testExp = (
        <Box>
          <DelayedBox />
          <DelayedBox />
        </Box>
      )

      expect(await render(testExp)).toEqual({
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

    it('renders Promise function components with nested function components', async () => {
      const testExp = (
        <DelayedBox>
          <Box />
          <Box />
        </DelayedBox>
      )

      expect(await render(testExp)).toEqual({
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
  })
})

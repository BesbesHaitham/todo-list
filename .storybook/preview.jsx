import '../src/index.css';
import StoryFrame from './StoryFrame';

export default {
  decorators: [
    (Story, context) => (
      <StoryFrame theme={context.globals.theme} size={context.parameters.frame}>
        <Story />
      </StoryFrame>
    ),
  ],
  initialGlobals: { theme: 'light' },
  globalTypes: {
    theme: {
      description: 'Component theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: 'padded',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: { disable: true },
    a11y: { test: 'off' },
    options: {
      storySort: {
        order: ['Configure your project', 'Atoms', 'Molecules', 'Organisms', 'Templates'],
      },
    },
  },
  tags: ['autodocs'],
};

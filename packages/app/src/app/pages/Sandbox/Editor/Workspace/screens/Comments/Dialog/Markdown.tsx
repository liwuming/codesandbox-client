import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useOvermind } from 'app/overmind';
import { Text, Element, Link } from '@codesandbox/components';
import css from '@styled-system/css';
import { Code } from './Code';

export const Markdown = ({ source }) => {
  const { state } = useOvermind();
  const privateSandbox =
    state.editor.currentSandbox.privacy === 1 ||
    state.editor.currentSandbox.privacy === 2;

  const image = props =>
    privateSandbox ? (
      <img
        {...props}
        alt={props.alt}
        css={css({
          maxWidth: '100%',
        })}
      />
    ) : (
      <Text marginY={4} variant="muted" block align="center">
        You cannot use images in comments on public sandboxes.
      </Text>
    );

  return (
    <Element
      css={css({
        'ul, ol': {
          paddingLeft: 0,
          fontSize: 13,
        },
        'ol li': {
          counterIncrement: 'counter',
        },
        'ol li::before': {
          color: 'mutedForeground',
          content: "counter(counter) '. '",
        },
        p: {
          margin: 0,
        },
        li: {
          listStyle: 'none',
        },
        'li:before': {
          content: "'•'",
          color: 'mutedForeground',
          paddingRight: '0.5em',
        },
      })}
    >
      <ReactMarkdown
        source={source}
        renderers={{
          text: ({ children }) => (
            <Text variant="muted" size={3}>
              {children}
            </Text>
          ),
          heading: ({ children }) => (
            <Text block variant="muted" size={3}>
              {children}
            </Text>
          ),
          code: props => <Code {...props} />,
          link: props => <Link {...props}>{props.children}</Link>,
          linkReference: props => <Link {...props}>{props.children}</Link>,
          image: props => image(props),
          imageReference: props => image(props),
          thematicBreak: () => null,
          inlineCode: props => (
            <Element
              as="span"
              css={css({
                backgroundColor: 'grays.200',
                paddingX: '2px',
                borderRadius: 'small',
              })}
            >
              <Text
                css={css({
                  color: 'reds.500',
                })}
                size={3}
                as="code"
              >
                {props.children}
              </Text>
            </Element>
          ),
        }}
      />
    </Element>
  );
};

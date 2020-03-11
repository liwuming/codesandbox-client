import React, { FunctionComponent } from 'react';
import { Element, Button, Text, Stack } from '@codesandbox/components';
import css from '@styled-system/css';

type Props = {
  onCancel?: () => void;
  onPrimaryAction?: () => void;
  cancelMessage?: string;
  confirmMessage?: string;
  title?: string;
  description?: string;
  type?: 'link' | 'primary' | 'danger' | 'secondary';
  style?: any;
};

export const Alert: FunctionComponent<Props> = ({
  onCancel,
  onPrimaryAction,
  children,
  cancelMessage = 'Cancel',
  confirmMessage = 'Confirm',
  title,
  description,
  type = 'primary',
  ...props
}) => (
  <Element
    padding={4}
    paddingTop={6}
    css={css({
      maxHeight: '70vh',
      overflow: 'auto',
    })}
    {...props}
  >
    {title && (
      <Text weight="bold" block size={4} paddingBottom={2}>
        {title}
      </Text>
    )}
    {description && (
      <Text marginBottom={6} size={3} block>
        {description}
      </Text>
    )}
    {children || (
      <Stack gap={2} align="center" justify="flex-end">
        {onCancel && (
          <Button
            css={css({
              width: 'auto',
            })}
            variant="link"
            onClick={onCancel}
          >
            {cancelMessage}
          </Button>
        )}
        {onPrimaryAction && (
          <Button
            variant={type}
            title={confirmMessage}
            css={css({
              width: 'auto',
            })}
            onClick={onPrimaryAction}
          >
            <Text>{confirmMessage}</Text>
          </Button>
        )}
      </Stack>
    )}
  </Element>
);

import * as React from 'react';

import { cn } from '../../lib/utils';
import { Row, Stack } from './layout';
import './hero.css';

type HeroSlots = {
  image?: string;
  title?: React.ReactNode;
  tags?: React.ReactNode;
  media?: React.ReactNode;
  subheadline?: React.ReactNode;
  cards?: React.ReactNode;
  actions?: React.ReactNode;
};

export function Hero({
  image,
  title,
  tags,
  media,
  subheadline,
  cards,
  actions,
  className,
  style,
  ...props
}: HeroSlots & React.ComponentProps<'div'>) {
  const heroStyle = image
    ? {
        ...style,
        backgroundImage: `linear-gradient(to bottom, transparent, var(--color-surface-card) var(--pds-hero-fade-stop)), url(${image})`,
      }
    : style;

  return (
    <div data-slot="hero" className={cn('pds-hero', className)} style={heroStyle} {...props}>
      <Row gap="m" className="pds-hero-head">
        <Stack gap="s" className="pds-hero-column">
          {title ? <span data-slot="hero-title">{title}</span> : null}
          {tags ? (
            <Row gap="s" className="pds-hero-tags">
              {tags}
            </Row>
          ) : null}
        </Stack>
        {media ? <div data-slot="hero-media">{media}</div> : null}
      </Row>

      <Stack gap="m" className="pds-hero-foot">
        {subheadline ? <span data-slot="hero-subheadline">{subheadline}</span> : null}
        {cards ? (
          <Row gap="s" className="pds-hero-cards">
            {cards}
          </Row>
        ) : null}
        {actions ? (
          <Row gap="s" className="pds-hero-actions">
            {actions}
          </Row>
        ) : null}
      </Stack>
    </div>
  );
}

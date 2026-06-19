import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './accordion';

const items = [
  { question: 'Question one', answer: 'Answer one' },
  { question: 'Question two', answer: 'Answer two' },
];

describe('Accordion', () => {
  it('renders all triggers collapsed by default', () => {
    render(<Accordion items={items} />);
    const triggers = screen.getAllByRole('button');
    expect(triggers).toHaveLength(2);
    triggers.forEach((t) => expect(t).toHaveAttribute('aria-expanded', 'false'));
  });

  it('expands a panel on click and wires aria-controls', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const first = screen.getByRole('button', { name: /question one/i });
    await user.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(first).toHaveAttribute('aria-controls');
  });

  it('keeps a single panel open by default', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const [first, second] = screen.getAllByRole('button');
    await user.click(first!);
    await user.click(second!);
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });
});

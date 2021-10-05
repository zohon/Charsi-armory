import { newSpecPage } from '@stencil/core/testing';
import { CaRuneword } from '../ca-runeword';

describe('ca-runeword', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CaRuneword],
      html: `<ca-runeword></ca-runeword>`,
    });
    expect(page.root).toEqualHtml(`
      <ca-runeword>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ca-runeword>
    `);
  });
});

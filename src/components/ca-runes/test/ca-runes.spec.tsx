import { newSpecPage } from '@stencil/core/testing';
import { CaRunes } from '../ca-runes';

describe('ca-runes', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CaRunes],
      html: `<ca-runes></ca-runes>`,
    });
    expect(page.root).toEqualHtml(`
      <ca-runes>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ca-runes>
    `);
  });
});

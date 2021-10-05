import { newSpecPage } from '@stencil/core/testing';
import { CaCharm } from '../ca-charm';

describe('ca-charm', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CaCharm],
      html: `<ca-charm></ca-charm>`,
    });
    expect(page.root).toEqualHtml(`
      <ca-charm>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ca-charm>
    `);
  });
});

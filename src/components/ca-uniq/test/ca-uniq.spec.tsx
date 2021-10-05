import { newSpecPage } from '@stencil/core/testing';
import { CaUniq } from '../ca-uniq';

describe('ca-uniq', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CaUniq],
      html: `<ca-uniq></ca-uniq>`,
    });
    expect(page.root).toEqualHtml(`
      <ca-uniq>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ca-uniq>
    `);
  });
});

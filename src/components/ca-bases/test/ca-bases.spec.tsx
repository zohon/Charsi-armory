import { newSpecPage } from '@stencil/core/testing';
import { CaBases } from '../ca-bases';

describe('ca-bases', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CaBases],
      html: `<ca-bases></ca-bases>`,
    });
    expect(page.root).toEqualHtml(`
      <ca-bases>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ca-bases>
    `);
  });
});

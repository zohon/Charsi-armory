import { newE2EPage } from '@stencil/core/testing';

describe('ca-uniq', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ca-uniq></ca-uniq>');

    const element = await page.find('ca-uniq');
    expect(element).toHaveClass('hydrated');
  });
});

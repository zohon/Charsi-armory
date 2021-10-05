import { newE2EPage } from '@stencil/core/testing';

describe('ca-charm', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ca-charm></ca-charm>');

    const element = await page.find('ca-charm');
    expect(element).toHaveClass('hydrated');
  });
});

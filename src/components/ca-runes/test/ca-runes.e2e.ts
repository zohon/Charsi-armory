import { newE2EPage } from '@stencil/core/testing';

describe('ca-runes', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ca-runes></ca-runes>');

    const element = await page.find('ca-runes');
    expect(element).toHaveClass('hydrated');
  });
});

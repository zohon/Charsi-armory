import { newE2EPage } from '@stencil/core/testing';

describe('ca-runeword', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ca-runeword></ca-runeword>');

    const element = await page.find('ca-runeword');
    expect(element).toHaveClass('hydrated');
  });
});

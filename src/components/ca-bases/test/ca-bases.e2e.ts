import { newE2EPage } from '@stencil/core/testing';

describe('ca-bases', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ca-bases></ca-bases>');

    const element = await page.find('ca-bases');
    expect(element).toHaveClass('hydrated');
  });
});

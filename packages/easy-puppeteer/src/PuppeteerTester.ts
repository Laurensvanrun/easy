import { PuppeteerElement } from './PuppeteerElement';
import puppeteer, { Browser, Page } from 'puppeteer';
import { EnvContext, Id, UseCase } from '@thisisagile/easy';
import { TestElement, Tester, toUrl } from '@thisisagile/easy-test-web';

export class PuppeteerTester implements Tester {
  constructor(public env: EnvContext, private readonly browser: Browser, private readonly page: Page) {}

  get url(): string {
    return this.page.target().url();
  }

  /* istanbul ignore next */
  static launch = (headless: boolean): Promise<Browser> => puppeteer.launch({ headless, args: ['--no-sandbox', '--start-maximized'] });

  /* istanbul ignore next */
  static async init(env: EnvContext, headless = true, width = 1200, height = 800): Promise<Tester> {
    const browser = await PuppeteerTester.launch(headless);
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    return new PuppeteerTester(env, browser, page);
  }

  byClass(c: string): TestElement {
    const h = this.page.waitForSelector(`.${c}`);
    return new PuppeteerElement(h);
  }

  byId(id: string): TestElement {
    const h = this.page.waitForSelector(`#${id}`);
    return new PuppeteerElement(h);
  }

  byDataTestId(id: string): TestElement {
    return this.by('data-testid', id);
  }

  byName(name: string): TestElement {
    return this.by('name', name);
  }

  by(key: string, value: string): TestElement {
    const h = this.page.waitForSelector(`[${key}=${value}]`);
    return new PuppeteerElement(h);
  }

  submit(): TestElement {
    return this.by('type', 'submit');
  }

  row(contains: string): TestElement {
    // Select the first row that contains the given input
    return this.byXPath(`(//tr[contains(., '${contains}')])[1]`);
  }

  redirect(url: string): Promise<boolean> {
    return this.page.goto(url).then(r => r?.ok() ?? false);
  }

  goto(to: UseCase, id?: Id): Promise<boolean> {
    return this.redirect(toUrl(to, this.env.host, this.env.port, id));
  }

  wait(): Promise<boolean> {
    return this.page.waitForNavigation().then(r => r?.ok() || false);
  }

  close(): Promise<void> {
    return this.browser.close();
  }

  private byXPath(q: string): TestElement {
    const h = this.page.waitForXPath(`${q}`);
    return new PuppeteerElement(h);
  }
}

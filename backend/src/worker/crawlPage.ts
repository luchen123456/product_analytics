import { chromium } from 'playwright';

export type CrawlPageResult = {
  requestedUrl: string;
  finalUrl: string;
  title: string;
  capturedAt: string;
};

export async function crawlPage(url: string): Promise<CrawlPageResult> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
    const title = await page.title();
    const finalUrl = page.url();
    return {
      requestedUrl: url,
      finalUrl,
      title,
      capturedAt: new Date().toISOString()
    };
  } finally {
    await page.close().catch(() => {});
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}


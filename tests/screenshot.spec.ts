import { test, devices } from '@playwright/test'

const viewports = [
  { name: 'desktop', device: devices['Desktop Chrome'] },
  { name: 'tablet', device: devices['iPad Pro'] },
  { name: 'mobile', device: devices['iPhone 13'] },
]

test.describe('Screenshot tests', () => {
  for (const { name, device } of viewports) {
    test(`FC page screenshot - ${name}`, async ({ browser }) => {
      const context = await browser.newContext(device)
      const page = await context.newPage()

      await page.goto('/fc')

      // Wait for images to load
      await page.waitForLoadState('networkidle')

      // Take full page screenshot
      await page.screenshot({
        path: `tests/screenshots/fc-${name}.png`,
        fullPage: true,
      })

      await context.close()
    })
  }
})

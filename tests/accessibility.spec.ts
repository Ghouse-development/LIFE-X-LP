import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility tests', () => {
  test('FC page should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/fc')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('Hero section should be accessible', async ({ page }) => {
    await page.goto('/fc')

    // ヒーローセクションが表示される
    const hero = page.locator('#hero')
    await expect(hero).toBeVisible()

    // アクセシビリティチェック
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#hero')
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('Contact form should be accessible', async ({ page }) => {
    await page.goto('/fc')

    // コンタクトフォームまでスクロール
    await page.locator('#contact').scrollIntoViewIfNeeded()

    // アクセシビリティチェック
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#contact')
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
})

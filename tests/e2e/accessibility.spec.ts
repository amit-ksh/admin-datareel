import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('accessibility suite', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('/analytics', {
      waitUntil: 'networkidle',
    })

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    const violations = accessibilityScanResults.violations.map(
      ({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodeCount: nodes.length,
      }),
    )

    expect(
      violations,
      `Found ${violations.length} accessibility violation(s)`,
    ).toEqual([])
  })
})

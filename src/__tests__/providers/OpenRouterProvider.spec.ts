import OpenRouterProvider from '../../providers/OpenRouterProvider'
import ProviderTester from './ProviderTester'

describe('OpenRouterProvider', () => {
  let providerTester: ProviderTester

  beforeAll(() => {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY environment variable is required')
    }
    providerTester = new ProviderTester(
      new OpenRouterProvider(apiKey)
    )
  })

  test(
    'should get correct translation',
    async () => providerTester.positive({
      text: 'Hello',
      lang: 'en-uk',
      expected: 'Привіт'
    })
  )

  test(
    'should fail because of invalid lang',
    async () => providerTester.negative({
      text: 'Anything',
      lang: 'invalid-lang'
    })
  )

  test(
    'should fail because of missing API key',
    () => {
      expect(() => {
        // biome-ignore lint/suspicious/noExplicitAny: Testing error case
        new OpenRouterProvider('' as any)
      }).toThrow('OpenRouter API key is required')
    }
  )
})


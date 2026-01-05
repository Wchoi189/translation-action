import UpstageProvider from '../../providers/UpstageProvider'
import ProviderTester from './ProviderTester'

describe('UpstageProvider', () => {
  let providerTester: ProviderTester

  beforeAll(() => {
    const apiKey = process.env.UPSTAGE_API_KEY
    if (!apiKey) {
      throw new Error('UPSTAGE_API_KEY environment variable is required')
    }
    providerTester = new ProviderTester(
      new UpstageProvider(apiKey)
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
        new UpstageProvider('' as any)
      }).toThrow('Upstage API key is required')
    }
  )
})


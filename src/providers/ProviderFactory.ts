import type ProviderBase from './ProviderBase'
import FunTranslationsProvider from './FunTranslationsProvider'
import LibreTranslateProvider from './LibreTranslateProvider'
import LinguaToolsProvider from './LinguaToolsProvider'
import MicrosoftProvider from './MicrosoftProvider'
import MyMemoryProvider from './MyMemoryProvider'
import DeeplProvider from './DeeplProvider'
import GoogleProvider from './GoogleProvider'
import OpenRouterProvider from './OpenRouterProvider'
import UpstageProvider from './UpstageProvider'

export type ProviderType =
  'deepl' |
  'google' |
  'funtranslations' |
  'linguatools' |
  'microsoft' |
  'mymemory' |
  'libretranslate' |
  'openrouter' |
  'upstage'

export default class ProviderFactory {
  getProvider(
    type: ProviderType, apiKey: string, apiAdditionalParam: string
  ): ProviderBase {
    switch (type) {
    case 'deepl':
      return new DeeplProvider(apiKey)
    case 'google':
      return new GoogleProvider()
    case 'funtranslations':
      return new FunTranslationsProvider()
    case 'libretranslate':
      return new LibreTranslateProvider(apiKey)
    case 'linguatools':
      return new LinguaToolsProvider()
    case 'microsoft':
      return new MicrosoftProvider(apiKey, apiAdditionalParam)
    case 'mymemory':
      return new MyMemoryProvider(apiKey)
    case 'openrouter':
      return new OpenRouterProvider(apiKey, apiAdditionalParam)
    case 'upstage':
      return new UpstageProvider(apiKey, apiAdditionalParam)
    default:
      throw new Error(`${type} is not supported`)
    }
  }
}

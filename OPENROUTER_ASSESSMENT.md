# OpenRouter Integration Assessment

## Executive Summary

**Feasibility: ✅ HIGHLY FEASIBLE**

The translation-action repository can be modified to support OpenRouter for translation tasks. The architecture is well-designed with a clear provider pattern that makes adding new providers straightforward. OpenRouter's LLM-based translation would provide higher quality translations compared to free APIs.

## Current Architecture Analysis

### Repository Structure

The repository follows a clean, modular architecture:

```
src/
├── index.ts                    # Main entry point
├── extract.ts                  # Handles file/text extraction
└── providers/
    ├── ProviderBase.ts         # Abstract base class
    ├── ProviderFactory.ts      # Factory pattern for provider creation
    ├── GoogleProvider.ts       # Example provider implementation
    ├── MicrosoftProvider.ts   # Example provider implementation
    └── ...                     # Other providers
```

### Key Components

1. **ProviderBase** (`src/providers/ProviderBase.ts`)
   - Abstract base class that all providers extend
   - Provides common HTTP client functionality via `typed-rest-client`
   - Defines the `translate(text: string, lang: string): Promise<string[]>` interface
   - Handles error management with `ProviderError` class

2. **ProviderFactory** (`src/providers/ProviderFactory.ts`)
   - Centralized factory for creating provider instances
   - Uses a switch statement to map provider types to implementations
   - Currently supports: `deepl`, `google`, `funtranslations`, `linguatools`, `microsoft`, `mymemory`, `libretranslate`

3. **Main Entry Point** (`src/index.ts`)
   - Extracts source text (from file or direct input)
   - Gets provider from factory
   - Calls `translate()` method
   - Outputs translated text

### Provider Implementation Pattern

All providers follow a consistent pattern:

```typescript
export default class ExampleProvider extends ProviderBase {
  constructor(apiKey?: string, additionalParam?: string) {
    super(baseUrl) // Optional base URL for HTTP providers
  }

  async translate(text: string, lang: string): Promise<string[]> {
    // Parse language codes from lang parameter
    // Make API call
    // Return array of translated strings
  }
}
```

## OpenRouter Integration Requirements

### OpenRouter API Overview

OpenRouter provides access to multiple LLMs through a unified API. For translation tasks, we would use the Chat Completions endpoint:

- **Endpoint**: `https://openrouter.ai/api/v1/chat/completions`
- **Method**: POST
- **Authentication**: Bearer token (API key in `Authorization` header)
- **Request Format**: JSON with model, messages, and parameters
- **Response Format**: JSON with choices array containing translated text

### Required Modifications

#### 1. Create OpenRouterProvider Class

**File**: `src/providers/OpenRouterProvider.ts`

```typescript
import ProviderBase from './ProviderBase'

type OpenRouterResponse = {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export default class OpenRouterProvider extends ProviderBase {
  private readonly apiKey: string
  private readonly model: string

  constructor(apiKey: string, model?: string) {
    super('https://openrouter.ai/api/v1')
    this.apiKey = apiKey
    // Default to a cost-effective model, allow override via api_additional_parameter
    this.model = model || 'openai/gpt-3.5-turbo'
  }

  async translate(text: string, lang: string): Promise<string[]> {
    const [from, to] = lang.split('-') // Use hyphen separator like DeepL
    
    const prompt = `Translate the following text from ${from} to ${to}. Only return the translation, no explanations:\n\n${text}`
    
    const response: OpenRouterResponse = await this.api<OpenRouterResponse>({
      url: '/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/fabasoad/translation-action', // Optional but recommended
        'X-Title': 'Translation Action' // Optional but recommended
      },
      data: {
        model: this.model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent translations
        max_tokens: 2000
      }
    })
    
    return [response.choices[0].message.content.trim()]
  }
}
```

#### 2. Update ProviderFactory

**File**: `src/providers/ProviderFactory.ts`

Add `'openrouter'` to the `ProviderType` union and add a case in the switch statement:

```typescript
export type ProviderType =
  | 'deepl'
  | 'google'
  | 'funtranslations'
  | 'linguatools'
  | 'microsoft'
  | 'mymemory'
  | 'libretranslate'
  | 'openrouter'  // Add this

// In getProvider method:
case 'openrouter':
  return new OpenRouterProvider(apiKey, apiAdditionalParam) // Use apiAdditionalParam for model selection
```

#### 3. Update action.yml

**File**: `action.yml`

No changes needed - the existing inputs (`api_key` and `api_additional_parameter`) are sufficient. The `api_additional_parameter` can be used to specify the model.

#### 4. Update README.md

Add documentation for the OpenRouter provider:

```markdown
### OpenRouter

* Identifier is `openrouter`.
* Uses LLM-based translation for high-quality results.
* Supports any language pair that the selected model supports.
* Language direction should be separated by `-` (hyphen) character. For example, `en-uk` (from English to Ukrainian).
* How to get API key:
  * Sign up at [OpenRouter](https://openrouter.ai/)
  * Go to `Keys` section and create an API key
* Model selection (optional):
  * Use `api_additional_parameter` to specify the model. Default is `openai/gpt-3.5-turbo`.
  * Examples: `openai/gpt-4`, `anthropic/claude-3-opus`, `google/gemini-pro`
  * See [OpenRouter Models](https://openrouter.ai/models) for available models.

Example:

```yaml
- uses: fabasoad/translation-action@v4
  with:
    provider: openrouter
    lang: en-uk
    source: "Hello, world!"
    api_key: ${{ secrets.OPENROUTER_API_KEY }}
    api_additional_parameter: openai/gpt-4  # Optional: specify model
```
```

#### 5. Add Tests

**File**: `src/__tests__/providers/OpenRouterProvider.spec.ts`

```typescript
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
})
```

## Implementation Considerations

### 1. Language Code Format

**Decision Needed**: Choose language code separator
- Current providers use different separators:
  - DeepL, LibreTranslate: `-` (hyphen) - `en-uk`
  - Google, MyMemory: `|` (pipe) - `en|uk`
- **Recommendation**: Use `-` (hyphen) for OpenRouter to match DeepL/LibreTranslate pattern
- May need language code mapping (e.g., ISO 639-1 to model-friendly codes)

### 2. Model Selection

**Options**:
- Use `api_additional_parameter` to specify model (recommended)
- Default to cost-effective model (`gpt-3.5-turbo`)
- Allow users to choose based on quality vs. cost tradeoff

### 3. Prompt Engineering

**Considerations**:
- Need a well-crafted prompt for consistent translations
- Should instruct model to return only translation (no explanations)
- May want to support different prompt styles (formal, casual, etc.)

### 4. Error Handling

- Handle rate limits (OpenRouter may have different limits)
- Handle model unavailability
- Handle invalid API keys
- Handle unsupported language pairs

### 5. Cost Management

- OpenRouter charges per token (input + output)
- More expensive than free APIs
- Users should be aware of costs
- Consider adding cost estimation or warnings

### 6. Response Parsing

- LLM responses may include extra text
- Need robust parsing to extract only the translation
- May need to handle markdown formatting if model returns it

### 7. Rate Limiting

- OpenRouter has rate limits based on API tier
- May need to implement retry logic with exponential backoff
- Consider using `typed-rest-client`'s retry capabilities

## Advantages of OpenRouter Integration

1. **Higher Quality Translations**: LLMs often provide better context-aware translations
2. **Language Support**: Access to models that support many language pairs
3. **Flexibility**: Users can choose models based on quality/cost preferences
4. **Future-Proof**: As new models are added to OpenRouter, they become available automatically

## Challenges and Limitations

1. **Cost**: More expensive than free APIs (pay-per-token)
2. **Latency**: LLM inference may be slower than dedicated translation APIs
3. **Consistency**: LLM outputs may vary slightly between runs
4. **Token Limits**: Long texts may need chunking
5. **Prompt Engineering**: Requires careful prompt design for reliable results

## Recommendations

### Phase 1: Basic Implementation
1. Create `OpenRouterProvider` with basic functionality
2. Use simple, direct translation prompt
3. Default to `gpt-3.5-turbo` for cost-effectiveness
4. Support hyphen-separated language codes (`en-uk`)

### Phase 2: Enhancements
1. Add support for different prompt styles
2. Implement text chunking for long texts
3. Add cost estimation/warnings
4. Support streaming responses for better UX
5. Add language code validation/mapping

### Phase 3: Advanced Features
1. Support for translation context/hints
2. Support for multiple translation options
3. Caching mechanism for repeated translations
4. Batch translation support

## Testing Strategy

1. **Unit Tests**: Test provider class in isolation
2. **Integration Tests**: Test with real OpenRouter API (requires API key)
3. **E2E Tests**: Test full workflow in GitHub Actions
4. **Error Handling Tests**: Test various error scenarios
5. **Language Pair Tests**: Test multiple language combinations

## Dependencies

No new dependencies required! The existing `typed-rest-client` can handle OpenRouter's REST API.

## Estimated Implementation Effort

- **Basic Implementation**: 2-4 hours
  - Create provider class
  - Update factory
  - Update documentation
  - Basic tests

- **Full Implementation with Enhancements**: 1-2 days
  - Add error handling
  - Add language code mapping
  - Add prompt variations
  - Comprehensive tests
  - Documentation updates

## Conclusion

The translation-action repository is **well-suited** for OpenRouter integration. The existing architecture makes it straightforward to add a new provider. The main considerations are:

1. Cost vs. quality tradeoff
2. Prompt engineering for consistent results
3. Language code handling
4. Error handling and rate limiting

With proper implementation, OpenRouter can provide significantly higher quality translations, especially for context-sensitive or nuanced text.


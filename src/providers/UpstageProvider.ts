import ProviderBase from './ProviderBase'

type UpstageResponse = {
  choices: Array<{
    message: {
      content: string
    }
  }>
  error?: {
    message: string
  }
}

export default class UpstageProvider extends ProviderBase {
  private readonly apiKey: string
  private readonly model: string

  constructor(apiKey: string, model?: string) {
    super('https://api.upstage.ai/v1')
    if (!apiKey) {
      throw new Error('Upstage API key is required')
    }
    this.apiKey = apiKey
    // Default to solar-pro2, allow override via api_additional_parameter
    this.model = model || 'solar-pro2'
  }

  async translate(text: string, lang: string): Promise<string[]> {
    const [from, to] = lang.split('-')
    
    if (!from || !to) {
      throw new Error(
        `Invalid language format. Expected format: "from-to" (e.g., "en-uk"), got: "${lang}"`
      )
    }

    // Enhanced prompt for README.md and general translation
    const prompt = `Translate the following text from ${from} to ${to}. 
If the text appears to be Markdown (README.md or documentation), preserve all Markdown formatting, code blocks, links, and structure exactly as they are. Only translate the natural language text, not code, URLs, or technical terms that should remain in their original language.

Text to translate:
${text}

Translation:`

    const response: UpstageResponse = await this.api<UpstageResponse>({
      url: '/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
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
        max_tokens: 4000 // Increased for longer README files
      }
    })

    if (response.error) {
      throw new Error(`Upstage API error: ${response.error.message}`)
    }

    if (!response.choices || response.choices.length === 0) {
      throw new Error('Upstage API returned no translation choices')
    }

    return [response.choices[0].message.content.trim()]
  }
}


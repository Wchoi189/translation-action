// Simple script to translate README using Upstage AI
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');

// Extract API key - try multiple patterns
let apiKey = null;
const lines = envContent.split('\n');
for (const line of lines) {
  if (line.includes('UPSTAGE_API_KEY')) {
    // Try to extract the value
    const match = line.match(/UPSTAGE_API_KEY\s*=\s*["']?([^"'\s\n]+)["']?/);
    if (match) {
      apiKey = match[1].trim();
      break;
    }
  }
}

if (!apiKey) {
  console.error('Could not find UPSTAGE_API_KEY in .env.local');
  process.exit(1);
}

// Read the README
const readmePath = path.join(__dirname, 'README.md');
const readmeContent = fs.readFileSync(readmePath, 'utf-8');

console.log('🔑 API Key loaded (first 20 chars):', apiKey.substring(0, 20) + '...');
console.log('📄 README length:', readmeContent.length, 'characters');

// Use the Upstage AI API directly
async function translate() {
  const [from, to] = 'en-ko'.split('-'); // English to Korean
  
  const prompt = `Translate the following text from ${from} to ${to}. 
If the text appears to be Markdown (README.md or documentation), preserve all Markdown formatting, code blocks, links, and structure exactly as they are. Only translate the natural language text, not code, URLs, or technical terms that should remain in their original language.

Text to translate:
${readmeContent}

Translation:`;

  try {
    console.log('🚀 Sending translation request to Upstage AI...');
    console.log('📝 Using model: solar-pro2');
    
    const response = await fetch('https://api.upstage.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'solar-pro2',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 8000
      })
    });

    const responseText = await response.text();
    console.log('📊 Response status:', response.status);
    
    if (!response.ok) {
      console.error('❌ API request failed');
      console.error('Response:', responseText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = JSON.parse(responseText);
    
    if (data.error) {
      throw new Error(`Upstage API error: ${data.error.message}`);
    }

    if (!data.choices || data.choices.length === 0) {
      throw new Error('Upstage API returned no translation choices');
    }

    const translatedText = data.choices[0].message.content.trim();
    
    // Write the translated README
    const outputPath = path.join(__dirname, 'README.ko.solar.md');
    fs.writeFileSync(outputPath, translatedText, 'utf-8');
    
    console.log('✅ Translation complete!');
    console.log(`📄 Translated README saved to: ${outputPath}`);
    console.log(`📊 Original length: ${readmeContent.length} characters`);
    console.log(`📊 Translated length: ${translatedText.length} characters`);
    
  } catch (error) {
    console.error('❌ Translation failed:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

translate();


// Test script to verify OpenRouter API key
const fs = require('fs');
const path = require('path');

// Load API key
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
let apiKey = null;
const patterns = [
  /OPEN_ROUTER_QWEN_API="([^"]+)"/,
  /OPEN_ROUTER_QWEN_API=([^\s\n]+)/,
  /OPEN_ROUTER_QWEN_API\s*=\s*["']?([^"'\s\n]+)["']?/
];
for (const pattern of patterns) {
  const match = envContent.match(pattern);
  if (match) {
    apiKey = match[1].trim();
    break;
  }
}

console.log('Testing API key...');
console.log('Key (first 20):', apiKey.substring(0, 20) + '...');

async function test() {
  try {
    // Try a simple request first
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    });
    
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ API key is valid!');
      
      // Now try a simple translation
      console.log('\nTesting translation...');
      const translateResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'qwen/qwen-2.5-72b-instruct',
          messages: [
            {
              role: 'user',
              content: 'Translate "Hello" to Korean. Only return the translation.'
            }
          ],
          temperature: 0.3,
          max_tokens: 100
        })
      });
      
      console.log('Translate Status:', translateResponse.status);
      const translateData = await translateResponse.json();
      console.log('Translate Response:', JSON.stringify(translateData, null, 2));
      
    } else {
      console.log('❌ API key test failed');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();


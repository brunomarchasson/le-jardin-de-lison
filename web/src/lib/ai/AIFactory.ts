import { TextProvider, AIConfig } from './types';
import { GeminiProvider } from './providers/GeminiProvider';
import { ClaudeProvider } from './providers/ClaudeProvider';
import { OpenAIProvider } from './providers/OpenAIProvider';

export type ProviderType = 'gemini' | 'claude-sonnet' | 'claude-haiku' | 'openai';

export class AIFactory {
  static getTextProvider(type: ProviderType, config: AIConfig): TextProvider {
    switch (type) {
      case 'claude-sonnet':
        if (!config.claudeKey) throw new Error("Clé API Claude manquante.");
        return new ClaudeProvider(config.claudeKey, 'claude-3-5-sonnet-latest');
      
      case 'claude-haiku':
        if (!config.claudeKey) throw new Error("Clé API Claude manquante.");
        return new ClaudeProvider(config.claudeKey, 'claude-3-haiku-20240307');
      
      case 'openai':
        if (!config.openaiKey) throw new Error("Clé API OpenAI manquante.");
        return new OpenAIProvider(config.openaiKey);

      case 'gemini':
      default:
        const key = config.googleKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!key) throw new Error("Clé API Gemini manquante.");
        return new GeminiProvider(key);
    }
  }
}

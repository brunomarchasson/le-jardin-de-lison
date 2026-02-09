import { TextProvider, AIConfig } from './types';
import { GeminiProvider } from './providers/GeminiProvider';

export class AIFactory {
  static getTextProvider(config: AIConfig): TextProvider {
    if (config.googleKey) {
      return new GeminiProvider(config.googleKey);
    }
    throw new Error("No Text Provider available. Check your API keys.");
  }
}
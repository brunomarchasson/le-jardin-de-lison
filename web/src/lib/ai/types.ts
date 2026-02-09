export interface TextGenerationResult {
  title: string;
  content: string;
}

export interface TextProvider {
  generate(prompt: string, options: { systemPrompt?: string; examples?: string }): Promise<TextGenerationResult>;
}

export interface AIConfig {
  googleKey?: string;
  systemPrompt?: string;
  examples?: string;
}
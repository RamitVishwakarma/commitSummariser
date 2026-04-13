import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Mistral } from '@mistralai/mistralai';

export interface LlmConfig {
  provider: string;
  apiKey: string;
  model: string;
  customPrompt: string;
}

@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);
  private readonly defaultModel: string;

  constructor(private readonly configService: ConfigService) {
    this.defaultModel = this.configService.get<string>(
      'MISTRAL_DEFAULT_MODEL',
      'mistral-small-latest',
    );
  }

  async generate(prompt: string, config: LlmConfig): Promise<Record<string, unknown>> {
    const apiKey = config.apiKey || this.configService.getOrThrow<string>('MISTRAL_API_KEY');
    const model = config.model || this.defaultModel;
    const systemPrompt =
      config.customPrompt ||
      'You are a developer productivity assistant. Always respond with valid JSON only.';

    const client = new Mistral({ apiKey });

    this.logger.log(`Generating summary with model ${model}`);

    const response = await client.chat.complete({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      maxTokens: 1024,
    });

    const choice = response.choices?.[0];
    if (!choice || !choice.message) throw new Error('No response from Mistral API');

    const messageContent = choice.message.content;
    const text =
      typeof messageContent === 'string'
        ? messageContent
        : JSON.stringify(messageContent);

    return this.parseJsonResponse(text);
  }

  private parseJsonResponse(text: string): Record<string, unknown> {
    const cleaned = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    try {
      return JSON.parse(cleaned) as Record<string, unknown>;
    } catch {
      this.logger.warn(`Failed to parse Mistral response as JSON, wrapping in object`);
      return { raw: cleaned };
    }
  }
}

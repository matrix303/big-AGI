import { LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Vision } from '~/common/stores/llms/llms.types';

import { fromManualMapping, ManualMappings } from './models.data';
import type { ModelDescriptionSchema } from '../../llm.server.types';
import { wireMistralModelsListOutputSchema } from '../mistral.wiretypes';


// [Mistral]
// updated from the models on: https://docs.mistral.ai/getting-started/models/
// and the pricing available on: https://mistral.ai/technology/#pricing

const _knownMistralChatModels: ManualMappings = [
  // General-purpose models

  // Mistral NeMo
  {
    idPrefix: 'open-mistral-nemo-2407',
    label: 'Mistral NeMo (2407)',
    description: 'Mistral NeMo is a state-of-the-art 12B model developed with NVIDIA.',
    contextWindow: 131072, // 128K tokens
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 0.15, output: 0.15 }, // $0.15 /1M tokens input and output
  },
  {
    idPrefix: 'open-mistral-nemo',
    label: '🔗 Mistral NeMo (latest) → open-mistral-nemo-2407',
    symLink: 'open-mistral-nemo-2407',
    hidden: true,
    // Copied details
    description: 'Mistral NeMo is a state-of-the-art 12B model developed with NVIDIA.',
    contextWindow: 131072,
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 0.15, output: 0.15 },
  },

  // Mistral Large 2
  {
    idPrefix: 'mistral-large-2407',
    label: 'Mistral Large 2 (2407)',
    description: 'Top-tier reasoning for high-complexity tasks, for your most sophisticated needs.',
    contextWindow: 131072, // 128K tokens
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn],
    chatPrice: { input: 2, output: 6 }, // $2 /1M tokens input, $6 /1M tokens output
  },
  {
    idPrefix: 'mistral-large-latest',
    label: '🔗 Mistral Large (latest) → mistral-large-2407',
    symLink: 'mistral-large-2407',
    hidden: true,
    // Copied details
    description: 'Top-tier reasoning for high-complexity tasks, for your most sophisticated needs.',
    contextWindow: 131072,
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn],
    chatPrice: { input: 2, output: 6 },
  },
  {
    idPrefix: 'mistral-large-2402',
    label: 'Mistral Large (2402)',
    description: 'Top-tier reasoning for high-complexity tasks.',
    contextWindow: 32768,
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn],
    chatPrice: { input: 4, output: 12 }, // $4 /1M tokens input, $12 /1M tokens output
    isLegacy: true,
    hidden: true,
  },

  // Mistral Small
  {
    idPrefix: 'mistral-small-2409',
    label: 'Mistral Small (24.09)',
    description: 'Cost-efficient, fast, and reliable option for use cases such as translation, summarization, and sentiment analysis.',
    contextWindow: 131072, // 128K tokens
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 0.2, output: 0.6 }, // $0.2 /1M tokens input, $0.6 /1M tokens output
  },
  {
    idPrefix: 'mistral-small-latest',
    label: '🔗 Mistral Small (latest) → mistral-small-2409',
    symLink: 'mistral-small-2409',
    hidden: true,
    // Copied details
    description: 'Cost-efficient, fast, and reliable option for use cases such as translation, summarization, and sentiment analysis.',
    contextWindow: 131072,
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 0.2, output: 0.6 },
  },
  {
    idPrefix: 'mistral-small-2402',
    label: 'Mistral Small (2402) [legacy]',
    description: 'Suitable for simple tasks that one can do in bulk (Classification, Customer Support, or Text Generation).',
    contextWindow: 32768,
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn],
    chatPrice: { input: 1, output: 3 },
    isLegacy: true,
    hidden: true,
  },
  {
    idPrefix: 'mistral-small-2312',
    label: 'Mistral Small (2312) [legacy]',
    description: 'Aka open-mixtral-8x7b. Suitable for simple tasks that one can do in bulk (Classification, Customer Support, or Text Generation).',
    contextWindow: 32768,
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 1, output: 3 },
    isLegacy: true,
    hidden: true,
  },
  {
    idPrefix: 'mistral-small',
    label: '🔗 Mistral Small → mistral-small-2409',
    symLink: 'mistral-small-2409',
    hidden: true,
    // Copied details
    description: 'Cost-efficient, fast, and reliable option for use cases such as translation, summarization, and sentiment analysis.',
    contextWindow: 131072,
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 0.2, output: 0.6 },
  },

  // Specialist models

  // Codestral
  {
    idPrefix: 'codestral-2405',
    label: 'Codestral (2405)',
    description: 'State-of-the-art Mistral model trained specifically for code tasks.',
    contextWindow: 32768, // 32K tokens
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 0.2, output: 0.6 }, // $0.2 /1M tokens input, $0.6 /1M tokens output
  },
  {
    idPrefix: 'codestral-latest',
    label: '🔗 Codestral (latest) → codestral-2405',
    symLink: 'codestral-2405',
    hidden: true,
    // Copied details
    description: 'State-of-the-art Mistral model trained specifically for code tasks.',
    contextWindow: 32768,
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 0.2, output: 0.6 },
  },

  // Codestral Mamba
  {
    idPrefix: 'codestral-mamba-2407',
    label: 'Codestral Mamba (2407)',
    description: 'Our first Mamba 2 open-source model released July 2024.',
    contextWindow: 262144, // 256K tokens
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 0.5, output: 0.5 }, // Placeholder pricing
    hidden: true, // Not listed in pricing table
  },
  {
    idPrefix: 'codestral-mamba-latest',
    label: '🔗 Codestral Mamba (latest) → codestral-mamba-2407',
    symLink: 'codestral-mamba-2407',
    hidden: true,
    // Copied details
    description: 'Our first Mamba 2 open-source model released July 2024.',
    contextWindow: 262144,
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 0.5, output: 0.5 },
  },
  {
    idPrefix: 'open-codestral-mamba',
    label: '🔗 Codestral Mamba → codestral-mamba-2407',
    symLink: 'codestral-mamba-2407',
    hidden: true,
    // Copied details
    description: 'Our first Mamba 2 open-source model released July 2024.',
    contextWindow: 262144,
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 0.5, output: 0.5 },
  },

  // Pixtral
  {
    idPrefix: 'pixtral-12b-2409',
    label: 'Pixtral 12B (24.09)',
    description: 'Vision-capable model.',
    contextWindow: 131072, // 128K tokens
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision],
    chatPrice: { input: 0.15, output: 0.15 }, // $0.15 /1M tokens input and output
  },
  {
    idPrefix: 'pixtral-latest',
    label: '🔗 Pixtral (latest) → pixtral-12b-2409',
    symLink: 'pixtral-12b-2409',
    hidden: true,
    // Copied details
    description: 'Vision-capable model.',
    contextWindow: 131072,
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision],
    chatPrice: { input: 0.15, output: 0.15 },
  },
  {
    idPrefix: 'pixtral-12b',
    label: '🔗 Pixtral 12B → pixtral-12b-2409',
    symLink: 'pixtral-12b-2409',
    hidden: true,
    // Copied details
    description: 'Vision-capable model.',
    contextWindow: 131072,
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision],
    chatPrice: { input: 0.15, output: 0.15 },
  },
  {
    idPrefix: 'pixtral',
    label: '🔗 Pixtral → pixtral-12b-2409',
    symLink: 'pixtral-12b-2409',
    hidden: true,
    // Copied details
    description: 'Vision-capable model.',
    contextWindow: 131072,
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision],
    chatPrice: { input: 0.15, output: 0.15 },
  },

  // Mistral Embed
  {
    idPrefix: 'mistral-embed',
    label: 'Mistral Embed (23.12)',
    description: 'State-of-the-art semantic model for extracting representations of text extracts.',
    contextWindow: 8192, // 8K tokens
    maxCompletionTokens: 8192,
    interfaces: [],
    chatPrice: { input: 0.1, output: 0 }, // $0.1 /1M tokens input, output not applicable
    hidden: true, // Embedding models are usually hidden
  },

  // Research models

  // Mixtral Models
  {
    idPrefix: 'open-mixtral-8x22b-2404',
    label: 'Open Mixtral 8x22B (2404)',
    description: 'Mixtral 8x22B is currently the most performant open model.',
    contextWindow: 65536, // 64K tokens
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn],
    chatPrice: { input: 2, output: 6 }, // $2 /1M tokens input, $6 /1M tokens output
    isLegacy: true,
    hidden: true,
  },
  {
    idPrefix: 'open-mixtral-8x22b',
    label: '🔗 Open Mixtral 8x22B → open-mixtral-8x22b-2404',
    symLink: 'open-mixtral-8x22b-2404',
    hidden: true,
    // Copied details
    description: 'Mixtral 8x22B is currently the most performant open model.',
    contextWindow: 65536,
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn],
    chatPrice: { input: 2, output: 6 },
    isLegacy: true,
  },
  {
    idPrefix: 'open-mixtral-8x7b',
    label: 'Open Mixtral 8x7B (v0.1)',
    description: 'A 7B sparse Mixture-of-Experts (SMoE) model.',
    contextWindow: 32768, // 32K tokens
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 0.7, output: 0.7 }, // $0.7 /1M tokens input and output
    isLegacy: true,
    hidden: true,
  },

  // Mathstral
  {
    idPrefix: 'mathstral-v0.1',
    label: 'Mathstral (v0.1)',
    description: 'Variant of Mistral-7B, optimized for solving advanced mathematics problems.',
    contextWindow: 32768, // 32K tokens
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 0.25, output: 0.25 }, // Placeholder pricing
    hidden: true, // Not listed in pricing table
  },

  // Legacy models

  // Mistral Medium
  {
    idPrefix: 'mistral-medium-2312',
    label: 'Mistral Medium (2312)',
    description: 'Our first commercial model.',
    contextWindow: 32768,
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 2.75, output: 8.1 }, // $2.75 /1M tokens input, $8.1 /1M tokens output
    isLegacy: true,
    hidden: true,
  },
  {
    idPrefix: 'mistral-medium-latest',
    label: '🔗 Mistral Medium (latest) → mistral-medium-2312',
    symLink: 'mistral-medium-2312',
    hidden: true,
    // Copied details
    description: 'Our first commercial model.',
    contextWindow: 32768,
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 2.75, output: 8.1 },
    isLegacy: true,
  },
  {
    idPrefix: 'mistral-medium',
    label: '🔗 Mistral Medium → mistral-medium-2312',
    symLink: 'mistral-medium-2312',
    hidden: true,
    // Copied details
    description: 'Our first commercial model.',
    contextWindow: 32768,
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 2.75, output: 8.1 },
    isLegacy: true,
  },

  // Mistral Tiny
  {
    idPrefix: 'mistral-tiny-2312',
    label: 'Mistral Tiny (2312)',
    description: 'Aka open-mistral-7b. Used for large batch processing tasks where cost is a significant factor but reasoning capabilities are not crucial.',
    contextWindow: 32768,
    interfaces: [LLM_IF_OAI_Chat],
    isLegacy: true,
    hidden: true,
  },
  {
    idPrefix: 'mistral-tiny-2407',
    label: 'Mistral Tiny (2407)',
    description: 'Aka open-mistral-7b. Used for large batch processing tasks where cost is a significant factor but reasoning capabilities are not crucial.',
    contextWindow: 32768,
    interfaces: [LLM_IF_OAI_Chat],
    isLegacy: true,
    hidden: true,
  },
  {
    idPrefix: 'mistral-tiny-latest',
    label: '🔗 Mistral Tiny (latest) → mistral-tiny-2407',
    symLink: 'mistral-tiny-2407',
    hidden: true,
    // Copied details
    description: 'Aka open-mistral-7b. Used for large batch processing tasks where cost is a significant factor but reasoning capabilities are not crucial.',
    contextWindow: 32768,
    interfaces: [LLM_IF_OAI_Chat],
    isLegacy: true,
  },
  {
    idPrefix: 'mistral-tiny',
    label: '🔗 Mistral Tiny → mistral-tiny-2312',
    symLink: 'mistral-tiny-2312',
    hidden: true,
    // Copied details
    description: 'Aka open-mistral-7b. Used for large batch processing tasks where cost is a significant factor but reasoning capabilities are not crucial.',
    contextWindow: 32768,
    interfaces: [LLM_IF_OAI_Chat],
    isLegacy: true,
  },

  // Mistral 7B
  {
    idPrefix: 'open-mistral-7b',
    label: 'Mistral 7B (v0.3)',
    description: 'A 7B transformer model, fast-deployed and easily customizable.',
    contextWindow: 32768, // 32K tokens
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 0.25, output: 0.25 },
    isLegacy: true,
    hidden: true,
  },
];

const mistralModelFamilyOrder = [
  'codestral', 'mistral-large', 'open-mixtral-8x22b', 'mistral-medium', 'open-mixtral-8x7b', 'mistral-small', 'open-mistral-7b', 'mistral-tiny', 'mistral-embed', '🔗',
];

export function mistralModelToModelDescription(_model: unknown): ModelDescriptionSchema {
  const model = wireMistralModelsListOutputSchema.parse(_model);
  return fromManualMapping(_knownMistralChatModels, model.id, model.created, undefined, {
    idPrefix: model.id,
    label: model.id.replaceAll(/[_-]/g, ' '),
    description: 'New Mistral Model',
    contextWindow: 32768,
    interfaces: [LLM_IF_OAI_Chat], // assume..
    hidden: true,
  });
}

export function mistralModelsSort(a: ModelDescriptionSchema, b: ModelDescriptionSchema): number {
  if (a.label.startsWith('🔗') && !b.label.startsWith('🔗')) return 1;
  if (!a.label.startsWith('🔗') && b.label.startsWith('🔗')) return -1;
  const aPrefixIndex = mistralModelFamilyOrder.findIndex(prefix => a.id.startsWith(prefix));
  const bPrefixIndex = mistralModelFamilyOrder.findIndex(prefix => b.id.startsWith(prefix));
  if (aPrefixIndex !== -1 && bPrefixIndex !== -1) {
    if (aPrefixIndex !== bPrefixIndex)
      return aPrefixIndex - bPrefixIndex;
    return b.label.localeCompare(a.label);
  }
  return aPrefixIndex !== -1 ? 1 : -1;
}

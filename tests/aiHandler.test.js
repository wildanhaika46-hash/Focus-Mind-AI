import { describe, it, expect, vi } from 'vitest';

// Mock the Chrome API
global.chrome = {
  ai: {
    canCreateGenericSession: vi.fn().mockResolvedValue('readily'),
    createGenericSession: vi.fn().mockResolvedValue({
      prompt: vi.fn().mockImplementation(async (prompt) => `Mocked AI response for: "${prompt.substring(0, 50)}..."`),
      destroy: vi.fn(),
    }),
  },
};

import { summarizeText, rewriteText } from '../src/aiHandler.js';

describe('aiHandler', () => {
  it('should summarize text using the AI model', async () => {
    const summary = await summarizeText('This is a long text about AI that needs summarizing.');
    expect(summary).toContain('Mocked AI response');
    expect(global.chrome.ai.createGenericSession).toHaveBeenCalled();
  });

  it('should rewrite text using the AI model', async () => {
    const rewrittenText = await rewriteText('Rewrite this text please.', 'formal');
    expect(rewrittenText).toContain('Mocked AI response');
    expect(global.chrome.ai.createGenericSession).toHaveBeenCalled();
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the Chrome API
global.chrome = {
  declarativeNetRequest: {
    updateDynamicRules: vi.fn().mockResolvedValue(undefined),
  },
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn().mockResolvedValue(undefined),
    },
  },
};

import { toggleFocusMode, updateBlockedSites } from '../src/focusManager.js';

describe('focusManager', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('should enable blocking when toggling focus mode on', async () => {
    // Mock storage to return that focus mode is currently off
    global.chrome.storage.local.get.mockResolvedValue({
      focusModeActive: false,
      blockedSites: ['youtube.com', 'facebook.com'],
    });

    await toggleFocusMode();

    // Expect storage to be updated to set focus mode to active
    expect(global.chrome.storage.local.set).toHaveBeenCalledWith({ focusModeActive: true });

    // Expect declarativeNetRequest to be called to add blocking rules
    expect(global.chrome.declarativeNetRequest.updateDynamicRules).toHaveBeenCalledWith(
      expect.objectContaining({
        addRules: expect.any(Array),
      })
    );
  });

  it('should disable blocking when toggling focus mode off', async () => {
    // Mock storage to return that focus mode is currently on
    global.chrome.storage.local.get.mockResolvedValue({
      focusModeActive: true,
      blockedSites: ['youtube.com'],
    });

    await toggleFocusMode();

    // Expect storage to be updated to set focus mode to inactive
    expect(global.chrome.storage.local.set).toHaveBeenCalledWith({ focusModeActive: false });

    // Expect declarativeNetRequest to be called to remove blocking rules
    expect(global.chrome.declarativeNetRequest.updateDynamicRules).toHaveBeenCalledWith(
      expect.objectContaining({
        removeRuleIds: [1],
      })
    );
  });

  it('should update blocked sites and re-apply rules if focus mode is active', async () => {
    const newSites = ['twitter.com', 'reddit.com'];
    // Mock storage to return that focus mode is active
    global.chrome.storage.local.get.mockResolvedValue({ focusModeActive: true });

    await updateBlockedSites(newSites);

    // Expect storage to be updated with the new list of sites
    expect(global.chrome.storage.local.set).toHaveBeenCalledWith({ blockedSites: newSites });

    // Expect rules to be updated because focus mode is active
    expect(global.chrome.declarativeNetRequest.updateDynamicRules).toHaveBeenCalled();
  });
});

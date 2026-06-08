import { describe, it, expect } from 'vitest';
import { fileToBase64 } from './fileToBase64';

describe('fileToBase64', () => {
  it('should convert file to base64 string', async () => {
    const file = new File(['hello'], 'test.txt', {
      type: 'text/plain',
    });

    const result = await fileToBase64(file);

    expect(result).toContain('data:text/plain;base64,');
  });

  it('should reject when file is not provided', async () => {
    await expect(fileToBase64(null)).rejects.toThrow('No file provided');
  });
});

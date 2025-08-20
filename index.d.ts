export interface CleanTextOptions {
  /**
   * Language or array of languages to filter profanity from.
   * @default 'hindi'
   */
  language?: string | string[];
  
  /**
   * Character used to replace profane words.
   * @default '*'
   */
  grawlixChar?: string;
  
  /**
   * Words that should never be censored, even if they appear in the profanity list.
   */
  alwaysAllow?: string[];
  
  /**
   * Words that should always be censored, even if they don't appear in the profanity list.
   */
  alwaysBlock?: string[];
  
  /**
   * Custom set of abusive words for testing purposes.
   */
  customAbuseSet?: Set<string>;
}

/**
 * Cleans the input text by removing abusive words from selected languages.
 * @param text - The input text to clean.
 * @param options - Configuration options for text cleaning.
 * @returns The cleaned text with profane words replaced.
 */
export function cleanText(text: string, options?: CleanTextOptions): string;

/**
 * Builds a Set of abusive words from the map, filtered by language(s).
 * @param map - The words map.
 * @param languages - Language or array of languages to include.
 * @returns Set of abusive words.
 */
export function buildAbuseSetFromMap(
  map: Map<string, string[]>, 
  languages?: string | string[]
): Set<string> | null;

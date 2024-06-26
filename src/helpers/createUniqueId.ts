/**
 * Generates a unique identifier string.
 * This function creates a random alphanumeric string of 9 characters.
 * This string is useful for creating unique IDs for various purposes,
 * such as assigning unique keys to elements in a list.
 *
 * @returns {string} Uniq string.
 */
export function createUniqueId(): string {
  const timestamp = Date.now().toString(36); // Convert timestamp to base-36
  const randomPart = Math.random().toString(36).substring(2); // Extract random digits

  return timestamp + randomPart;
}

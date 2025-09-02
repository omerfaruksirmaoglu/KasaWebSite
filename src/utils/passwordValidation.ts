/**
 * Validates the numeric password for the first safe
 * Accepts: 1425925, 14 25 925, 14-25-925, etc.
 */
export const validateNumericPassword = (input: string): boolean => {
  const correctPassword = '1425925';
  const cleanInput = input.replace(/[\s\-]/g, '');
  return cleanInput === correctPassword;
};

/**
 * Validates the word password for the second safe
 * Accepts: "kuzey yıldızı" with various normalizations
 */
export const validateWordPassword = (input: string): boolean => {
  const correctPassword = 'kuzey yıldızı';
  
  // Normalize the input
  let normalizedInput = input
    .toLowerCase()
    .trim()
    .replace(/[\s\-\t]+/g, ' ') // Replace multiple spaces/tabs/hyphens with single space
    .replace(/ı/g, 'i') // Turkish character normalization option
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ö/g, 'o');
    
  // Also check without spaces
  const normalizedInputNoSpaces = normalizedInput.replace(/\s/g, '');
  
  // Normalize the correct password
  let normalizedCorrect = correctPassword
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ö/g, 'o');
    
  const normalizedCorrectNoSpaces = normalizedCorrect.replace(/\s/g, '');
  
  // Check both with and without Turkish character normalization
  const originalNormalized = input
    .toLowerCase()
    .trim()
    .replace(/[\s\-\t]+/g, ' ');
  
  const originalNormalizedNoSpaces = originalNormalized.replace(/\s/g, '');
  
  return (
    normalizedInput === normalizedCorrect ||
    normalizedInputNoSpaces === normalizedCorrectNoSpaces ||
    originalNormalized === correctPassword.toLowerCase() ||
    originalNormalizedNoSpaces === correctPassword.toLowerCase().replace(/\s/g, '')
  );
};
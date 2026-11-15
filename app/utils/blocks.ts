/**
 * Returns the inline style of an image or gallery block image, like the Starterkit's image snippet.
 */
export function getBlockImageStyle(content: {
  ratio: string
  crop: 'true' | 'false'
}) {
  return {
    aspectRatio: content.ratio || undefined,
    objectFit: content.crop === 'false' ? 'contain' : 'cover',
  }
}

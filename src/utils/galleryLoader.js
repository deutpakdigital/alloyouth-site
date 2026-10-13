// Builds the gallery from the folder structure under public/assets/gallery:
//   images/<Brand>/<Sub category...>/<file>   and   videos/<file>
// Drop new files into those folders and they appear automatically.

const publicImages = import.meta.glob(
  '/public/assets/gallery/images/**/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true, query: '?url', import: 'default' }
)
const publicVideos = import.meta.glob('/public/assets/gallery/videos/**/*.{mp4,webm,mov,MP4,WEBM,MOV}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const srcImages = import.meta.glob('/src/assets/gallery/images/**/*.{jpg,jpeg,png,webp,gif,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const srcVideos = import.meta.glob('/src/assets/gallery/videos/**/*.{mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export function loadGallery() {
  const brands = {}

  const add = (filePath, url, type) => {
    const match = filePath.replace(/\\/g, '/').match(/gallery\/(?:images|videos)\/(.+)$/i)
    if (!match) return

    const parts = match[1].split('/')
    let brand = 'Featured'
    let subCategory = ''
    const fileName = parts[parts.length - 1]
    if (parts.length > 1) {
      brand = parts[0]
      if (parts.length > 2) subCategory = parts.slice(1, -1).join(' / ')
    }

    const key = brand.toLowerCase().replace(/\s+/g, '-')
    const displayName = brand.replace(/[-_]/g, ' ').trim()
    if (!brands[key]) brands[key] = { key, displayName, items: [] }

    let finalUrl = url
    if (typeof url === 'string' && url.startsWith('/public/')) finalUrl = url.replace('/public', '')

    brands[key].items.push({
      id: filePath,
      type,
      url: finalUrl,
      fileName,
      subCategory,
      brandName: displayName,
      title: fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
    })
  }

  for (const [p] of Object.entries(publicImages)) add(p, p.replace('/public', ''), 'image')
  for (const [p] of Object.entries(publicVideos)) add(p, p.replace('/public', ''), 'video')
  for (const [p, url] of Object.entries(srcImages)) add(p, url, 'image')
  for (const [p, url] of Object.entries(srcVideos)) add(p, url, 'video')

  const list = Object.values(brands)
  const allItems = list.flatMap((b) => b.items)
  return { brands: list, allItems, totalCount: allItems.length }
}

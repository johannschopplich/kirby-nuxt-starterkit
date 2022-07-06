export interface KirbyImage {
  id: string
  filename: string
  url: string
  alt: string
}

export interface KirbySite {
  title: string
  description: string
  children: {
    id: string
    title: string
    isListed: boolean
  }[]
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTENTFUL_SPACE_ID: string
  readonly VITE_CONTENTFUL_DELIVERY_API_ACCESS_TOKEN: string
  readonly VITE_CONTENTFUL_PREVIEW_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

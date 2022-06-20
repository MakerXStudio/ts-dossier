export interface IPageMeta {
  title: string
  slug: string
  menuIndex: number
}

export const extractPageMeta = (data: { [key: string]: any }): IPageMeta => ({
  title: data['title'],
  slug: data['slug'],
  menuIndex: Number(data['menuIndex']),
})

export const sortPageMetaDescending = (meta: IPageMeta[]): IPageMeta[] => meta.sort((pageA, pageB) => pageA.menuIndex - pageB.menuIndex)

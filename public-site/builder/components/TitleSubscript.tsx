export interface BlogTitleSubscriptProps {
  Date: string
}

export const TitleSubscript = (props: BlogTitleSubscriptProps) => (
  <p>
    Published by <strong>Wade Baglin (pleb)</strong> on {props.Date}
  </p>
)

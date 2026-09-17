import { PageFrame, PageFrameProps } from "./types"
import HeaderConstructor from "../Header"
import { FullSlug, resolveRelative } from "../../util/path"

const Header = HeaderConstructor()

function SiteNav({ componentData }: Pick<PageFrameProps, "componentData">) {
  const current = componentData.fileData.slug!
  const href = (slug: string) => resolveRelative(current, slug as FullSlug)

  return (
    <nav class="site-nav" aria-label="主导航">
      <a class="site-brand internal" href={href("")}>
        <span class="site-brand-mark" aria-hidden="true">J</span>
        <span>江遥 · 技术笔记</span>
      </a>
      <div class="site-nav-links">
        <a class="internal" href={href("")}>首页</a>
        <a class="internal" href={href("Java")}>Java</a>
        <a class="internal" href={href("项目文档")}>项目文档</a>
        <a class="internal" href={href("面试笔记")}>面试笔记</a>
      </div>
    </nav>
  )
}

/**
 * The default page frame — three-column layout with left sidebar, center
 * content (header + body + afterBody), and right sidebar, followed by a footer.
 *
 * This is the original Quartz layout, extracted from renderPage.tsx.
 */
export const DefaultFrame: PageFrame = {
  name: "default",
  render({
    componentData,
    header,
    beforeBody,
    pageBody: Content,
    afterBody,
    left,
    right,
    footer,
  }: PageFrameProps) {
    return (
      <>
        <a class="skip-link" href="#main-content">跳到正文</a>
        <SiteNav componentData={componentData} />
        <div class="left sidebar">
          {left.map((BodyComponent) => (
            <BodyComponent {...componentData} />
          ))}
        </div>
        <div class="center" id="main-content">
          <div class="page-header">
            <Header {...componentData}>
              {header.map((HeaderComponent) => (
                <HeaderComponent {...componentData} />
              ))}
            </Header>
            <div class="popover-hint">
              {beforeBody.map((BodyComponent) => (
                <BodyComponent {...componentData} />
              ))}
            </div>
          </div>
          <Content {...componentData} />
          <hr />
          <div class="page-footer">
            {afterBody.map((BodyComponent) => (
              <BodyComponent {...componentData} />
            ))}
          </div>
        </div>
        <div class="right sidebar">
          {right.map((BodyComponent) => (
            <BodyComponent {...componentData} />
          ))}
        </div>
        {footer.map((FooterComponent) => (
          <FooterComponent {...componentData} />
        ))}
      </>
    )
  },
}

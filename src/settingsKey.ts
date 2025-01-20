import fileTaskBold from "./css/additional/taskBold.css?inline"
import fileTaskColor from "./css/additional/taskColor.css?inline"
import fileSidebar from "./css/additional/sidebar.css?inline"
import fileAccentColorUnderline from "./css/additional/accentColorUnderline.css?inline"
import { styleHandlers } from "./util"


// スタイル定義と適用関数を統合
export const themeStyles = {
  // 以下はenum設定を除く、基本的なboolean設定

  // リンクスタイル
  linkAccentUnderline: {
    key: "accentColorUnderline",
    style: fileAccentColorUnderline,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("accentColorUnderline", themeStyles.linkAccentUnderline.style)
    }
  },

  // 他のスタイル定義も同様に変換
  taskMarkerColor: {
    key: "taskColor",
    style: fileTaskColor,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("taskColor", fileTaskColor)
    }
  },
  // ...その他の基本的なboolean設定は同じパターンで...
  taskMarkerBold: {
    key: "taskBold",
    style: fileTaskBold,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("taskBold", fileTaskBold)
    }
  },
  systemFontOverride: {
    key: "fontFamilyUnset",
    style: String.raw`
                 html:not(.is-native-android) {
                   font-family: unset !important;
                 }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("fontFamilyUnset", themeStyles.systemFontOverride.style)
    }
  },
  sidebarHideGraphView: {
    key: "removeMenuGraphView",
    style: String.raw`
                 #left-sidebar div.graph-view-nav {
                   display:none;
                 }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("removeMenuGraphView", themeStyles.sidebarHideGraphView.style)
    }
  },
  sidebarMenuHeight: {
    key: "leftSidebarMenuHeight",
    style: String.raw`
                 #left-sidebar div.left-sidebar-inner div.nav-content-item ul a .page-title {
                   min-height: 2em;
                   margin-right: -1em;
                   white-space: pre-wrap;
                 }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("leftSidebarMenuHeight", themeStyles.sidebarMenuHeight.style)
    }
  },
  sidebarMenuOpacity: {
    key: "leftMenuFavRecentHoverOpacity",
    style: String.raw`
                 #left-sidebar div.left-sidebar-inner div.nav-content-item:not(:hover) {
                   opacity: 0.6;
                 }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("leftMenuFavRecentHoverOpacity", themeStyles.sidebarMenuOpacity.style)
    }
  },
  // ツールバーのアイコンをhover時以外は薄くする
  toolbarIconOpacity: {
    key: "toolbarIconOpacity",
    style: String.raw`
                 #head.cp__header>div.r:not(:hover) {
                   opacity: 0.5;
                 }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("toolbarIconOpacity", themeStyles.toolbarIconOpacity.style)
    }
  },
  // クエリーに関して、hover時以外は薄くする
  queryOpacity: {
    key: "queryOpacity",
    style: String.raw`
                 :is(#today-queries,
                 #root div.scheduled-or-deadlines,
                 #root div.custom-query):not(:hover,:focus-within) {
                   opacity:0.88;
                 }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("queryOpacity", themeStyles.queryOpacity.style)
    }
  },
  // クエリーに関して、文字サイズを小さくする
  queryFontSize: {
    key: "queryFontSize",
    style: String.raw`
                 #today-queries,
                 #root div.scheduled-or-deadlines,
                 #root div.custom-query {
                   font-size: 0.95em;
                 }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("queryFontSize", themeStyles.queryFontSize.style)
    }
  },
  // クエリーに関して、各ブロックが存在するページ名の文字サイズを大きくする
  queryPageNameFontSize: {
    key: "queryPageNameFontSize",
    style: String.raw`
                 #root div.foldable-title {
                   margin-bottom: 0.5em;
                   & a.page-ref {
                     font-size: 1.4em;
                   }
                 }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("queryPageNameFontSize", themeStyles.queryPageNameFontSize.style)
    }
  },
  // embedに関して、hover時以外は薄くする
  embedOpacity: {
    key: "embedOpacity",
    style: String.raw`
                 #root div:is(.page-embed,.embed-block):not(:hover,:focus-within) {
                   opacity:0.88;
                 }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("embedOpacity", themeStyles.embedOpacity.style)
    }
  },
  // embedに関して、文字サイズを小さくする
  embedFontSize: {
    key: "embedFontSize",
    style: String.raw`
                 #root div:is(.page-embed,.embed-block) {
                   font-size: 0.95em;
                 }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("embedFontSize", themeStyles.embedFontSize.style)
    }
  },
  // ブロックの背景色に関して、hover時にブロックの深さによって色をつける
  blockHoverDepthColor: {
    key: "blockHoverDepthColor",
    style: String.raw`
               :is(#root>div..dark-theme,html[data-theme=dark]) div.ls-block:is(:hover,:focus-within) {
                   background-color: rgba(0, 0, 0, 0.06);
                   border-radius: 0.5em;
               }
               html[data-theme=light] div.ls-block:is(:hover,:focus-within) {
                   background-color: rgba(0, 0, 0, 0.02);
                   border-radius: 0.5em;
               }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("blockHoverDepthColor", themeStyles.blockHoverDepthColor.style)
    }
  },
  // サイドバーについて。各ノードはhover時以外は薄くする
  sidebarNodeOpacity: {
    key: "sidebarNodeOpacity",
    style: String.raw`
                 #right-sidebar-container div.sidebar-item-list>div.sidebar-item:not(:hover, :focus-within) {
                   opacity: 0.85;
                 }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("sidebarNodeOpacity", themeStyles.sidebarNodeOpacity.style)
    }
  },
  // サイドバーについて。文字を小さくする
  sidebarNodeFontSize: {
    key: "sidebarNodeFontSize",
    style: String.raw`
                 #right-sidebar-container div.sidebar-item-list>div.sidebar-item {
                   font-size: 0.96em;
                 }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("sidebarNodeFontSize", themeStyles.sidebarNodeFontSize.style)
    }
  },
  // サイドバーについて。ヘッダーのアイコンとタイトルを大きくする
  sidebarHeaderLarge: {
    key: "sidebarHeaderLarge",
    style: String.raw`
                 #right-sidebar-container div.sidebar-item-list>div.sidebar-item div.sidebar-item-header {
                           font-size: 1.6em;
                   font-weight: 800;
           
                   & span.ui__icon>svg {
                               width: 30px;
                               height: 30px;
                   }
                 }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("sidebarHeaderLarge", themeStyles.sidebarHeaderLarge.style)
    }
  },
  // マークダウンテーブルを崩れにくくする
  markdownTable: {
    key: "markdownTable",
    style: String.raw`
               #root div.table-wrapper {
                 max-height: 70vh;
                   &>table.table-auto {
                     overflow: auto;
                     min-width: max-content;
                       & :is(th,td) {
                         max-width: 600px;
                       }
                   }
               }
               `,
    apply: (value: boolean) => {
      if (value) styleHandlers.applyStyle("markdownTable", themeStyles.markdownTable.style)
    }
  },



  // 以下はenum設定

  // 特殊な設定が必要なものは個別に定義
  sidebarMenuAlignment: {
    key: "leftSidebarMenuJustifyContent",
    style: (value: string) => String.raw`
                 #left-sidebar div.left-sidebar-inner div.nav-contents-container {
                   justify-content: ${value};
                 }
               `,
    apply: (value: string) => {
      if (value !== "unset") styleHandlers.applyStyle("leftSidebarMenuJustifyContent", themeStyles.sidebarMenuAlignment.style(value))
    }
  },
  sidebarBackground: {
    key: "leftSidebarMenuBackground",
    style: (value: string) => String.raw`
                 html[data-theme=dark]>body>div#root>div,
                 #root>div.dark-theme {
                   &>main div#left-sidebar div.left-sidebar-inner {
                     background-color: ${value};
                   }
                 }
               `,
    apply: (value: string) => {
      if (value !== "Theme color") styleHandlers.applyStyle("leftSidebarMenuBackground", themeStyles.sidebarBackground.style(value))
    }
  },
  // サイドバーのスタイル
  sidebarStyle: {
    key: "sidebarStyle",
    style: fileSidebar,
    apply: (value: string) => {
      if (value === "compact") styleHandlers.applyStyle("sidebarStyle", fileSidebar)
    }
  },
}
import "@logseq/libs" //https://plugins-doc.logseq.com/
import { LSPluginBaseInfo, SettingSchemaDesc, } from "@logseq/libs/dist/LSPlugin.user"
import { setup as l10nSetup, t } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n
import fileCommon from "./css/common.css?inline"
import fileTaskBold from "./css/taskBold.css?inline"
import fileTaskColor from "./css/taskColor.css?inline"
import fileSidebar from "./css/sidebar.css?inline"
import af from "./translations/af.json"
import de from "./translations/de.json"
import es from "./translations/es.json"
import fr from "./translations/fr.json"
import id from "./translations/id.json"
import it from "./translations/it.json"
import ja from "./translations/ja.json"
import ko from "./translations/ko.json"
import nbNO from "./translations/nb-NO.json"
import nl from "./translations/nl.json"
import pl from "./translations/pl.json"
import ptBR from "./translations/pt-BR.json"
import ptPT from "./translations/pt-PT.json"
import ru from "./translations/ru.json"
import sk from "./translations/sk.json"
import tr from "./translations/tr.json"
import uk from "./translations/uk.json"
import zhCN from "./translations/zh-CN.json"
import zhHant from "./translations/zh-Hant.json"

// スタイル適用のユーティリティ関数
const styleHandlers = {
  applyStyle: (key: string, style: string) => {
    logseq.provideStyle({ key, style })
  },
  removeStyle: (styleKey: string) => {
    const styleElement = parent.document.head.querySelector(
      `style[data-injected-style^="${styleKey}"]`
    ) as HTMLStyleElement
    if (styleElement) styleElement.remove()
  }
}

// スタイル定義と適用関数を統合
const themeStyles = {
  // 以下はenum設定を除く、基本的なboolean設定

  // リンクスタイル
  linkAccentUnderline: {
    key: "accentColorUnderline",
    style: String.raw`
      #main-content-container a.page-ref {
        color: unset;
        border-bottom:1.5px solid var(--lx-accent-11,var(--ls-link-text-color,hsl(var(--primary)/.8)));
      }
    `,
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


/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
const settingsTemplate = (): SettingSchemaDesc[] => [
  {
    key: "headingRendering",
    // レンダリング
    title: t("Rendering"),
    type: "heading",
    description: "",
    default: "",
  }, {
    key: themeStyles.linkAccentUnderline.key,
    // 下線に対して"アクセントカラー"の色を適用する
    title: t("Apply accent color to underline"),
    type: "boolean",
    default: true,
    description: "",
  }, {
    key: themeStyles.systemFontOverride.key,
    // `html`の`font-family`をアンセットすることで、フォントの高速読み込みを行う
    title: t("Unset `font-family` in `html` for fast font loading"),
    type: "boolean",
    default: false,
    description: "default: false",
  }, {
    key: themeStyles.taskMarkerColor.key,
    type: "boolean",
    // タスクのマーカーに色を付ける
    title: t("Enable task-marker color"),
    description: "",
    default: false,
  }, {
    //文字を太くする
    key: themeStyles.taskMarkerBold.key,
    type: "boolean",
    title: t("Enable bold task marker"),
    description: "",
    default: false,
  }, {
    key: themeStyles.markdownTable.key,
    // マークダウンテーブルを崩れにくくする
    title: t("Stabilize markdown table") + "🆕",
    type: "boolean",
    default: true,
    description: "",
  }, {
    key: "headingLeftSidebarMenu",
    // 左メニュー
    title: t("Left menu"),
    type: "heading",
    description: "",
    default: "",
  }, {
    key: themeStyles.sidebarHideGraphView.key,
    // グラフビューのボタンを取り除く
    title: t("Remove `Graph View` button"),
    type: "boolean",
    default: false,
    description: "",
  }, {
    key: themeStyles.sidebarBackground.key,
    // 左メニューの背景色を変更する
    title: t("Change the background color of the left menu"),
    type: "enum",
    enumChoices: ["Theme color", "black", "navy", "#2e2930", "unset"],
    default: "Theme color",
    description: `
    default: Theme color
    unset: primary background color
  #2e2930: dark purple
    `,
  }, {
    key: themeStyles.sidebarMenuHeight.key,
    // FAVORITESとRECENTのメニューの間隔を広げる
    title: t("Increase the gap between favorites and history a little"),
    type: "boolean",
    default: true,
    description: "default: true",
  }, {
    key: themeStyles.sidebarMenuAlignment.key,
    // FAVORITESとRECENTのメニューの位置を調整する
    title: t("Adjust the position of favorites and history"),
    type: "enum",
    enumChoices: ["unset", "space-evenly", "center", "space-around"],
    default: "unset",
    description: "default: unset",
  }, {
    key: themeStyles.sidebarMenuOpacity.key,
    // お気に入りと履歴について、マウスホバー時以外は薄くする
    title: t("Favorites and history are lightened when not hovering") + "🆕",
    type: "boolean",
    default: true,
    description: "",
  }, {
    key: "headingUI",
    // UI
    title: t("UI"),
    type: "heading",
    description: "",
    default: "",
  }, {
    key: themeStyles.toolbarIconOpacity.key,
    // ツールバーのアイコンをhover時以外は薄くする
    title: t("Toolbar icons are lightened when not hovering") + "🆕",
    type: "boolean",
    default: true,
    description: "",
  }, {
    key: themeStyles.queryOpacity.key,
    // クエリーに関して、hover時以外は薄くする
    title: t("Queries are lightened when not hovering") + "🆕",
    type: "boolean",
    default: true,
    description: "",
  }, {
    key: themeStyles.queryFontSize.key,
    // クエリーに関して、文字サイズを小さくする
    title: t("Reduce the font size of the query") + "🆕",
    type: "boolean",
    default: true,
    description: "",
  }, {
    key: themeStyles.queryPageNameFontSize.key,
    // クエリーに関して、各ブロックが存在するページ名の文字サイズを大きくする
    title: t("Increase the font size of the page name where each block exists in the query") + "🆕",
    type: "boolean",
    default: true,
    description: "",
  }, {
    key: themeStyles.embedOpacity.key,
    // embedに関して、hover時以外は薄くする
    title: t("Embeds are lightened when not hovering") + "🆕",
    type: "boolean",
    default: true,
    description: "",
  }, {
    key: themeStyles.embedFontSize.key,
    // embedに関して、文字サイズを小さくする
    title: t("Reduce the font size of the embed") + "🆕",
    type: "boolean",
    default: true,
    description: "",
  }, {
    key: themeStyles.blockHoverDepthColor.key,
    // ブロックの背景色に関して、hover時にブロックの深さによって色をつける
    title: t("The block background color is colored according to the depth of the block when hovering") + "🆕",
    type: "boolean",
    default: true,
    description: "",
  }, {
    key: "headingSidebar",
    // サイドバー
    title: t("Sidebar"),
    type: "heading",
    description: "",
    default: "",
  }, {
    key: themeStyles.sidebarStyle.key,
    // サイドバーのスタイルを変更する
    title: t("Change the style of the sidebar") + "🆕",
    type: "enum",
    enumChoices: ["default", "compact"],
    default: "default",
    description: "",
  }, {
    key: themeStyles.sidebarNodeOpacity.key,
    // サイドバーの各ノードはhover時以外は薄くする
    title: t("Each node in the sidebar is lightened when not hovering") + "🆕",
    type: "boolean",
    default: true,
    description: "",
  }, {
    key: themeStyles.sidebarNodeFontSize.key,
    // サイドバーの各ノードは文字を小さくする
    title: t("Each node in the sidebar has a smaller font size") + "🆕",
    type: "boolean",
    default: true,
    description: "",
  }, {
    key: themeStyles.sidebarHeaderLarge.key,
    // サイドバーのヘッダーのアイコンとタイトルを大きくする
    title: t("Enlarge the icon and title of the header in the sidebar") + "🆕",
    type: "boolean",
    default: true,
    description: "",
  },
]


/* main */
const main = async () => {
  //多言語化 L10N
  await l10nSetup({
    builtinTranslations: {//Full translations
      ja, af, de, es, fr, id, it, ko, "nb-NO": nbNO, nl, pl, "pt-BR": ptBR, "pt-PT": ptPT, ru, sk, tr, uk, "zh-CN": zhCN, "zh-Hant": zhHant
    }
  })

  /* user settings */
  logseq.useSettingsSchema(settingsTemplate())
  if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300)

  /* provideStyle */
  Object.entries(themeStyles).forEach(([_, style]) => {
    const value = logseq.settings![style.key]
    if (value !== undefined)
      style.apply(value as never)
  })

  logseq.provideStyle({ key: "common", style: fileCommon })

  // onSettingsChangedの処理を簡略化
  logseq.onSettingsChanged((newSet: LSPluginBaseInfo["settings"], oldSet: LSPluginBaseInfo["settings"]) => {
    Object.values(themeStyles).forEach(style => {
      const oldValue = oldSet[style.key]
      const newValue = newSet[style.key]

      if (oldValue !== newValue) {
        if (!newValue || newValue === "unset" || newValue === "Theme color" || newValue === "default")
          styleHandlers.removeStyle(style.key)
        else
          style.apply(newValue as never)
      }
    })
  })
} /* end_main */

logseq.ready(main).catch(console.error)

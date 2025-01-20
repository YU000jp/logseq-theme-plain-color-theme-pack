import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin.user"
import { t } from "logseq-l10n"
import { themeStyles } from "./settingsKey"

/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate = (): SettingSchemaDesc[] => [
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
  },


  {
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
  },


  {
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
  },


  {
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

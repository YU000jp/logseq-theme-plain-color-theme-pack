import '@logseq/libs'; //https://plugins-doc.logseq.com/
import { LSPluginBaseInfo, SettingSchemaDesc, } from '@logseq/libs/dist/LSPlugin.user';
//import { setup as l10nSetup, t } from "logseq-l10n"; //https://github.com/sethyuan/logseq-l10n
//import ja from "./translations/ja.json";
import fileTaskColor from './css/taskColor.css?inline';
import fileTaskBold from './css/taskBold.css?inline';
import fileCommon from './css/common.css?inline';

/* main */
const main = () => {
  // (async () => {
  //   try {
  //     await l10nSetup({ builtinTranslations: { ja } });
  //   } finally {
  /* user settings */
  logseq.useSettingsSchema(settingsTemplate);
  if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300);
  //   }
  // })();

  /* provideStyle */
  if (logseq.settings!.removeMenuGraphView === true) removeMenuGraphView();
  if (logseq.settings!.taskColor === true) taskColor();
  if (logseq.settings!.taskBold === true) taskBold();
  if (logseq.settings!.fontFamilyUnset === true) fontFamilyUnset();

  logseq.provideStyle({ key: "common", style: fileCommon });

  logseq.onSettingsChanged((newSet: LSPluginBaseInfo['settings'], oldSet: LSPluginBaseInfo['settings']) => {
    if (oldSet.taskColor === true && newSet.taskColor === false) removeProvideStyle(keyTaskColor);
    else if (oldSet.taskColor === false && newSet.taskColor === true) taskColor();
    if (oldSet.taskBold === true && newSet.taskBold === false) removeProvideStyle(keyTaskBold);
    else if (oldSet.taskBold === false && newSet.taskBold === true) taskBold();
    if (oldSet.removeMenuGraphView !== true && newSet.removeMenuGraphView === true) {
      removeMenuGraphView();
    } else
      if (oldSet.removeMenuGraphView === true && newSet.removeMenuGraphView !== true) {
        removeProvideStyle(keyRemoveMenuGraphView);
      }
    if (oldSet.fontFamilyUnset !== true && newSet.fontFamilyUnset === true) {
      fontFamilyUnset();
    }
    else if (oldSet.fontFamilyUnset === true && newSet.fontFamilyUnset !== true) {
      removeProvideStyle(keyFontFamilyUnset);
    }
  });

};/* end_main */


const keyTaskColor = 'taskColor';
const taskColor = () => logseq.provideStyle({
  key: keyTaskColor,
  style: fileTaskColor
});

const keyTaskBold = 'taskBold';
const taskBold = () => logseq.provideStyle({
  key: keyTaskBold,
  style: fileTaskBold
});

const keyRemoveMenuGraphView = "removeMenuGraphView";
const removeMenuGraphView = () => logseq.provideStyle({
  key: keyRemoveMenuGraphView,
  style: String.raw`
div#left-sidebar div.graph-view-nav{
  display:none;
}
`  });

const keyFontFamilyUnset = 'fontFamilyUnset';
const fontFamilyUnset = () => logseq.provideStyle({
  key: keyFontFamilyUnset,
  style: String.raw`
html:not(.is-native-android) {
  font-family: unset !important;
  /* var(--ls-font-family) */
}
`  });

const removeProvideStyle = (className: string) => {
  const doc = parent.document.head.querySelector(`style[data-injected-style^="${className}"]`) as HTMLStyleElement;
  if (doc) doc.remove();
};

const removeCSSclass = (className: string) => {
  if (parent.document.body.classList?.contains(className)) parent.document.body.classList.remove(className);
}


/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
const settingsTemplate: SettingSchemaDesc[] = [
  {
    key: 'taskColor',
    type: 'boolean',
    title: 'Enable task marker color',
    description: '',
    default: false,
  },
  {//文字を太くする
    key: 'taskBold',
    type: 'boolean',
    title: 'Enable Bold task marker',
    description: '',
    default: false,
  },
  {
    key: "removeMenuGraphView",
    title: "Remove `Graph View` from the left sidebar menu",
    type: "boolean",
    default: false,
    description: "",
  },
  {
    key: "fontFamilyUnset",
    title: "Unset `font-family` in `html` For fast font loading",
    type: "boolean",
    default: true,
    description: "default: true",
  },
];


logseq.ready(main).catch(console.error);
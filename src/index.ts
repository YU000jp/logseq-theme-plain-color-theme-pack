import "@logseq/libs"; //https://plugins-doc.logseq.com/
import { LSPluginBaseInfo, } from "@logseq/libs/dist/LSPlugin.user"
import { setup as l10nSetup } from "logseq-l10n"; //https://github.com/sethyuan/logseq-l10n
import fileCommon from "./css/common.css?inline"
import { themeStyles } from "./settingsKey"
import { settingsTemplate } from "./settingsTemplate"
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
import { styleHandlers } from "./util"


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
  if (!logseq.settings)
    setTimeout(() => logseq.showSettingsUI(), 300)

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
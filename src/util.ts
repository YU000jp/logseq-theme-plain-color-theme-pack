
// スタイル適用のユーティリティ関数
export const styleHandlers = {
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

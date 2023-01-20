import { globalConfig } from './global-config.js'

const globalNodes = []
let target = __QUASAR_SSR_SERVER__
  ? void 0
  : document.body

export function createGlobalNode (id) {
  const el = document.createElement('div')

  const ubPossibleClasses = [
    'body--dark',
    'body--light',
    'desktop',
    'mobile',
    'touch',
    'no-touch',
    'platform-android',
    'platform-ios',
    'native-mobile',
    'electron',
    'bex',
    'within-iframe',
  ]
  const ubClassList = Array.from(document.body.classList)
  const ubClassListFiltered= ubClassList.filter(value => ubPossibleClasses.includes(value))
  el.setAttribute('class', ubClassListFiltered.join(' '))
  el.setAttribute('data-css-scope', 'quasar')

  if (id !== void 0) {
    el.id = id
  }

  if (globalConfig.globalNodes !== void 0) {
    const cls = globalConfig.globalNodes.class
    if (cls !== void 0) {
      el.className = cls
    }
  }

  target.appendChild(el)
  globalNodes.push(el)

  return el
}

export function removeGlobalNode (el) {
  globalNodes.splice(globalNodes.indexOf(el), 1)
  el.remove()
}

export function changeGlobalNodesTarget (el) {
  if (el !== target) {
    target = el

    globalNodes.forEach(el => {
      if (el.contains(target) === false) {
        target.appendChild(el)
      }
    })
  }
}

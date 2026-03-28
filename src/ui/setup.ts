import { getReact, getReactDOM } from '@/util/react-util'
import type { Container } from 'react-dom/client'
import { REACT_ROOT_ID } from '@/constants'
import App from '@/ui/App'

export function setupUI(stockMarketElement: Element) {
  const rootContainer = createRootContainer(stockMarketElement)
  addMenuPanelToDOM(rootContainer)
}

function createRootContainer(stockMarketElement: Element): Container {
  const rootDiv = document.createElement('div')
  rootDiv.id = REACT_ROOT_ID
  stockMarketElement.previousElementSibling?.before(rootDiv)

  return rootDiv
}

function addMenuPanelToDOM(rootContainer: Container) {
  const root = getReactDOM().createRoot(rootContainer)
  const appElement = getReact().createElement(App)
  root.render(appElement)
}

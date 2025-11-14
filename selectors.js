const mainContainerElement = document.querySelector("#main-container");
const nodeContainerElement = document.querySelector("#node-container");
const parentNodeContainerElement = document.querySelector('div[data-node-id="parent"]')
const currentNodeContainerElement = document.querySelector('div[data-node-id="current"]')
const childrenNodeContainerElement = document.querySelector('div[data-node-id="children"]')

export { nodeContainerElement, parentNodeContainerElement, currentNodeContainerElement, childrenNodeContainerElement }

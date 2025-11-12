const mainContainer = document.querySelector("#main-container");
const nodeContainer = document.querySelector("#node-container");
const parentNodeContainer = document.querySelector('div[data-node-id="parent"]')
const currentNodeContainer = document.querySelector('div[data-node-id="current"]')
const childrenNodeContainer = document.querySelector('div[data-node-id="children"]')

export { nodeContainer, parentNodeContainer, currentNodeContainer, childrenNodeContainer }

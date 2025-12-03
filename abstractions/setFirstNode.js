import { FirstNode } from "../classes.js"
import clientDocument from "../getClient.js";

export default function setFirstNode(externalFirstNode) {
  if (externalFirstNode === null || externalFirstNode === undefined) {
    return new FirstNode(clientDocument.body.firstElementChild);
  }

  return new FirstNode(externalFirstNode, externalFirstNode?.siblingSet, externalFirstNode?.siblings);
}
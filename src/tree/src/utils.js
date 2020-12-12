function traverse (nodes, callback, callbackAfter) {
  nodes &&
    nodes.forEach((node) => {
      callback(node)
      traverse(node.children, callback, callbackAfter)
      callbackAfter && callbackAfter(node)
    })
}

export function keysWithFilter (nodes, pattern, filter) {
  const keys = new Set()
  const highlightKeys = new Set()
  const path = []
  traverse(
    nodes,
    (node) => {
      path.push(node)
      if (filter(pattern, node)) {
        highlightKeys.add(node.key)
        for (let i = path.length - 2; i >= 0; --i) {
          if (!keys.has(path[i].key)) {
            keys.add(path[i].key)
          } else {
            return
          }
        }
      }
    },
    () => {
      path.pop()
    }
  )
  return [Array.from(keys), Array.from(highlightKeys)]
}

import { visit } from 'unist-util-visit'

export function remarkWikiLinks() {
  return function (tree) {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === undefined) return

      const parts = []
      let lastIndex = 0
      const text = node.value
      const regex = /\[\[Wiki\/(\w+)\/([\w-]+)\]\]/g
      let match

      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ type: 'text', value: text.slice(lastIndex, match.index) })
        }

        const category = match[1].toLowerCase()
        const slug = match[2].toLowerCase()
        const displayText = match[2].replace(/_/g, ' ')
        const href = `/wiki/${category}/${slug}/`

        parts.push({
          type: 'link',
          url: href,
          children: [{ type: 'text', value: displayText }]
        })

        lastIndex = match.index + match[0].length
      }

      if (lastIndex < text.length) {
        parts.push({ type: 'text', value: text.slice(lastIndex) })
      }

      if (parts.length > 1) {
        parent.children.splice(index, 1, ...parts)
      }
    })
  }
}

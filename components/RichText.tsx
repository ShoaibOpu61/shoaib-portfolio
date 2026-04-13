import React from 'react'

type RichTextChild = {
    text?: string
    type?: string
    format?: number
}

type RichTextNode = {
    type?: string
    children?: RichTextChild[]
}

export type RichTextContent = {
    root?: {
        children?: RichTextNode[]
    }
}

const RichText = ({ content }: { content: RichTextContent }) => {
    if (!content || !content.root || !content.root.children) return null

    return (
        <div className="rich-text">
            {content.root.children.map((node: RichTextNode, i: number) => {
                if (node.type === 'paragraph') {
                    return (
                        <p key={i} className="mb-4 text-secondary leading-relaxed">
                            {node.children?.map((child: RichTextChild, j: number) => {
                                if (child.type === 'text') {
                                    let text: React.ReactNode = child.text ?? ""
                                    if ((child.format ?? 0) & 1) text = <strong key={j}>{text}</strong>
                                    if ((child.format ?? 0) & 2) text = <em key={j}>{text}</em>
                                    return text
                                }
                                return null
                            })}
                        </p>
                    )
                }
                // Add more node types (heading, list, etc.) as needed
                return null
            })}
        </div>
    )
}

export default RichText

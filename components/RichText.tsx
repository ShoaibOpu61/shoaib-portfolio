import React from 'react'

const RichText = ({ content }: { content: any }) => {
    if (!content || !content.root || !content.root.children) return null

    return (
        <div className="rich-text">
            {content.root.children.map((node: any, i: number) => {
                if (node.type === 'paragraph') {
                    return (
                        <p key={i} className="mb-4 text-secondary leading-relaxed">
                            {node.children.map((child: any, j: number) => {
                                if (child.type === 'text') {
                                    let text = child.text
                                    if (child.format & 1) text = <strong key={j}>{text}</strong>
                                    if (child.format & 2) text = <em key={j}>{text}</em>
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

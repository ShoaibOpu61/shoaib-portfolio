import React from 'react'

type RichTextChild = {
    text?: string
    type?: string
    format?: number
    bold?: boolean
    italic?: boolean
    underline?: boolean
}

type RichTextNode = {
    type?: string
    tag?: string
    children?: RichTextChild[]
    textAlign?: string
}

export type RichTextContent =
    | {
        root?: {
            children?: RichTextNode[]
        }
    }
    | RichTextNode[]
    | string

function renderChildren(children?: RichTextChild[]) {
    return children?.map((child: RichTextChild, j: number) => {
        const rawText = child.text ?? ''

        if (!rawText && rawText !== '0') return null

        // Split text on newlines and insert <br /> tags
        const lines = rawText.split('\n')
        let textNode: React.ReactNode = (
            <React.Fragment key={`text-${j}`}>
                {lines.map((line, li) => (
                    <React.Fragment key={`line-${j}-${li}`}>
                        {li > 0 && <br />}
                        {line}
                    </React.Fragment>
                ))}
            </React.Fragment>
        )

        if ((child.format ?? 0) & 1 || child.bold) textNode = <strong key={`strong-${j}`}>{textNode}</strong>
        if ((child.format ?? 0) & 2 || child.italic) textNode = <em key={`em-${j}`}>{textNode}</em>
        if (child.underline) textNode = <span key={`underline-${j}`} className="underline underline-offset-4">{textNode}</span>

        return <React.Fragment key={j}>{textNode}</React.Fragment>
    })
}

function safeParseContent(content: RichTextContent): RichTextNode[] {
    // Handle JSON string — parse it first
    if (typeof content === 'string') {
        try {
            const parsed = JSON.parse(content)
            return safeParseContent(parsed)
        } catch {
            // Plain string — wrap as a single paragraph node
            return [{ type: 'paragraph', children: [{ text: content }] }]
        }
    }

    if (Array.isArray(content)) {
        return content
    }

    return content?.root?.children ?? []
}

const RichText = ({ content }: { content: RichTextContent }) => {
    if (!content) return null

    const nodes = safeParseContent(content)

    if (!nodes.length) return null

    return (
        <div className="rich-text space-y-4">
            {nodes.map((node: RichTextNode, i: number) => {
                const childrenOutput = renderChildren(node.children)

                // Skip empty nodes
                const hasContent = node.children?.some(c => c.text && c.text.trim().length > 0)
                if (!hasContent) return null

                if (node.type === 'h1' || node.tag === 'h1') {
                    return (
                        <h1 key={i} className="text-3xl font-bold text-white leading-tight">
                            {childrenOutput}
                        </h1>
                    )
                }

                if (node.type === 'h2' || node.tag === 'h2') {
                    return (
                        <h2 key={i} className="text-2xl font-semibold text-white leading-snug">
                            {childrenOutput}
                        </h2>
                    )
                }

                if (node.type === 'h3' || node.tag === 'h3') {
                    return (
                        <h3 key={i} className="text-xl font-semibold text-white leading-snug">
                            {childrenOutput}
                        </h3>
                    )
                }

                if (node.type === 'ul' || node.type === 'li') {
                    return (
                        <li key={i} className="text-secondary leading-relaxed list-disc ml-5">
                            {childrenOutput}
                        </li>
                    )
                }

                // Default paragraph
                return (
                    <p key={i} className="text-secondary leading-relaxed text-base md:text-lg">
                        {childrenOutput}
                    </p>
                )
            })}
        </div>
    )
}

export default RichText

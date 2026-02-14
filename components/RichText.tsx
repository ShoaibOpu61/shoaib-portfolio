import React, { Fragment } from 'react';
import Link from 'next/link';

import { RichTextNode } from '@/lib/types';

interface RichTextProps {
    content: RichTextNode[];
}

const RichText: React.FC<RichTextProps> = ({ content }) => {
    if (!content || !Array.isArray(content)) {
        return null;
    }

    const serialize = (children: RichTextNode[] | undefined) =>
        (children || []).map((node, i) => {
            if (node.text) {
                let text = <span dangerouslySetInnerHTML={{ __html: node.text }} />;

                if (node.bold) {
                    text = <strong key={i}>{text}</strong>;
                }

                if (node.code) {
                    text = <code key={i}>{text}</code>;
                }

                if (node.italic) {
                    text = <em key={i}>{text}</em>;
                }

                if (node.underline) {
                    text = (
                        <span style={{ textDecoration: 'underline' }} key={i}>
                            {text}
                        </span>
                    );
                }

                if (node.strikethrough) {
                    text = (
                        <span style={{ textDecoration: 'line-through' }} key={i}>
                            {text}
                        </span>
                    );
                }

                return <Fragment key={i}>{text}</Fragment>;
            }

            if (!node) {
                return null;
            }

            switch (node.type) {
                case 'h1':
                    return (
                        <h1 key={i} className="text-4xl font-serif uppercase mb-6 text-white">
                            {serialize(node.children)}
                        </h1>
                    );
                case 'h2':
                    return (
                        <h2 key={i} className="text-3xl font-serif uppercase mb-5 text-white">
                            {serialize(node.children)}
                        </h2>
                    );
                case 'h3':
                    return (
                        <h3 key={i} className="text-2xl font-serif uppercase mb-4 text-white">
                            {serialize(node.children)}
                        </h3>
                    );
                case 'h4':
                    return (
                        <h4 key={i} className="text-xl font-serif uppercase mb-3 text-white">
                            {serialize(node.children)}
                        </h4>
                    );
                case 'h5':
                    return (
                        <h5 key={i} className="text-lg font-serif uppercase mb-2 text-white">
                            {serialize(node.children)}
                        </h5>
                    );
                case 'h6':
                    return (
                        <h6 key={i} className="text-base font-serif uppercase mb-2 text-white">
                            {serialize(node.children)}
                        </h6>
                    );
                case 'quote':
                    return (
                        <blockquote key={i} className="border-l-4 border-primary pl-4 py-2 my-6 text-xl italic text-white/80">
                            {serialize(node.children)}
                        </blockquote>
                    );
                case 'ul':
                    return (
                        <ul key={i} className="list-disc list-inside mb-6 text-secondary space-y-2 ml-4">
                            {serialize(node.children)}
                        </ul>
                    );
                case 'ol':
                    return (
                        <ol key={i} className="list-decimal list-inside mb-6 text-secondary space-y-2 ml-4">
                            {serialize(node.children)}
                        </ol>
                    );
                case 'li':
                    return <li key={i}>{serialize(node.children)}</li>;
                case 'link':
                    return (
                        <Link
                            href={escapeHTML(node.url || '')}
                            key={i}
                            className="text-primary hover:text-white underline transition-colors"
                            target={node.newTab ? "_blank" : "_self"}
                            rel={node.newTab ? "noopener noreferrer" : undefined}
                        >
                            {serialize(node.children)}
                        </Link>
                    );

                default:
                    return (
                        <p key={i} className="mb-6 text-secondary leading-relaxed last:mb-0">
                            {serialize(node.children)}
                        </p>
                    );
            }
        });

    return <div className="rich-text">{serialize(content)}</div>;
};

// Helper function to escape HTML special characters in URLs to prevent XSS
const escapeHTML = (str: string) =>
    str.replace(
        /[&<>'"]/g,
        (tag) =>
        ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;',
        }[tag] || tag)
    );

export default RichText;

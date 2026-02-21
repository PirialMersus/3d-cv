'use client';

import React from 'react';
import { motion } from 'framer-motion';

const tags = ['Next.js', 'Tailwind', 'Python', 'Pinecone', 'Gemini API', 'React Three Fiber'];

const TechTags = () => {
    return (
        <section className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto px-4 py-10">
            {tags.map((tag, index) => (
                <motion.span
                    key={tag}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-white/70 hover:border-ghost-cyan/50 hover:text-ghost-cyan transition-colors"
                >
                    {tag}
                </motion.span>
            ))}
        </section>
    );
};

export default TechTags;

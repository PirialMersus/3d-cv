'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Video } from 'lucide-react';

const PortfolioBlock = () => {
    return (
        <section className="max-w-4xl mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Cpu size={120} className="text-ghost-cyan" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-ghost-cyan/20 text-ghost-cyan border border-ghost-cyan/30 rounded-full">
                            Главная Аскеза
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Просветленный Проект: AI Master Mind
                    </h2>

                    <p className="text-lg text-white/80 mb-8 leading-relaxed">
                        Медитативная оцифровка 186 священных видеолекций духовного мастера. Познал чакры <span className="text-ghost-cyan font-semibold">Gemini API</span> и открыл третий глаз <span className="text-ghost-purple font-semibold">RAG систем</span>.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="flex items-center gap-3 text-white/60">
                            <Video size={20} className="text-ghost-cyan" />
                            <span>186+ Сатсангов</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/60">
                            <Brain size={20} className="text-ghost-purple" />
                            <span>Нейронная Нирвана (Gemini)</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/60">
                            <Cpu size={20} className="text-ghost-cyan" />
                            <span>Акаши-Бэкенд (RAG)</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default PortfolioBlock;

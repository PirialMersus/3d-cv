'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
                    <span className="text-gradient">Супер Йог</span> ИИ Интеграции
                </h1>
                <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light">
                    Астральный фуллстек-шаман и Гуру LLM-архитектуры 20-го уровня
                </p>
            </motion.div>
        </section>
    );
};

export default Hero;

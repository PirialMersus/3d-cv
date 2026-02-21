'use client';

import React from 'react';
import Hero from '@/components/Hero';
import PortfolioBlock from '@/components/PortfolioBlock';
import TechTags from '@/components/TechTags';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <TechTags />
                <PortfolioBlock />
            </motion.div>

            <div className="flex-grow" />

            <Footer />
        </div>
    );
}

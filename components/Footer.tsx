'use client';

import React from 'react';
import { Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="pt-20 pb-10 px-4 text-center border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-8">Готовы открыть чакры вашего продукта силой ИИ?</h3>

                <a
                    href="https://t.me/your_username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary gap-2 group"
                >
                    Телепортируй мне в Telegram
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>

                <p className="mt-16 text-white/30 text-sm tracking-widest uppercase">
                    Ашрам Одесса, Украина / Астрал
                </p>

                <div className="mt-4 text-white/10 text-xs">
                    © {new Date().getFullYear()} Digital Ghost (Просветленный Эдишн)
                </div>
            </div>
        </footer>
    );
};

export default Footer;

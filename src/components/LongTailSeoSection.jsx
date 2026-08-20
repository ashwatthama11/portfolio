import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, Clock, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { longTailArticlesData } from '../data/longTailArticlesData';

export default function LongTailSeoSection({ onOpenQuote }) {
  const [expandedArticleId, setExpandedArticleId] = useState('cost-of-house-planning');

  const toggleArticle = (id) => {
    setExpandedArticleId(expandedArticleId === id ? null : id);
  };

  return (
    <section id="guides" className="relative py-16 sm:py-24 md:py-32 bg-[#FAFAFA] border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-semibold tracking-widest uppercase text-black mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Architecture &amp; Surveying Knowledge Hub</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black">
            In-Depth Architectural &amp; Land Survey Guides
          </h2>
          <p className="text-black/70 text-xs sm:text-base mt-3">
            Explore comprehensive, transparent guides covering house planning costs, municipal sanction processes, DGPS surveying, and commercial compliance across Maharashtra &amp; Madhya Pradesh.
          </p>
        </div>

        {/* Expandable Articles Accordion */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {longTailArticlesData.map((article) => {
            const isExpanded = expandedArticleId === article.id;

            return (
              <div
                key={article.id}
                className={`border transition-all duration-300 rounded-xs overflow-hidden ${
                  isExpanded
                    ? 'border-[#FF7A00] shadow-md bg-white'
                    : 'border-black/15 bg-white hover:border-black/30'
                }`}
              >
                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleArticle(article.id)}
                  aria-expanded={isExpanded}
                  className="w-full py-4 sm:py-5 px-5 sm:px-7 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#FF7A00]/10 text-[#FF7A00] text-[10px] uppercase font-bold tracking-wider rounded-xs">
                        {article.badge}
                      </span>
                      <span className="text-[11px] text-black/50 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>
                    <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-black leading-snug">
                      {article.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-[#FF7A00] hidden sm:inline">
                      {isExpanded ? 'Hide Guide' : 'Read Guide'}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-transform duration-300 ${
                      isExpanded ? 'bg-[#FF7A00]/10 border-[#FF7A00] rotate-180' : 'bg-neutral-100 border-black/10'
                    }`}>
                      <ChevronDown className={`w-4 h-4 ${isExpanded ? 'text-[#FF7A00]' : 'text-black/60'}`} />
                    </div>
                  </div>
                </button>

                {/* Article Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden border-t border-black/10 bg-neutral-50/40"
                    >
                      <div className="p-5 sm:p-8 space-y-6">
                        
                        {/* Summary Box */}
                        <div className="p-4 bg-white border-l-4 border-[#FF7A00] shadow-xs text-xs sm:text-sm text-black/80 italic">
                          "{article.summary}"
                        </div>

                        {/* Article Text Content Render */}
                        <div className="prose prose-sm sm:prose-base max-w-none text-black/85 leading-relaxed space-y-4 font-sans text-xs sm:text-sm">
                          {article.content.split('\n\n').map((para, pIdx) => {
                            if (para.trim().startsWith('###')) {
                              return (
                                <h4 key={pIdx} className="font-serif text-base sm:text-lg font-bold text-black pt-3 pb-1 border-b border-black/10">
                                  {para.replace('###', '').trim()}
                                </h4>
                              );
                            }
                            if (para.trim().startsWith('*')) {
                              const bulletItems = para.split('\n* ').map(item => item.replace('*', '').trim());
                              return (
                                <ul key={pIdx} className="space-y-2 my-3 pl-2">
                                  {bulletItems.map((bItem, bIdx) => (
                                    <li key={bIdx} className="flex items-start gap-2 text-black/80">
                                      <span className="text-[#FF7A00] font-bold mt-0.5">•</span>
                                      <span dangerouslySetInnerHTML={{ __html: bItem.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
                                    </li>
                                  ))}
                                </ul>
                              );
                            }
                            if (para.trim().startsWith('1.') || para.trim().startsWith('Step 1')) {
                              return (
                                <div key={pIdx} className="p-3 bg-white border border-black/5 rounded-xs my-2 text-black/80"
                                     dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }}
                                />
                              );
                            }
                            return (
                              <p key={pIdx} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
                            );
                          })}
                        </div>

                        {/* Key Takeaways Box */}
                        <div className="p-4 sm:p-5 bg-white border border-black/10 rounded-xs space-y-2">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-[#FF7A00]">
                            Key Takeaways for Property Owners:
                          </div>
                          <div className="space-y-1.5">
                            {article.takeaways.map((takeaway, tIdx) => (
                              <div key={tIdx} className="flex items-center gap-2 text-xs sm:text-sm text-black/90 font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{takeaway}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Direct Action */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-black/10">
                          <button
                            type="button"
                            onClick={() => onOpenQuote && onOpenQuote({ message: `Inquiring regarding guide: ${article.title}` })}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF7A00] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#FF7A00]/90 transition-colors cursor-pointer"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Request Detailed Project Estimate</span>
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

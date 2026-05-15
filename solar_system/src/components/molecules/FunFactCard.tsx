import { AnimatePresence, motion } from 'framer-motion';
import type { FC } from 'react';
import type { FunFact } from '../../types/planet';

interface FunFactCardProps {
  fact: FunFact;
  expanded: boolean;
  onToggle: () => void;
}

export const FunFactCard: FC<FunFactCardProps> = ({ fact, expanded, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-expanded={expanded}
    className={`cosmos-fact${expanded ? ' cosmos-fact--expanded' : ''}`}
  >
    <div className="cosmos-fact__header">
      <span className="cosmos-fact__emoji" aria-hidden>
        {fact.emoji}
      </span>
      <span className="cosmos-fact__title">{fact.title}</span>
      <span className="cosmos-fact__chevron" aria-hidden>
        {expanded ? '−' : '+'}
      </span>
    </div>
    <AnimatePresence initial={false}>
      {expanded && (
        <motion.div
          key="body"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="cosmos-fact__body-wrap"
        >
          <p className="cosmos-fact__body">{fact.body}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </button>
);

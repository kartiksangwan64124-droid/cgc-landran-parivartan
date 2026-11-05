import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { ToastMessage } from '../../types';

interface ToastProps {
  toastMessage: ToastMessage | null;
}

export function Toast({ toastMessage }: ToastProps) {
  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-bold text-white border ${
            toastMessage.type === 'error'
              ? 'bg-[#f5365c] border-[#f5365c]'
              : toastMessage.type === 'info'
              ? 'bg-[#11cdef] border-[#11cdef]'
              : 'bg-[#2dce89] border-[#2dce89]'
          }`}
        >
          {toastMessage.type === 'error' ? (
            <AlertCircle className="w-5 h-5" />
          ) : toastMessage.type === 'info' ? (
            <Info className="w-5 h-5" />
          ) : (
            <CheckCircle2 className="w-5 h-5" />
          )}
          <span>{toastMessage.text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


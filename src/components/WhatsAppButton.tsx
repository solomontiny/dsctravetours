import { motion } from "framer-motion";
import { buildWhatsAppUrl, generalWhatsAppMessage } from "@/lib/whatsapp";

const WhatsAppButton = () => {
  const href = buildWhatsAppUrl(generalWhatsAppMessage());

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-20 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-elevated md:bottom-7 md:right-7"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-25" />
      <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.78 11.78 0 0012.06 0C5.5 0 .2 5.3.2 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.83 11.83 0 005.66 1.44h.01c6.55 0 11.86-5.3 11.86-11.86 0-3.17-1.23-6.15-3.41-8.42zM12.07 21.6h-.01a9.74 9.74 0 01-4.96-1.36l-.36-.21-3.8 1 .99-3.7-.23-.38a9.74 9.74 0 01-1.49-5.19c0-5.39 4.39-9.78 9.86-9.78 2.63 0 5.1 1.03 6.96 2.9a9.78 9.78 0 012.89 6.96c0 5.39-4.39 9.76-9.85 9.76zm5.4-7.32c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.48-1.75-1.65-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </motion.a>
  );
};

export default WhatsAppButton;

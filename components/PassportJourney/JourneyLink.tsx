"use client";

import type { ReactNode } from "react";
import { handleWhatsappClickWithMessage } from "@/function/handleWhatsapp";

interface JourneyLinkProps {
  /** An https URL, or the word "whatsapp" to open a WhatsApp enquiry. */
  href: string;
  className?: string;
  children: ReactNode;
  message?: string;
}

/** Link that can also open the site's WhatsApp enquiry, so data files stay plain strings. */
export default function JourneyLink({ href, className, children, message }: JourneyLinkProps) {
  if (href === "whatsapp") {
    return (
      <button
        type="button"
        className={className}
        onClick={() => handleWhatsappClickWithMessage(message)}
      >
        {children}
      </button>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

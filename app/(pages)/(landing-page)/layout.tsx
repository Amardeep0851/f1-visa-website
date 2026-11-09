import WhatsappBubble from "@/components/whatsapp/whatsapp-button"
import React, { ReactNode } from 'react'

function layout({children}:{children:ReactNode}) {
  return (
    <div className="bg-white">
      {children}
      <WhatsappBubble />
    </div>
  )
}

export default layout
// src/components/PartnerContext.jsx
// Global provider so any component can open the Become a Partner modal.
import React, { createContext, useContext, useState } from 'react';
import PartnerModal from './PartnerModal.jsx';

const PartnerContext = createContext(() => {});

export function PartnerProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openPartner = () => setOpen(true);
  const closePartner = () => setOpen(false);

  return (
    <PartnerContext.Provider value={openPartner}>
      {children}
      <PartnerModal open={open} onClose={closePartner} />
    </PartnerContext.Provider>
  );
}

export const usePartner = () => useContext(PartnerContext);

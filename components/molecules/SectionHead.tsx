import React from "react";
import { Box } from "../atoms/Layout";
import { Text } from "../atoms/Text";
import { PHEWPHEW_COLORS as C } from "../PhewphewConstants";

export const SectionHead: React.FC<{ label: string; action?: string; onAction?: () => void }> = ({ label, action, onAction }) => (
  <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
    <Text size={13} weight={800} style={{ letterSpacing: "-0.01em" }}>{label}</Text>
    {action && <div onClick={onAction} style={{ fontSize: 11, color: C.accent, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{action}</div>}
  </Box>
);

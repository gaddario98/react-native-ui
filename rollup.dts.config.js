import { createTypeDeclarations } from "../../rollup.common.config.js";

// Definizione degli entry points (deve essere sincronizzata con rollup.config.js)
const entries = [
  { name: "index", input: "index.ts" },
    { name: "lib", input: "lib/index.ts" },
  { name: "styles", input: "styles/index.ts" },
];

// Configurazione per le dichiarazioni TypeScript
export default createTypeDeclarations(entries);

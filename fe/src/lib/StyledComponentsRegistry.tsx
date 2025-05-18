"use client";

import { PropsWithChildren } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export function StyledComponentsRegistry({ children }: PropsWithChildren) {
  if (typeof window !== "undefined") {
    // On client side, just render normally
    return <>{children}</>;
  }

  const sheet = new ServerStyleSheet();
  try {
    return (
      <StyleSheetManager sheet={sheet.instance}>
        <>
          {children}
          {sheet.getStyleElement()}
        </>
      </StyleSheetManager>
    );
  } finally {
    sheet.seal();
  }
}

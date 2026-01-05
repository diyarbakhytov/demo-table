"use client";

import * as React from "react";
import { flushSync } from "react-dom";

type ThemeSelection = "light" | "dark" | "system";
type Resolved = "light" | "dark";

type ChildrenRender =
  | React.ReactNode
  | ((state: {
      resolved: Resolved;
      effective: ThemeSelection;
      toggleTheme: (theme: ThemeSelection) => void;
    }) => React.ReactNode);

function getSystemEffective(): Resolved {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

type ThemeTogglerProps = {
  theme: ThemeSelection;
  resolvedTheme: Resolved;
  setTheme: (theme: ThemeSelection) => void;
  onImmediateChange?: (theme: ThemeSelection) => void;
  children?: ChildrenRender;
};

function ThemeToggler({
  theme,
  resolvedTheme,
  setTheme,
  onImmediateChange,
  children,
}: ThemeTogglerProps) {
  const [preview, setPreview] = React.useState<null | {
    effective: ThemeSelection;
    resolved: Resolved;
  }>(null);

  const [current, setCurrent] = React.useState<{
    effective: ThemeSelection;
    resolved: Resolved;
  }>({
    effective: theme,
    resolved: resolvedTheme,
  });

  React.useEffect(() => {
    if (
      preview &&
      theme === preview.effective &&
      resolvedTheme === preview.resolved
    ) {
      setPreview(null);
    }
  }, [theme, resolvedTheme, preview]);

  const toggleTheme = React.useCallback(
    async (theme: ThemeSelection) => {
      const resolved = theme === "system" ? getSystemEffective() : theme;

      const fromClip = "circle(0% at 50% 50%)";
      const toClip = "circle(150% at 50% 50%)";

      setCurrent({ effective: theme, resolved });
      onImmediateChange?.(theme);

      if (theme === "system" && resolved === resolvedTheme) {
        setTheme(theme);
        return;
      }

      if (!document.startViewTransition) {
        flushSync(() => {
          setPreview({ effective: theme, resolved });
        });
        setTheme(theme);
        return;
      }

      await document.startViewTransition(() => {
        flushSync(() => {
          setPreview({ effective: theme, resolved });
          document.documentElement.classList.toggle(
            "dark",
            resolved === "dark"
          );
        });
      }).ready;

      document.documentElement
        .animate(
          { clipPath: [fromClip, toClip] },
          {
            duration: 700,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        )
        .finished.finally(() => {
          setTheme(theme);
        });
    },
    [onImmediateChange, resolvedTheme, setTheme]
  );

  return (
    <React.Fragment>
      {typeof children === "function"
        ? children({
            effective: current.effective,
            resolved: current.resolved,
            toggleTheme,
          })
        : children}
      <style>{`::view-transition-old(root), ::view-transition-new(root){animation:none;mix-blend-mode:normal;}`}</style>
    </React.Fragment>
  );
}

export {
  ThemeToggler,
  type ThemeTogglerProps,
  type ThemeSelection,
  type Resolved,
};

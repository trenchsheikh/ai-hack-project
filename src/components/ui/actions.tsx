import * as React from "react";

export function Actions({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="group" aria-label="Assistant message actions" className={"fh-ai-actions " + className} {...props} />;
}

export interface ActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
}

export function Action({ label, active = false, className = "", children, type = "button", ...props }: ActionProps) {
  return <button type={type} aria-label={label} title={label} aria-pressed={active} className={"fh-ai-action " + className + (active ? " active" : "")} {...props}>{children}</button>;
}

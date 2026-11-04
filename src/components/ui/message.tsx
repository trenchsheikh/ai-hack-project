import * as React from "react";

export type MessageOrigin = "user" | "assistant";
export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  from: MessageOrigin;
}
export function Message({ from, className = "", ...props }: MessageProps) {
  return <div data-from={from} className={"fh-ai-message " + className} {...props} />;
}
export function MessageContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={"fh-ai-message-content " + className} {...props} />;
}

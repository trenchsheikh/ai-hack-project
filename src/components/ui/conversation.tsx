import * as React from "react";

export const Conversation = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => <div ref={ref} className={"fh-ai-conversation " + className} {...props} />
);
Conversation.displayName = "Conversation";

export function ConversationContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={"fh-ai-conversation-content " + className} {...props} />;
}

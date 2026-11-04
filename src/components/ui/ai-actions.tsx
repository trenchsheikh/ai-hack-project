import * as React from "react";
import {
  CopyIcon, RefreshCcwIcon, ShareIcon, ThumbsDownIcon, ThumbsUpIcon,
  SparklesIcon, UserRoundIcon
} from "lucide-react";
import { Action, Actions } from "@/components/ui/actions";
import { Conversation, ConversationContent } from "@/components/ui/conversation";
import { Message, MessageContent } from "@/components/ui/message";

export interface StudioChatMessage {
  role: "user" | "assistant";
  text: string;
  error?: boolean;
  hasImage?: boolean;
  mode?: string;
  feedback?: "up" | "down" | null;
}
export interface AIConversationProps {
  messages: StudioChatMessage[];
  loading?: boolean;
  emptyState?: React.ReactNode;
  onRetry?: (messageIndex: number) => void;
  onFeedback?: (messageIndex: number, value: "up" | "down") => void;
}

/** Shadcn-style message actions adapted to Fhilo's Vite/React architecture.
 * The controls operate on real conversation messages, not static demo data. */
export function AIConversation({ messages, loading = false, emptyState, onRetry, onFeedback }: AIConversationProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [notice, setNotice] = React.useState("");
  React.useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages.length, loading]);

  const copy = async (text: string, success = "Copied message") => {
    try {
      if (!navigator.clipboard?.writeText) throw Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setNotice(success);
    } catch {
      setNotice("Copy is unavailable in this browser.");
    }
  };
  const share = async (text: string) => {
    try {
      if (navigator.share) {
        await navigator.share({ text });
        setNotice("Message shared.");
      } else {
        await copy(text, "Copied for sharing");
      }
    } catch (error) {
      if ((error as Error)?.name !== "AbortError") setNotice("Sharing is unavailable.");
    }
  };

  return (
    <Conversation ref={scrollRef} aria-label="Studio conversation" aria-live="polite" role="log">
      <ConversationContent>
        {messages.length === 0 && emptyState}
        {messages.map((message, index) => (
          <Message from={message.role} key={index}>
            <span className="fh-ai-avatar" aria-hidden="true">
              {message.role === "assistant" ? <SparklesIcon size={17} /> : <UserRoundIcon size={16} />}
            </span>
            <div className="fh-ai-message-main">
              <span className="fh-ai-message-name">{message.role === "assistant" ? "Fhilo" : "You"}</span>
              <MessageContent className={message.error ? "is-error" : ""}>
                {message.text}
                {message.hasImage && <small>Reference image attached</small>}
              </MessageContent>
              {message.role === "assistant" && (
                <Actions>
                  <Action label="Retry previous prompt" disabled={loading || !onRetry} onClick={() => onRetry?.(index)}>
                    <RefreshCcwIcon size={15} />
                  </Action>
                  <Action label="Helpful" active={message.feedback === "up"} onClick={() => onFeedback?.(index, "up")} disabled={!onFeedback}>
                    <ThumbsUpIcon size={15} />
                  </Action>
                  <Action label="Not helpful" active={message.feedback === "down"} onClick={() => onFeedback?.(index, "down")} disabled={!onFeedback}>
                    <ThumbsDownIcon size={15} />
                  </Action>
                  <Action label="Copy response" onClick={() => { void copy(message.text); }}>
                    <CopyIcon size={15} />
                  </Action>
                  <Action label="Share response" onClick={() => { void share(message.text); }}>
                    <ShareIcon size={15} />
                  </Action>
                </Actions>
              )}
            </div>
          </Message>
        ))}
        {loading && <Message from="assistant"><span className="fh-ai-avatar"><SparklesIcon size={17}/></span><div className="fh-ai-message-main"><span className="fh-ai-message-name">Fhilo</span><MessageContent><span className="fh-build-thinking"><span className="fh-build-pulse" /><span className="fh-build-pulse" /><span className="fh-build-pulse" /><span className="fh-visually-hidden">Generating response</span></span></MessageContent></div></Message>}
      </ConversationContent>
      {notice && <div className="fh-ai-action-notice" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notification">×</button></div>}
    </Conversation>
  );
}

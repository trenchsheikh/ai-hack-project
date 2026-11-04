import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUp, Paperclip, Square, X, Mic, BrainCog, Code2, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type BuildPromptMode = "plan" | "build" | "review";

export interface PromptInputBoxProps {
  value: string;
  onValueChange: (value: string) => void;
  onSend: (message: string, files: File[], mode: BuildPromptMode) => void;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

const modes: { id: BuildPromptMode; label: string; icon: typeof Code2 }[] = [
  { id: "plan", label: "Plan", icon: Lightbulb },
  { id: "build", label: "Build", icon: Code2 },
  { id: "review", label: "Review", icon: BrainCog },
];

function ActionHint({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <TooltipPrimitive.Root delayDuration={180}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content side="top" sideOffset={8} className="fh-prompt-tooltip">
          {label}
          <TooltipPrimitive.Arrow className="fh-prompt-tooltip-arrow" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

export const PromptInputBox = React.forwardRef<HTMLDivElement, PromptInputBoxProps>(
  ({ value, onValueChange, onSend, onStop, isLoading = false, placeholder = "Describe what you want to build..." }, ref) => {
    const [mode, setMode] = React.useState<BuildPromptMode>("build");
    const [files, setFiles] = React.useState<File[]>([]);
    const [preview, setPreview] = React.useState<string | null>(null);
    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [fileError, setFileError] = React.useState("");
    const [listening, setListening] = React.useState(false);
    const [voiceSupported, setVoiceSupported] = React.useState(false);
    const fileRef = React.useRef<HTMLInputElement>(null);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const voiceRef = React.useRef<any>(null);

    React.useEffect(() => {
      setVoiceSupported(Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition));
      return () => { try { voiceRef.current?.abort(); } catch { /* no-op */ } };
    }, []);

    React.useEffect(() => {
      const el = textareaRef.current;
      if (el) {
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 210) + "px";
      }
    }, [value]);

    const attach = React.useCallback((file?: File) => {
      if (!file) return;
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        setFileError("Only PNG, JPEG or WebP images can be attached.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setFileError("Choose an image under 2 MB.");
        return;
      }
      setFileError("");
      setFiles([file]);
      const reader = new FileReader();
      reader.onload = () => setPreview(typeof reader.result === "string" ? reader.result : null);
      reader.readAsDataURL(file);
    }, []);

    const clearFile = () => {
      setFiles([]);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
    };

    const submit = () => {
      if (isLoading || listening || (!value.trim() && files.length === 0)) return;
      onSend(value.trim(), files, mode);
      onValueChange("");
      clearFile();
      setFileError("");
    };

    const toggleVoice = () => {
      if (listening) {
        voiceRef.current?.stop();
        return;
      }
      const Speech = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!Speech) return;
      const recognition = new Speech();
      recognition.lang = navigator.language || "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;
      recognition.onresult = (event: any) => {
        const text = event.results?.[0]?.[0]?.transcript;
        if (text) onValueChange((value ? value.trim() + " " : "") + text);
      };
      recognition.onerror = () => setFileError("Speech input could not start. You can type instead.");
      recognition.onend = () => { voiceRef.current = null; setListening(false); };
      voiceRef.current = recognition;
      setListening(true);
      try { recognition.start(); } catch { setListening(false); }
    };

    return (
      <TooltipPrimitive.Provider>
        <div
          ref={ref}
          className={"fh-prompt-box" + (isLoading ? " busy" : "")}
          onDragOver={(e) => { e.preventDefault(); }}
          onDrop={(e) => { e.preventDefault(); attach(e.dataTransfer.files[0]); }}
          onPaste={(e) => {
            const image = Array.from(e.clipboardData.files).find((item) => item.type.startsWith("image/"));
            if (image) { e.preventDefault(); attach(image); }
          }}
        >
          {files.length > 0 && preview && (
            <div className="fh-prompt-attachment">
              <button type="button" onClick={() => setPreviewOpen(true)} aria-label="Preview attached image">
                <img src={preview} alt="Attached reference" />
              </button>
              <button className="fh-prompt-attachment-remove" type="button" onClick={clearFile} aria-label="Remove image"><X size={13} /></button>
              <span>{files[0].name}</span>
            </div>
          )}
          <textarea
            ref={textareaRef}
            rows={1}
            maxLength={1500}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !(e.nativeEvent as any).isComposing) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder={placeholder}
            aria-label="Message Fhilo Build"
            disabled={isLoading || listening}
          />
          <div className="fh-prompt-toolbar">
            <div className="fh-prompt-tools">
              <ActionHint label="Attach a reference image (up to 2 MB)">
                <button type="button" className="fh-prompt-icon" aria-label="Attach image" disabled={isLoading} onClick={() => fileRef.current?.click()}>
                  <Paperclip size={18} />
                </button>
              </ActionHint>
              <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={(e) => attach(e.target.files?.[0])} />
              <span className="fh-prompt-divider" aria-hidden="true" />
              {modes.map((item) => (
                <ActionHint key={item.id} label={item.id === "plan" ? "Discuss the approach without changing code" : item.id === "review" ? "Review your current code without changing it" : "Generate and update the project preview"}>
                  <button
                    type="button"
                    onClick={() => setMode(item.id)}
                    disabled={isLoading}
                    aria-pressed={mode === item.id}
                    className={"fh-prompt-mode" + (mode === item.id ? " active " + item.id : "")}
                  >
                    <motion.span animate={{ scale: mode === item.id ? 1.07 : 1 }} transition={{ duration: 0.15 }}>
                      <item.icon size={16} />
                    </motion.span>
                    <AnimatePresence initial={false}>
                      {mode === item.id && (
                        <motion.span className="fh-prompt-mode-label" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.16 }}>
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </ActionHint>
              ))}
            </div>
            <div className="fh-prompt-submit-group">
              {voiceSupported && !value.trim() && files.length === 0 && !isLoading && (
                <ActionHint label={listening ? "Stop dictation" : "Dictate a message"}>
                  <button className={"fh-prompt-icon" + (listening ? " listening" : "")} type="button" onClick={toggleVoice} aria-label={listening ? "Stop dictation" : "Dictate a message"}>
                    <Mic size={18} />
                  </button>
                </ActionHint>
              )}
              <ActionHint label={isLoading ? "Stop generating" : "Send message"}>
                <button type="button" onClick={isLoading ? onStop : submit} disabled={!isLoading && !value.trim() && files.length === 0} className="fh-prompt-send" aria-label={isLoading ? "Stop generating" : "Send message"}>
                  {isLoading ? <Square size={13} fill="currentColor" /> : <ArrowUp size={18} />}
                </button>
              </ActionHint>
            </div>
          </div>
          {fileError && <p className="fh-prompt-error" role="alert">{fileError}</p>}
          <DialogPrimitive.Root open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fh-prompt-dialog-overlay" />
              <DialogPrimitive.Content className="fh-prompt-dialog">
                <DialogPrimitive.Title className="fh-visually-hidden">Image preview</DialogPrimitive.Title>
                {preview && <img src={preview} alt="Full-sized attached reference" />}
                <DialogPrimitive.Close className="fh-prompt-dialog-close" aria-label="Close preview"><X size={20} /></DialogPrimitive.Close>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </TooltipPrimitive.Provider>
    );
  }
);
PromptInputBox.displayName = "PromptInputBox";

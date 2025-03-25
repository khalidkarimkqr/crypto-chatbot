"use client";

import { ChatList } from "@/components/chat-list";
import ChatScrollAnchor from "@/components/chat-scroll-anchor";
import { useEnterSubmit } from "@/lib/use-enter-submit";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

export default function Home() {
  const form = useForm();
  const { formRef, onKeyDown } = useEnterSubmit();
  const onSubmit = () => {};
  return (
    <main>
      <div className="pb-[200px] pt-4 md:pt-10">
        <ChatList messages={[]} />
        <ChatScrollAnchor />
      </div>
      <div className="">
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="relative flex flex-col w-full overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border">
            <TextareaAutosize
              tabIndex={0}
              onKeyDown={onKeyDown}
              placeholder="Send a message"
              className="min-h-[60px] w-full resize-none bg-transparent pl-4 pr-16 py-[1.3rem] focus-within:outline-none sm:text-sm"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              rows={1}
            />
          </div>
        </form>
      </div>
    </main>
  );
}

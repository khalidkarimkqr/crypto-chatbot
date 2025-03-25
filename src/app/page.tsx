"use client";

import { ChatList } from "@/components/chat-list";
import ChatScrollAnchor from "@/components/chat-scroll-anchor";
import { useEnterSubmit } from "@/lib/use-enter-submit";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, PlusIcon } from "lucide-react";

export default function Home() {
  const form = useForm();
  const { formRef, onKeyDown } = useEnterSubmit();
  const onSubmit = (data: any) => {
    console.log({ data });
  };

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
              {...form.register("message")}
            />
            <div className="absolute right-0 top-4 sm:right-4">
              <Button
                type="submit"
                size="icon"
                disabled={form.watch("message") === ""}
              >
                <ArrowDownIcon className="w-5 h-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

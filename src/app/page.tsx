"use client";

import { ChatList } from "@/components/chat-list";
import ChatScrollAnchor from "@/components/chat-scroll-anchor";
import { useEnterSubmit } from "@/lib/use-enter-submit";
import { useForm } from "react-hook-form";

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
            <h1>Hello this is a chat box</h1>
          </div>
        </form>
      </div>
    </main>
  );
}

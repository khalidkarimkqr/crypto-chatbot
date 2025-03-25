"use client";

import { ChatList } from "@/components/chat-list";
import ChatScrollAnchor from "@/components/chat-scroll-anchor";
import { useEnterSubmit } from "@/lib/use-enter-submit";
import { useForm } from "react-hook-form";

export default function Home() {
  const form = useForm();
  const { formRef } = useEnterSubmit();
  const onSubmit = () => {};
  return (
    <main>
      <div className="pb-[200px] pt-4 md:pt-10">
        <ChatList messages={[]} />
        <ChatScrollAnchor />
      </div>
      <div className="">
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}></form>
      </div>
    </main>
  );
}

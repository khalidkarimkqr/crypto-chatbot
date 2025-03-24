import {env} from '@/env';
import {} from "ai/rsc";

export default function Home() {
  const example = env.OPEN_AI_API_KEY;
  console.log({example});
  return <main> {example} </main>;
}

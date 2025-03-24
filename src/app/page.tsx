import {env} from '@/env';

export default function Home() {
  const example = env.OPEN_AI_API_KEY;
  console.log({example});
  return <main> {example} </main>;
}

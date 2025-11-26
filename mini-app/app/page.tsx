import { generateMetadata } from "@/lib/farcaster-embed";
import ReactionGame from "@/components/reaction-game";

export { generateMetadata };

export default function Home() {
  return <ReactionGame />;
}

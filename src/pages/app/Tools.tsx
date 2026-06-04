import { BookOpen, Compass, MessageCircle, Trophy } from "lucide-react";
import { SupportBanner } from "../../components/SupportBanner";
import { ToolCard } from "../../components/ToolCard";
import { toolCards } from "../../data/toolPrompts";

const iconMap = {
  confidence: <Trophy size={23} />,
  "say-it-properly": <MessageCircle size={23} />,
  purpose: <Compass size={23} />,
  "self-worth": <BookOpen size={23} />
};

export function Tools() {
  return (
    <section className="app-screen">
      <div className="screen-heading left">
        <p className="eyebrow">Tools</p>
        <h1>Build with action.</h1>
        <p>Practical demo tools for confidence, communication, purpose and self-worth.</p>
      </div>

      <SupportBanner compact />

      <div className="tool-list">
        {toolCards.map((tool) => (
          <ToolCard
            key={tool.id}
            description={tool.description}
            icon={iconMap[tool.id as keyof typeof iconMap]}
            title={tool.title}
            to={tool.to}
          />
        ))}
      </div>
    </section>
  );
}

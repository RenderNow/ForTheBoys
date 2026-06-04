import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { PublicShell } from "./components/PublicShell";
import { About } from "./pages/public/About";
import { Landing } from "./pages/public/Landing";
import { Pricing } from "./pages/public/Pricing";
import { Safety } from "./pages/public/Safety";
import { ConfidenceBuilder } from "./pages/app/ConfidenceBuilder";
import { Journal } from "./pages/app/Journal";
import { Mentor } from "./pages/app/Mentor";
import { Onboarding } from "./pages/app/Onboarding";
import { PurposePlanner } from "./pages/app/PurposePlanner";
import { SafetySetup } from "./pages/app/SafetySetup";
import { SayItProperly } from "./pages/app/SayItProperly";
import { SelfWorthJournal } from "./pages/app/SelfWorthJournal";
import { Subscribe } from "./pages/app/Subscribe";
import { Support } from "./pages/app/Support";
import { Today } from "./pages/app/Today";
import { Tools } from "./pages/app/Tools";
import { Welcome } from "./pages/app/Welcome";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicShell />}>
        <Route path="/" element={<Landing />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="/demo" element={<Navigate to="/app/welcome" replace />} />
      <Route path="/app" element={<AppShell />}>
        <Route index element={<Navigate to="/app/welcome" replace />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="safety-setup" element={<SafetySetup />} />
        <Route path="today" element={<Today />} />
        <Route path="mentor" element={<Mentor />} />
        <Route path="tools" element={<Tools />} />
        <Route path="tools/confidence" element={<ConfidenceBuilder />} />
        <Route path="tools/say-it-properly" element={<SayItProperly />} />
        <Route path="tools/purpose" element={<PurposePlanner />} />
        <Route path="tools/self-worth" element={<SelfWorthJournal />} />
        <Route path="journal" element={<Journal />} />
        <Route path="support" element={<Support />} />
        <Route path="subscribe" element={<Subscribe />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

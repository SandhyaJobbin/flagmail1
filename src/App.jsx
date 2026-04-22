import { useCallback, useRef } from 'react';
import './styles/animations.css';

import { useGameState, SCREENS } from './hooks/useGameState.js';
import { useScoring } from './hooks/useScoring.js';
import { useBadges } from './hooks/useBadges.js';
import { useLeaderboard } from './hooks/useLeaderboard.js';

import LandingScreen    from './components/LandingScreen.jsx';
import TutorialScreen   from './components/TutorialScreen.jsx';
import ZoneIntroCard    from './components/ZoneIntroCard.jsx';
import GameRound        from './components/GameRound.jsx';
import ExplanationCard  from './components/ExplanationCard.jsx';
import ZoneComplete     from './components/ZoneComplete.jsx';
import ResultsScreen    from './components/ResultsScreen.jsx';
import Leaderboard      from './components/Leaderboard.jsx';
import BadgeToast       from './components/BadgeToast.jsx';
import ReasoningModal   from './components/ReasoningModal.jsx';

const BG = 'linear-gradient(180deg, #f5f7fb 0%, #edf3fb 42%, #f7f4ef 100%)';

export default function App() {
  const gs = useGameState();
  const sc = useScoring();
  const bg = useBadges();
  const lb = useLeaderboard();
  const pendingRoundRecordRef = useRef(null);

  // ── Submit a round ───────────────────────────────────────────────────────
  // timedOut=true is passed by GameRound when the timer fires (auto-submit)
  const handleSubmit = useCallback((timeLeft, timedOut = false) => {
    const { currentEmail, round } = gs;
    const record = sc.scoreRound({
      email: currentEmail,
      selectedL1: round.selectedL1,
      selectedL2: timedOut ? null : round.selectedL2,
      cluesRevealed: round.cluesRevealed,
      timedOut,
    });
    const { unlockedAny } = bg.checkAfterRound({ record, timeLeft });
    if (unlockedAny) {
      pendingRoundRecordRef.current = record;
      return;
    }
    gs.submitRound(record);
  }, [gs, sc, bg]);

  const handleBadgeDismiss = useCallback(() => {
    bg.dismissToast();
    if (pendingRoundRecordRef.current) {
      const record = pendingRoundRecordRef.current;
      pendingRoundRecordRef.current = null;
      gs.submitRound(record);
    }
  }, [bg, gs]);

  // ── Reasoning complete ────────────────────────────────────────────────────
  const handleReasoningComplete = useCallback(({ skipped, selectedIndex, correct }) => {
    const emailId = gs.currentEmail?.id;
    const reasoningPoints = (!skipped && correct) ? 1 : 0;
    if (!skipped && emailId !== undefined) {
      sc.scoreReasoning({ emailId, correct });
    }
    gs.onReasoningComplete(reasoningPoints);
  }, [gs, sc]);

  // ── Move to next email ───────────────────────────────────────────────────
  const handleNext = useCallback(() => {
    // Check zone badges when crossing zone boundary
    if (gs.currentIndex + 1 >= gs.zoneEnd) {
      const zoneEmails = sc.perEmail.filter(r => r.zone === gs.zone);
      const zoneCluesUsed = zoneEmails.reduce((sum, r) => sum + r.cluesUsed, 0);
      bg.checkAfterZone({ zoneEmails, zoneCluesUsed, zone: gs.zone });
    }
    gs.nextEmail();
  }, [gs, sc, bg]);

  // ── Advance zone / end game ──────────────────────────────────────────────
  const handleAdvanceZone = useCallback(() => {
    if (gs.zone === 3) {
      const totalCluesUsed = sc.perEmail.reduce((sum, r) => sum + r.cluesUsed, 0);
      bg.checkAfterGame({ perEmail: sc.perEmail, totalCluesUsed });
      lb.submitScore({
        name: gs.player.name,
        email: gs.player.email,
        score: sc.displayScore,
        title: sc.displayScore >= 80 ? 'Advanced' : sc.displayScore >= 50 ? 'Proficient' : 'Foundation',
        badges: bg.earned.length,
        zone1Score: sc.zoneScores[1],
        zone2Score: sc.zoneScores[2],
        zone3Score: sc.zoneScores[3],
      });
      gs.goToResults();
    } else {
      gs.advanceZone();
    }
  }, [gs, sc, bg, lb]);

  // ── Play again ───────────────────────────────────────────────────────────
  const handlePlayAgain = useCallback(() => {
    pendingRoundRecordRef.current = null;
    sc.resetScoring();
    bg.resetBadges();
    gs.resetGame();
  }, [gs, sc, bg]);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: BG,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      color: '#1C1C1E',
      position: 'relative',
    }}>
      <BadgeToast badge={bg.pendingToast} onDismiss={handleBadgeDismiss} />

      {gs.screen === SCREENS.LANDING && (
        <LandingScreen onStart={gs.startGame} />
      )}

      {gs.screen === SCREENS.TUTORIAL && (
        <TutorialScreen onSkip={gs.completeTutorial} />
      )}

      {gs.screen === SCREENS.ZONE_INTRO && (
        <ZoneIntroCard
          zone={gs.zone}
          onStart={gs.startZone}
          earlyUnlocked={gs.earlyUnlocked}
        />
      )}

      {gs.screen === SCREENS.ROUND && gs.currentEmail && (
        <GameRound
          email={gs.currentEmail}
          zone={gs.zone}
          emailInZone={gs.emailInZone}
          emailsInZone={gs.emailsInZone}
          totalScore={sc.totalScore}
          round={gs.round}
          onRevealClue={gs.revealClue}
          onSelectL1={gs.selectL1}
          onSelectL2={gs.selectL2}
          onSubmit={handleSubmit}
        />
      )}

      {gs.screen === SCREENS.REASONING && gs.currentEmail && (
        <ReasoningModal
          email={gs.currentEmail}
          l1WasCorrect={gs.round.lastRecord?.l1Correct ?? false}
          onComplete={handleReasoningComplete}
        />
      )}

      {gs.screen === SCREENS.EXPLANATION && gs.currentEmail && gs.round.lastRecord && (
        <ExplanationCard
          email={gs.currentEmail}
          record={gs.round.lastRecord}
          totalScore={sc.totalScore}
          onNext={handleNext}
        />
      )}

      {gs.screen === SCREENS.ZONE_COMPLETE && (
        <ZoneComplete
          zone={gs.zone}
          zoneScore={sc.zoneScores[gs.zone]}
          maxZoneScore={gs.emailsInZone * 5}
          zoneEmails={sc.perEmail.filter(r => r.zone === gs.zone)}
          earlyUnlocked={gs.earlyUnlocked}
          consecutivePerfect={gs.consecutivePerfect}
          onContinue={handleAdvanceZone}
        />
      )}

      {gs.screen === SCREENS.RESULTS && (
        <ResultsScreen
          player={gs.player}
          finalScore={sc.totalScore}
          displayScore={sc.displayScore}
          zoneScores={sc.zoneScores}
          categoryCorrect={sc.categoryCorrect}
          earned={bg.earned}
          perEmail={sc.perEmail}
          onLeaderboard={gs.goToLeaderboard}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {gs.screen === SCREENS.LEADERBOARD && (
        <Leaderboard
          playerName={gs.player.name}
          playerScore={sc.totalScore}
          entries={lb.entries}
          loading={lb.loading}
          error={lb.error}
          onFetch={lb.fetchLeaderboard}
          onBack={gs.goBackToResults}
        />
      )}
    </div>
  );
}

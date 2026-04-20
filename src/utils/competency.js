/**
 * Generate a competency summary paragraph based on per-category accuracy.
 * categoryCorrect: { [category]: { correct: number, total: number } }
 */
export function generateCompetency(categoryCorrect) {
  const categories = Object.entries(categoryCorrect)
    .filter(([, v]) => v.total > 0)
    .map(([cat, v]) => ({
      cat,
      accuracy: v.total > 0 ? v.correct / v.total : 0,
    }));

  if (categories.length === 0) {
    return 'Complete more emails to receive your competency summary.';
  }

  const strong = categories.filter(c => c.accuracy >= 0.7).map(c => c.cat);
  const weak   = categories.filter(c => c.accuracy < 0.5).map(c => c.cat);

  const allStrong = strong.length === categories.length;
  const allWeak   = weak.length === categories.length;

  if (allStrong) {
    return 'Exceptional performance across all threat categories. You\'re ready for field deployment.';
  }
  if (allWeak) {
    return 'Every analyst starts somewhere. Review the email patterns and sharpen your instincts – the inbox waits for no one.';
  }

  const formatList = (arr) => {
    if (arr.length === 0) return '';
    if (arr.length === 1) return arr[0];
    return arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1];
  };

  const strongText = strong.length > 0
    ? `You have a strong foundation in ${formatList(strong)}. `
    : '';
  const weakText = weak.length > 0
    ? `Focus on building your skills in ${formatList(weak)} to advance your analyst career at Veridian Security.`
    : 'Keep sharpening your skills to advance your analyst career at Veridian Security.';

  return strongText + weakText;
}

export function getProgressTitle(score) {
  if (score >= 50) return 'Threat Intelligence Lead';
  if (score >= 30) return 'Senior Analyst';
  return 'Junior Analyst';
}

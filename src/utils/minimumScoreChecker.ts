export function minimumScoreChecker(score: number, salary: number): boolean {
  if (salary <= 2000) {
    return score >= 400;
  } else if (salary <= 4000) {
    return score >= 500;
  } else if (salary <= 8000) {
    return score >= 600;
  } else {
    return score >= 700;
  }
}

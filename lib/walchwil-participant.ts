export const WALCHWIL_PARTICIPANT_KEY = "walchwil-participant-name";

export function formatParticipantNames(names: string[]): string {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} und ${names.at(-1)}`;
}

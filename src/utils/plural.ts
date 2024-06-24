export const plural = (count: number, single: string, many: string): string => {
  return `${count} ${count === 1 ? single : many}`;
};

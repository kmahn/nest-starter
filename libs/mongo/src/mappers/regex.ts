export type RegExOptions = {
  start?: boolean;
  end?: boolean;
};

export function toRegEx(
  value: string,
  { start = false, end = false }: RegExOptions = {},
): RegExp {
  const s = '.*+?^$[]{}()|\\';
  value = value
    .split('')
    .map((c) => (s.includes(c) ? '\\' + c : c))
    .join('');
  value = start ? `^${value}` : `.*${value}`;
  value += end ? '$' : '.*';
  return new RegExp(value, 'igu');
}

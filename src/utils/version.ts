const normalize = (value: string) => value.split('.').map((part) => Number(part))

export const compareVersionAsc = (a: string, b: string) => {
  const pa = normalize(a)
  const pb = normalize(b)
  const len = Math.max(pa.length, pb.length)
  for (let i = 0; i < len; i += 1) {
    const av = pa[i] ?? 0
    const bv = pb[i] ?? 0
    if (av !== bv) {
      return av - bv
    }
  }
  return 0
}

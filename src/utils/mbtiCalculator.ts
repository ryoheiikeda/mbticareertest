import { Answer } from '../types';

export function calculateMBTI(answers: Answer[]): string {
  let e = 0, i = 0, s = 0, n = 0, t = 0, f = 0, j = 0, p = 0;

  answers.forEach(answer => {
    switch (answer.answer) {
      case 'E': e++; break;
      case 'I': i++; break;
      case 'S': s++; break;
      case 'N': n++; break;
      case 'T': t++; break;
      case 'F': f++; break;
      case 'J': j++; break;
      case 'P': p++; break;
    }
  });

  const ei = e > i ? 'E' : 'I';
  const sn = s > n ? 'S' : 'N';
  const tf = t > f ? 'T' : 'F';
  const jp = j > p ? 'J' : 'P';

  return `${ei}${sn}${tf}${jp}`;
}
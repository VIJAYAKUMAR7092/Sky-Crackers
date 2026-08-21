import { Prisma } from '@prisma/client'

export function serializeDecimals<T>(obj: T): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Prisma.Decimal.isDecimal(obj)) {
    return (obj as any).toNumber();
  }

  if (obj instanceof Date) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => serializeDecimals(item));
  }

  if (typeof obj === 'object') {
    const serialized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      serialized[key] = serializeDecimals(value);
    }
    return serialized;
  }

  return obj;
}


import { z, type ZodType } from 'zod'
import type { Abstraction, EvolutionConfig, Rule } from 'evolution-design/types'

type TypeToZod<T> = ZodType< T>

const RuleSchema: TypeToZod<Rule> = z.object({
  name: z.string(),
  check: z.custom<Rule['check']>(),
})

const AbstractionSchema: TypeToZod<Abstraction> = z.object({
  name: z.string(),
  children: z.record(z.lazy(() => AbstractionSchema)),
  rules: z.array(RuleSchema),
  fractal: z.string().optional(),
})

export const EvolutionConfigSchema: TypeToZod<EvolutionConfig> = z.object({
  root: AbstractionSchema,
  baseUrl: z.string().optional(),
  files: z.array(z.string()).optional(),
  ignores: z.array(z.string()).optional(),
})

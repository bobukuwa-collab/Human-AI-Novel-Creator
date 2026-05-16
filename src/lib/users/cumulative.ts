'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import type { PersonalityResult } from '@/lib/ai/analyze-personality'

export async function upsertCumulativeProfile(
  userId: string,
  newProfile: PersonalityResult,
): Promise<void> {
  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('user_cumulative_profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()

  if (!existing) {
    await supabase.from('user_cumulative_profiles').insert({
      user_id: userId,
      session_count: 1,
      psychopathy_score: newProfile.psychopathy_score,
      strategist_score: newProfile.strategist_score,
      narcissism_score: newProfile.narcissism_score,
      empathy_score: newProfile.empathy_score,
      vocabulary_score: newProfile.vocabulary_score,
      writer_type: newProfile.writer_type,
      analysis_text: newProfile.analysis_text,
      updated_at: new Date().toISOString(),
    })
    return
  }

  const n = existing.session_count
  const avg = (oldVal: number, newVal: number) =>
    Math.round(((oldVal * n + newVal) / (n + 1)) * 100) / 100

  await supabase
    .from('user_cumulative_profiles')
    .update({
      session_count: n + 1,
      psychopathy_score: avg(Number(existing.psychopathy_score), newProfile.psychopathy_score),
      strategist_score: avg(Number(existing.strategist_score), newProfile.strategist_score),
      narcissism_score: avg(Number(existing.narcissism_score), newProfile.narcissism_score),
      empathy_score: avg(Number(existing.empathy_score), newProfile.empathy_score),
      vocabulary_score: avg(Number(existing.vocabulary_score), newProfile.vocabulary_score),
      writer_type: newProfile.writer_type,
      analysis_text: newProfile.analysis_text,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
}

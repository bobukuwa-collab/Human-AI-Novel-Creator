-- Migration 014: ユーザー累積診断プロファイルテーブル
-- セッションを重ねるごとに精度が向上する診断モデル用

CREATE TABLE public.user_cumulative_profiles (
  user_id           uuid    PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  session_count     int     NOT NULL DEFAULT 0,
  psychopathy_score numeric(5,2) NOT NULL DEFAULT 0,
  strategist_score  numeric(5,2) NOT NULL DEFAULT 0,
  narcissism_score  numeric(5,2) NOT NULL DEFAULT 0,
  empathy_score     numeric(5,2) NOT NULL DEFAULT 0,
  vocabulary_score  numeric(5,2) NOT NULL DEFAULT 0,
  writer_type       text    NOT NULL DEFAULT '沈黙の万華鏡',
  analysis_text     text    NOT NULL DEFAULT '',
  updated_at        timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.user_cumulative_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cumulative_profiles: read own"
  ON public.user_cumulative_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "cumulative_profiles: insert own"
  ON public.user_cumulative_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "cumulative_profiles: update own"
  ON public.user_cumulative_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Migration 013: 4軸診断 → 5軸診断
-- personality_profiles テーブルを新しい5軸スコア構造に移行する

ALTER TABLE public.personality_profiles
  ADD COLUMN strategist_score int NOT NULL DEFAULT 0,
  ADD COLUMN narcissism_score int NOT NULL DEFAULT 0,
  ADD COLUMN vocabulary_score int NOT NULL DEFAULT 0,
  ADD COLUMN writer_type      text;

-- 既存行の writer_type を character_title から引き継ぐ
UPDATE public.personality_profiles
  SET writer_type = COALESCE(character_title, '沈黙の万華鏡')
  WHERE writer_type IS NULL;

-- NOT NULL 制約を付与
ALTER TABLE public.personality_profiles
  ALTER COLUMN writer_type SET NOT NULL;

-- 旧列を削除
ALTER TABLE public.personality_profiles
  DROP COLUMN IF EXISTS imagination_score,
  DROP COLUMN IF EXISTS darkness_score,
  DROP COLUMN IF EXISTS personality_type,
  DROP COLUMN IF EXISTS character_title;

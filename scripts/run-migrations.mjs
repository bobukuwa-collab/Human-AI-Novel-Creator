/**
 * Supabase マイグレーション実行スクリプト
 * 使用方法: node scripts/run-migrations.mjs
 *
 * .env.local から接続情報を読み込み、指定マイグレーションを順に実行する。
 * Supabase の SQL over REST は RPC 経由のみなので、ここでは exec_sql RPC を利用する。
 * RPC が存在しない場合は Dashboard URL を案内する。
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// .env.local を手動パース
const envContent = readFileSync(resolve(root, '.env.local'), 'utf-8')
const env = Object.fromEntries(
  envContent
    .split('\n')
    .filter(l => l && !l.startsWith('#'))
    .map(l => l.split('=').map((v, i) => (i === 0 ? v.trim() : v.trim())))
    .filter(([k]) => k)
)

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL']
const SERVICE_ROLE_KEY = env['SUPABASE_SERVICE_ROLE_KEY']

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL または SUPABASE_SERVICE_ROLE_KEY が未設定です')
  process.exit(1)
}

const MIGRATIONS = [
  'supabase/migrations/013_5axis_diagnosis.sql',
  'supabase/migrations/014_user_cumulative_profiles.sql',
]

async function execSQL(sql) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ sql }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`HTTP ${res.status}: ${body}`)
  }
  return res.json()
}

async function main() {
  console.log('🚀 マイグレーション開始')
  console.log(`対象: ${SUPABASE_URL}\n`)

  for (const migrationPath of MIGRATIONS) {
    const fullPath = resolve(root, migrationPath)
    const sql = readFileSync(fullPath, 'utf-8')
    console.log(`▶ ${migrationPath}`)
    try {
      await execSQL(sql)
      console.log(`  ✅ 完了\n`)
    } catch (err) {
      if (err.message.includes('exec_sql') || err.message.includes('Could not find')) {
        console.log(`  ⚠️  exec_sql RPC が存在しません。`)
        console.log(`  以下の URL から手動で実行してください:`)
        console.log(`  https://supabase.com/dashboard/project/elrgolhzkkrvgluhdrhn/sql/new\n`)
        console.log(`  --- SQL ---`)
        console.log(sql)
        console.log(`  ----------\n`)
      } else {
        console.error(`  ❌ エラー: ${err.message}\n`)
      }
    }
  }

  console.log('✅ 完了')
}

main().catch(console.error)

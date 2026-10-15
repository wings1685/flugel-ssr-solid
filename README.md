# SSR Experiments Solid Version

Solid SSR での挙動を見るためだけの実験場です。

**Note:** 本リポジトリは、実験場という性質であるため Issues 及び Pull Requests は受け付けておりません。

## Tech Stack

- Solid 2.0.0-rc.13

- Drizzle ORM 0.45.3
- Drizzle Kit 0.31.11
- Solid Signal
- Nano Stores

## Experiments

この実験場では以下を行いました。

- Solid + Drizzle での CRUD 処理
- 自作グローバルストア機構は理論上でなく SSR 状態汚染を防ぐのか安全性検証
- SSR / SSG のレスポンス時間計測

## Related Articles

- [各 JS フレームワークのみでの DB 連携探訪記](https://wings.hatenablog.com/entry/withoutLaravelFestival)
- [Astro 上の Solid / Svelte / Vue にグローバルストアを持たせたい](https://wings.hatenablog.com/entry/AstroGlobalStores)
- [自作のストア機構が理論上でなく実質として SSR で安全なのか確認祭](https://wings.hatenablog.com/entry/ssrUnsafeStoresFestival)
- [各フレームワークでの SSR / SSG のレスポンス時間計測祭](https://wings.hatenablog.com/entry/responseTimeFestival)

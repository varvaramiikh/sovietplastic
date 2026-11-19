/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, type ComponentType } from 'react';

export interface PageMeta {
  /** Заголовок из <title> исходного файла. */
  title: string;
  /** Значения по умолчанию настроек (Tweaks) из data-props исходного файла. */
  defaults: Record<string, unknown>;
  /** Размер превью артборда на холсте Claude Design. */
  preview: { width: number; height: number } | null;
}

/**
 * Настройки (Tweaks) можно поменять параметрами адреса, как панелью Tweaks в Claude Design:
 * /login?mode=register, /?newsMode=show, /admin?canvasPreview=false.
 */
function readTweaks(defaults: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  let q: URLSearchParams;
  try {
    q = new URLSearchParams(window.location.search);
  } catch {
    return out;
  }
  for (const [k, d] of Object.entries(defaults)) {
    const raw = q.get(k);
    if (raw == null) continue;
    if (typeof d === 'boolean') out[k] = raw === 'true' || raw === '1';
    else if (typeof d === 'number') out[k] = Number(raw);
    else out[k] = raw;
  }
  return out;
}

/**
 * Собирает страницу или компонент: класс логики + разметка + стили.
 * Стили вставляются тегом <style>, пока компонент на экране — так стили одной страницы
 * не влияют на другие (в Claude Design у каждой страницы был свой документ).
 */
export function definePage(
  Logic: any,
  View: ComponentType<{ $v: any }>,
  css: string,
  meta: PageMeta,
  opts: { component?: boolean } = {},
) {
  class Bound extends Logic {
    render() {
      return (
        <>
          <style data-dc-styles={meta.title} dangerouslySetInnerHTML={{ __html: css }} />
          <View $v={(this as any).renderVals()} />
        </>
      );
    }
  }
  const B = Bound as unknown as ComponentType<any>;
  function Wrapper(props: Record<string, unknown>) {
    useEffect(() => {
      if (!opts.component && meta.title) document.title = meta.title;
    }, []);
    const tweaks = opts.component ? {} : readTweaks(meta.defaults);
    return <B {...meta.defaults} {...tweaks} {...props} />;
  }
  Wrapper.meta = meta;
  return Wrapper;
}

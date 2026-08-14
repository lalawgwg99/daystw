import type { Metadata } from "next";
import GlossaryWiki from "../components/GlossaryWiki";
import SubpageHeader from "../components/SubpageHeader";
import { getAllWikiArticles } from "../data/wiki-articles";

export const metadata: Metadata = {
  title: "民俗百科｜吉日通",
  description: "黃曆、擇日、拜拜、神明與命理名詞百科，白話解釋，像維基百科一樣查閱。",
};

export default function WikiIndexPage() {
  const total = getAllWikiArticles().length;

  return (
    <main className="page-root">
      <SubpageHeader active="wiki" />

      <div className="page-container wiki-page">
        <a className="back-link prominent" href="/">
          ← 返回吉日通首頁
        </a>
        <header className="wiki-page-header">
          <h1 className="hero-title">民俗百科</h1>
          <p className="hero-desc">
            收錄 {total} 篇黃曆、節氣、拜拜、神明與擇日相關條目。每篇含導言、分段說明與相關條目連結，長輩也能看懂。
          </p>
        </header>
        <GlossaryWiki />
      </div>
    </main>
  );
}

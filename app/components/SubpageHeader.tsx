type Props = {
  active?: "home" | "wiki" | "landing";
};

/** 子頁頂部導覽：使用原生 <a>，確保靜態部署下可正常返回首頁 */
export default function SubpageHeader({ active = "landing" }: Props) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="site-brand" href="/">
          <span className="brand-mark">吉</span>
          <span className="brand-name">吉日通</span>
        </a>
        <nav aria-label="子頁導覽" className="site-nav desktop-only">
          <a className={`nav-link ${active === "home" ? "active" : ""}`} href="/">
            首頁
          </a>
          <a className="nav-link" href="/#finder">
            找吉日
          </a>
          <a className="nav-link" href="/#calendar">
            今日
          </a>
          <a className={`nav-link ${active === "wiki" ? "active" : ""}`} href="/wiki">
            民俗百科
          </a>
        </nav>
      </div>
    </header>
  );
}

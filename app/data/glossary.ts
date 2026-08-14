/** 宜忌白話解釋（tooltip 快速對照） */

import { getWikiSummary } from "./wiki-articles";

export type GlossaryEntry = {
  term: string;
  plain: string;
  category: "yi" | "ji" | "term";
};

export const glossaryEntries: GlossaryEntry[] = [
  { term: "嫁娶", plain: "結婚、訂婚、迎娶等婚事", category: "yi" },
  { term: "納采", plain: "男方送聘禮到女方家", category: "yi" },
  { term: "訂盟", plain: "訂婚、簽訂婚約", category: "yi" },
  { term: "入宅", plain: "搬進新家住", category: "yi" },
  { term: "移徙", plain: "搬家、遷居", category: "yi" },
  { term: "開市", plain: "商店開業、開始營業", category: "yi" },
  { term: "開業", plain: "公司或店鋪開始營運", category: "yi" },
  { term: "交易", plain: "買賣、簽約、談生意", category: "yi" },
  { term: "祭祀", plain: "祭拜神明或祖先", category: "yi" },
  { term: "祈福", plain: "向神明祈求平安順遂", category: "yi" },
  { term: "冠笄", plain: "成人禮；也引申為考試、升學", category: "yi" },
  { term: "安床", plain: "安置新床、入洞房", category: "yi" },
  { term: "動土", plain: "動工、破土、蓋房子", category: "yi" },
  { term: "出行", plain: "出遠門、旅行、出差", category: "yi" },
  { term: "安葬", plain: "下葬、舉行喪葬儀式", category: "yi" },
  { term: "修造", plain: "裝潢、修繕房屋", category: "yi" },
  { term: "立券", plain: "簽訂契約、借貸文書", category: "yi" },
  { term: "納財", plain: "收財、進帳、開張收銀", category: "yi" },
  { term: "求嗣", plain: "祈求子嗣、懷孕", category: "yi" },
  { term: "開光", plain: "為神像或物品開光加持", category: "yi" },
  { term: "破土", plain: "動土開工（常見於建築）", category: "yi" },
  { term: "上樑", plain: "房屋上樑儀式", category: "yi" },
  { term: "納畜", plain: "買牲畜、養寵物", category: "yi" },
  { term: "裁衣", plain: "製作新衣、裁縫", category: "yi" },
  { term: "會友", plain: "聚會、會面、社交", category: "yi" },
  { term: "求醫", plain: "看醫生、治療", category: "yi" },
  { term: "解除", plain: "解除災厄、驅邪", category: "yi" },
  { term: "沐浴", plain: "洗澡、淨身", category: "yi" },
  { term: "剃頭", plain: "理髮、剪髮", category: "yi" },
  { term: "整手足甲", plain: "剪指甲、修手腳", category: "yi" },
  { term: "破屋", plain: "拆除舊屋", category: "ji" },
  { term: "壞垣", plain: "拆牆、拆除圍牆", category: "ji" },
  { term: "詞訟", plain: "打官司、訴訟", category: "ji" },
  { term: "胎神", plain: "傳統認為胎神所在方位，動土、敲打該處恐傷胎", category: "term" },
  { term: "彭祖百忌", plain: "每日干支的禁忌簡述，如「甲不開倉」等", category: "term" },
  { term: "沖煞", plain: "該日地支與某生肖相沖，該生肖者宜避開重要事", category: "term" },
  { term: "煞", plain: "凶煞方位，如煞北表示北方不宜動土", category: "term" },
  { term: "建除", plain: "十二建星（建、除、滿、平、定、執、破、危、成、收、開、閉）", category: "term" },
  { term: "黃道", plain: "吉神所在，黃道日較適合辦喜事", category: "term" },
  { term: "黑道", plain: "凶神當值，宜謹慎行事", category: "term" },
  { term: "月破", plain: "與月令相沖之日，大事不宜", category: "term" },
  { term: "四絕日", plain: "立春、立夏、立秋、立冬前一日，不宜大事", category: "term" },
  { term: "受死日", plain: "月建受死之日，不宜婚嫁、開業", category: "term" },
  { term: "楊公忌", plain: "傳統忌日，不宜婚嫁、動土", category: "term" },
  { term: "吉時", plain: "當日適合行事的時辰（子丑寅卯…）", category: "term" },
  { term: "太歲", plain: "值年神煞，本命年（值太歲）宜穩健行事", category: "term" },
  { term: "納音", plain: "干支組合的五行屬性名稱", category: "term" },
];

const lookup = new Map<string, string>();
for (const entry of glossaryEntries) {
  if (!lookup.has(entry.term)) lookup.set(entry.term, entry.plain);
}

/** 取得宜忌或術語的白話說明 */
export function explainTerm(term: string): string | undefined {
  const normalized = term.trim();
  const wiki = getWikiSummary(normalized);
  if (wiki) return wiki;
  if (lookup.has(normalized)) return lookup.get(normalized);
  for (const [key, plain] of lookup) {
    if (normalized.includes(key) || key.includes(normalized)) return plain;
  }
  return undefined;
}

export function explainTerms(terms: string[]): { term: string; plain: string }[] {
  return terms.map((term) => ({
    term,
    plain: explainTerm(term) ?? "傳統黃曆記載的行事參考",
  }));
}

/** @deprecated 請使用 wiki 條目 */
export const termEntries = glossaryEntries.filter((e) => e.category === "term");

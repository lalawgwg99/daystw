/** 裝飾性雲紋／底紋，純 CSS + inline SVG */
export default function AlmanacDecor() {
  return (
    <div aria-hidden className="almanac-decor">
      <svg className="almanac-decor-cloud left" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 40c0-11 9-20 20-20 4 0 8 1 11 3 3-8 11-13 20-13 12 0 22 10 22 22 0 1 0 2 0 3H20z"
          fill="currentColor"
          opacity="0.08"
        />
      </svg>
      <svg className="almanac-decor-cloud right" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 40c0-11 9-20 20-20 4 0 8 1 11 3 3-8 11-13 20-13 12 0 22 10 22 22 0 1 0 2 0 3H20z"
          fill="currentColor"
          opacity="0.08"
        />
      </svg>
    </div>
  );
}

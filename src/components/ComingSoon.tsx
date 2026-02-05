import React from "react";

type ComingSoonProps = {
  title: string;
  subtitle: string;
  badge?: string; // "In progress", "Under construction", etc.
  backHref?: string; 
};

export function ComingSoon({
  title,
  subtitle,
  badge = "Under construction",
  backHref = "/",
}: ComingSoonProps) {
  return (
    <div className="cs">
      <div className="csBg" aria-hidden="true" />

      <div className="csWrap">
        <a href="/" className="csBack">← Back</a>

        <div className="csCard">
          <div className="csTop">
            <span className="csBadge">{badge}</span>
            <span className="csDot" aria-hidden="true" />
          </div>

          <h1 className="csTitle">{title}</h1>
          <p className="csSub">{subtitle}</p>

          <div className="csActions">
            <a href="/" className="csBtn">Go to Hub</a>
            <a
              className="csBtn ghost"
              href="https://portfolio.pierinalopez.com"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
          </div>

          <div className="csFooter">
            <span>ETA: soon ✦</span>
            <span className="csSep">•</span>
            <span>Building in public</span>
          </div>
        </div>
      </div>
    </div>
  );
}
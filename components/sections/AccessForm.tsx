"use client";
import { labels } from "@/lib/constants";

import { ui } from "@/lib/constants";
import { useState } from "react";
import { motionConfig as M } from "@/lib/motion";
export default function AccessForm() {
  const [intent, setIntent] = useState("");
  return (
    <form
      className="access-form"
      action="https://github.com/bailiyyds/synapse-website/issues/new"
      method="get"
    >
      <label className="sr-only" htmlFor="intent">
        {ui.text16}
      </label>
      <input
        id="intent"
        name="title"
        value={intent}
        onChange={(e) => setIntent(e.target.value)}
        placeholder={labels.label1}
        required
        minLength={5}
        maxLength={150}
      />
      <input type="hidden" name="body" value={labels.label2} />
      <button
        type="submit"
        onPointerEnter={async (event) => {
          if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          const button = event.currentTarget;
          const { animate } = await import("motion");
          animate(button, { x: [0, 2, 0] }, { duration: M.duration / 3 });
        }}
      >
        {ui.text17}
        <span>↗</span>
      </button>
    </form>
  );
}

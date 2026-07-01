import { useState, useEffect } from "react";
import { SECTIONS } from "@/data/catalog";

interface CategorySelectorProps {
  value: string;
  onChange: (slug: string) => void;
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  const findInitialSelection = (val: string) => {
    for (const section of SECTIONS) {
      for (const group of section.groups) {
        for (const sub of group.subcategories) {
          if (sub.slug === val) return { sectionSlug: section.slug, groupSlug: group.slug };
        }
        if (group.slug === val) return { sectionSlug: section.slug, groupSlug: group.slug };
      }
    }
    return { sectionSlug: "", groupSlug: "" };
  };

  const initial = findInitialSelection(value);
  const [sectionSlug, setSectionSlug] = useState(initial.sectionSlug);
  const [groupSlug, setGroupSlug] = useState(initial.groupSlug);

  useEffect(() => {
    const sel = findInitialSelection(value);
    setSectionSlug(sel.sectionSlug);
    setGroupSlug(sel.groupSlug);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const selectedSection = SECTIONS.find(s => s.slug === sectionSlug);
  const selectedGroup = selectedSection?.groups.find(g => g.slug === groupSlug);
  const subcategories = selectedGroup?.subcategories ?? [];

  const handleSectionChange = (slug: string) => {
    setSectionSlug(slug);
    setGroupSlug("");
    onChange("");
  };

  const handleGroupChange = (slug: string) => {
    setGroupSlug(slug);
    const group = selectedSection?.groups.find(g => g.slug === slug);
    const subs = group?.subcategories ?? [];
    if (subs.length === 1) {
      onChange(subs[0].slug);
    } else {
      onChange("");
    }
  };

  const sel: React.CSSProperties = {
    width: "100%",
    marginTop: 6,
    padding: "8px 10px",
    background: "var(--a-bg)",
    color: "var(--a-text)",
    border: "1px solid var(--a-border)",
    borderRadius: 8,
    fontSize: 14,
  };
  const lbl: React.CSSProperties = { fontSize: 12, color: "var(--a-muted)", fontWeight: 600 };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div>
        <label style={lbl}>Deporte</label>
        <select className="adm-select" style={sel} value={sectionSlug} onChange={e => handleSectionChange(e.target.value)}>
          <option value="">Selecciona el deporte…</option>
          {SECTIONS.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select>
      </div>

      {sectionSlug && (
        <div>
          <label style={lbl}>Categoria</label>
          <select className="adm-select" style={sel} value={groupSlug} onChange={e => handleGroupChange(e.target.value)}>
            <option value="">Selecciona la categoria…</option>
            {selectedSection?.groups.map(g => <option key={g.slug} value={g.slug}>{g.name}</option>)}
          </select>
        </div>
      )}

      {groupSlug && subcategories.length > 1 && (
        <div>
          <label style={lbl}>Subcategoria</label>
          <select className="adm-select" style={sel} value={value} onChange={e => onChange(e.target.value)}>
            <option value="">Selecciona la subcategoria…</option>
            {subcategories.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          </select>
        </div>
      )}
    </div>
  );
}

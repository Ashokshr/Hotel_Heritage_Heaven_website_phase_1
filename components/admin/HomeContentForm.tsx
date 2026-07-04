"use client";

import { useState, useTransition } from "react";
import { Loader2, Save, Plus, X, ChevronUp, ChevronDown, CheckCircle2 } from "lucide-react";
import { upsertHomeContent } from "@/lib/actions/admin-content";
import { ICON_OPTIONS, DEFAULT_ICON } from "@/lib/content-icons";
import type { HomeContentBlock, HomeInfoCard } from "@/lib/types";

function newId() {
  return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random()}`;
}

type CardWithId = HomeInfoCard & { _id: string };

export default function HomeContentForm({ content }: { content: HomeContentBlock }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [values, setValues] = useState<CardWithId[]>(content.about.values.map((v) => ({ ...v, _id: newId() })));
  const [items, setItems] = useState<CardWithId[]>(content.whyChooseUs.items.map((v) => ({ ...v, _id: newId() })));

  function handleSubmit(formData: FormData) {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const result = await upsertHomeContent(formData);
      if (!result.ok) setError(result.error || "Something went wrong.");
      else setSaved(true);
    });
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <input type="hidden" name="about_values" value={JSON.stringify(values.map(stripId))} />
      <input type="hidden" name="why_items" value={JSON.stringify(items.map(stripId))} />

      <Section title="Hero (top banner)">
        <Field label="Eyebrow" name="hero_eyebrow" defaultValue={content.hero.eyebrow} />
        <Field label="Title" name="hero_title" defaultValue={content.hero.title} required textarea />
        <Field label="Subtitle" name="hero_subtitle" defaultValue={content.hero.subtitle} textarea />
      </Section>

      <Section title="About Us section">
        <Field label="Eyebrow" name="about_eyebrow" defaultValue={content.about.eyebrow} />
        <Field label="Title" name="about_title" defaultValue={content.about.title} textarea />
        <Field label="Description" name="about_description" defaultValue={content.about.description} textarea rows={4} />
        <CardListEditor label="Value Cards (Vision / Mission / Philosophy)" cards={values} setCards={setValues} />
      </Section>

      <Section title="Why Choose Us section">
        <Field label="Eyebrow" name="why_eyebrow" defaultValue={content.whyChooseUs.eyebrow} />
        <Field label="Title" name="why_title" defaultValue={content.whyChooseUs.title} textarea />
        <CardListEditor label="Difference Cards" cards={items} setCards={setItems} />
      </Section>

      <Section title="Closing call-to-action">
        <Field label="Eyebrow" name="cta_eyebrow" defaultValue={content.closingCta.eyebrow} />
        <Field label="Title" name="cta_title" defaultValue={content.closingCta.title} textarea />
        <Field label="Description" name="cta_description" defaultValue={content.closingCta.description} textarea rows={3} />
      </Section>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && !error && (
        <p className="flex items-center gap-1.5 text-sm text-emerald-700">
          <CheckCircle2 size={16} /> Saved — the homepage now reflects these changes.
        </p>
      )}

      <button type="submit" disabled={isPending} className="btn-primary">
        {isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
        {isPending ? "Saving..." : "Save Homepage Content"}
      </button>
    </form>
  );
}

function stripId(card: CardWithId): HomeInfoCard {
  return { icon: card.icon, title: card.title, description: card.description };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md bg-white p-6 shadow-card">
      <h2 className="mb-4 text-base font-semibold text-charcoal">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  textarea,
  rows = 2,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-charcoal/80">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          defaultValue={defaultValue}
          rows={rows}
          className="w-full rounded-sm border border-charcoal/15 bg-cream-50 px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400"
        />
      ) : (
        <input
          name={name}
          required={required}
          defaultValue={defaultValue}
          className="w-full rounded-sm border border-charcoal/15 bg-cream-50 px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400"
        />
      )}
    </div>
  );
}

function CardListEditor({
  label,
  cards,
  setCards,
}: {
  label: string;
  cards: CardWithId[];
  setCards: (updater: (prev: CardWithId[]) => CardWithId[]) => void;
}) {
  function addCard() {
    setCards((prev) => [...prev, { _id: newId(), icon: DEFAULT_ICON, title: "", description: "" }]);
  }

  function updateCard(id: string, patch: Partial<HomeInfoCard>) {
    setCards((prev) => prev.map((c) => (c._id === id ? { ...c, ...patch } : c)));
  }

  function removeCard(id: string) {
    setCards((prev) => prev.filter((c) => c._id !== id));
  }

  function moveCard(id: string, direction: -1 | 1) {
    setCards((prev) => {
      const idx = prev.findIndex((c) => c._id === id);
      const swapWith = idx + direction;
      if (swapWith < 0 || swapWith >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[swapWith]] = [next[swapWith], next[idx]];
      return next;
    });
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium text-charcoal/80">{label}</label>
        <button type="button" onClick={addCard} className="btn-secondary px-3 py-1.5 text-xs">
          <Plus size={13} /> Add Card
        </button>
      </div>
      <div className="space-y-3">
        {cards.map((card, idx) => (
          <div key={card._id} className="rounded-md border border-charcoal/10 bg-cream-50 p-4">
            <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
              <div>
                <label className="mb-1 block text-xs font-medium text-charcoal/60">Icon</label>
                <select
                  value={card.icon}
                  onChange={(e) => updateCard(card._id, { icon: e.target.value })}
                  className="w-full rounded-sm border border-charcoal/15 bg-white px-2.5 py-2 text-xs outline-none focus:border-heritage-400"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-charcoal/60">Title</label>
                <input
                  value={card.title}
                  onChange={(e) => updateCard(card._id, { title: e.target.value })}
                  className="w-full rounded-sm border border-charcoal/15 bg-white px-2.5 py-2 text-sm outline-none focus:border-heritage-400"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-xs font-medium text-charcoal/60">Description</label>
              <textarea
                value={card.description}
                onChange={(e) => updateCard(card._id, { description: e.target.value })}
                rows={2}
                className="w-full rounded-sm border border-charcoal/15 bg-white px-2.5 py-2 text-sm outline-none focus:border-heritage-400"
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => moveCard(card._id, -1)}
                  disabled={idx === 0}
                  className="rounded-sm p-1 text-charcoal/40 hover:bg-white disabled:opacity-30"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => moveCard(card._id, 1)}
                  disabled={idx === cards.length - 1}
                  className="rounded-sm p-1 text-charcoal/40 hover:bg-white disabled:opacity-30"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
              <button type="button" onClick={() => removeCard(card._id)} className="rounded-sm p-1 text-red-500 hover:bg-red-50">
                <X size={14} />
              </button>
            </div>
          </div>
        ))}
        {cards.length === 0 && <p className="text-xs text-charcoal/50">No cards yet — click &ldquo;Add Card&rdquo;.</p>}
      </div>
    </div>
  );
}

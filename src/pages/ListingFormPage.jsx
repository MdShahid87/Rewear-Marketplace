import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { CATEGORIES, CONDITIONS, SIZES } from "../data/seed";
import { useAuth } from "../hooks/useAuth";
import {
  createListing,
  getClothing,
  removeListing,
  updateListing,
} from "../services/clothingService";
import { formatCurrency } from "../utils/formatCurrency";
import { estimateSwapValue } from "../utils/swapValue";
import { validateListing } from "../utils/validators";

// Defines the default values for a new clothing listing.
const empty = {
  title: "",
  category: "Tops",
  type: "",
  brand: "",
  size: "M",
  condition: "Good",
  description: "",
  imageUrl: "",
};

export default function ListingFormPage() {
  const { id } = useParams();
  const editing = Boolean(id);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!id) return;
    getClothing(id).then((item) => {
      if (!item) return;
      setForm({
        title: item.title,
        category: item.category,
        type: item.type,
        brand: item.brand,
        size: item.size,
        condition: item.condition,
        description: item.description,
        imageUrl: item.imageUrl,
      });
    });
  }, [id]);

  const estimated = useMemo(() => estimateSwapValue(form), [form]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateListing(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setBusy(true);
    setServerError("");
    try {
      const item = editing
        ? await updateListing(id, form, user)
        : await createListing(user, form);
      navigate(`/items/${item.id}`);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const onRemove = async () => {
    if (!window.confirm("Remove this listing from the marketplace?")) return;
    await removeListing(id, user);
    navigate("/dashboard");
  };

  return (
    <div className="page-enter mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl text-forest">
        {editing ? "Edit listing" : "List clothing to swap"}
      </h1>
      <p className="mt-2 text-muted">
        Estimated swap value updates from brand, category, and condition — no
        asking price needed.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 grid gap-4 rounded-3xl bg-white p-6 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <Input
            label="Title"
            value={form.title}
            error={errors.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <label className="space-y-1.5 text-sm">
          Category
          <select
            className="w-full rounded-2xl border border-stone-200 px-4 py-2.5"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {CATEGORIES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <Input
          label="Type (e.g. Kurta, Sneakers)"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />
        <Input
          label="Brand"
          value={form.brand}
          error={errors.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        />
        <label className="space-y-1.5 text-sm">
          Size
          <select
            className="w-full rounded-2xl border border-stone-200 px-4 py-2.5"
            value={form.size}
            onChange={(e) => setForm({ ...form, size: e.target.value })}
          >
            {SIZES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1.5 text-sm">
          Condition
          <select
            className="w-full rounded-2xl border border-stone-200 px-4 py-2.5"
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
          >
            {CONDITIONS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <div className="md:col-span-2">
          <Input
            label="Image URL"
            value={form.imageUrl}
            error={errors.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
        </div>
        <div className="md:col-span-2">
          <Input
            as="textarea"
            rows={5}
            label="Description"
            value={form.description}
            error={errors.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="rounded-2xl bg-sand px-4 py-3 text-sm md:col-span-2">
          Estimated swap value: <strong>{formatCurrency(estimated)}</strong>
        </div>
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            className="h-40 rounded-2xl object-cover md:col-span-2"
          />
        )}
        {serverError && (
          <p className="text-sm text-red-600 md:col-span-2">{serverError}</p>
        )}
        <div className="flex flex-wrap gap-2 md:col-span-2">
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : editing ? "Save changes" : "Publish listing"}
          </Button>
          {editing && (
            <Button variant="danger" onClick={onRemove}>
              Remove listing
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";
import {
  Chips,
  Counter,
  Field,
  FormError,
  Honeypot,
  Input,
  Select,
  SuccessPanel,
  useEnquiry,
} from "./fields";

/** Form đặt dịch vụ visa/fast-track: quốc tịch, số người, ngày nhập cảnh, sân bay, số hiệu chuyến bay. */
export default function VisaForm({ lang, t, c, airports, levels }) {
  const formRef = useRef(null);
  const { status, code, submit, reset } = useEnquiry("visa", lang);
  const [error, setError] = useState("");
  const [d, setD] = useState({
    service: t.services[0],
    level: levels.find((l) => l.popular)?.key || levels[0].key,
    nationality: "",
    travellers: 2,
    entryDate: "",
    airport: airports[0].code,
    flight: "",
    name: "",
    email: "",
    phone: "",
  });
  const set = (k) => (e) => setD({ ...d, [k]: e?.target ? e.target.value : e });

  if (status === "success")
    return (
      <SuccessPanel
        title={t.successTitle}
        text={t.successText}
        code={code}
        labels={c}
        onReset={reset}
      />
    );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!d.name.trim() || !/^\S+@\S+\.\S+$/.test(d.email) || !d.nationality.trim()) {
      return setError(`${c.required}: ${t.nationality} / ${c.fullName} / Email`);
    }
    setError("");
    await submit(d, formRef.current);
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="relative grid gap-5 sm:grid-cols-2"
    >
      <Honeypot />
      <Field label={t.service} className="sm:col-span-2">
        <Chips
          options={t.services.map((s) => ({ value: s, label: s }))}
          value={d.service}
          onChange={set("service")}
        />
      </Field>
      <Field label={t.fastTitle} htmlFor="vs-level">
        <Select id="vs-level" value={d.level} onChange={set("level")}>
          {levels.map((l) => (
            <option key={l.key} value={l.key}>
              {l.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field label={t.nationality} required htmlFor="vs-nat">
        <Input
          id="vs-nat"
          value={d.nationality}
          onChange={set("nationality")}
          autoComplete="country-name"
        />
      </Field>
      <Field label={t.travellers}>
        <Counter
          value={d.travellers}
          min={1}
          max={60}
          onChange={set("travellers")}
          label={t.travellers}
        />
      </Field>
      <Field label={t.entryDate} htmlFor="vs-date">
        <Input id="vs-date" type="date" value={d.entryDate} onChange={set("entryDate")} />
      </Field>
      <Field label={t.arrivalAirport} htmlFor="vs-airport">
        <Select id="vs-airport" value={d.airport} onChange={set("airport")}>
          {airports.map((a) => (
            <option key={a.code} value={a.code}>
              {a.label} ({a.code})
            </option>
          ))}
        </Select>
      </Field>
      <Field label={t.flightNumber} htmlFor="vs-flight">
        <Input
          id="vs-flight"
          value={d.flight}
          onChange={set("flight")}
          placeholder="VN301 / CZ3045"
        />
      </Field>
      <Field label={c.fullName} required htmlFor="vs-name">
        <Input id="vs-name" value={d.name} onChange={set("name")} autoComplete="name" />
      </Field>
      <Field label="Email" required htmlFor="vs-email">
        <Input
          id="vs-email"
          type="email"
          value={d.email}
          onChange={set("email")}
          autoComplete="email"
        />
      </Field>
      <Field label={c.phone} className="sm:col-span-2" htmlFor="vs-phone">
        <Input id="vs-phone" value={d.phone} onChange={set("phone")} autoComplete="tel" />
      </Field>
      <div className="space-y-3 sm:col-span-2">
        <FormError show={!!error} text={error} />
        <FormError show={status === "error"} text={c.errorGeneric} />
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-sun-500 font-semibold text-white shadow-lg shadow-sun-500/25 hover:bg-sun-600 disabled:opacity-60"
        >
          <Send className="size-4" /> {status === "sending" ? c.sending : c.submit}
        </button>
        <p className="text-center text-xs text-muted">{c.noOnlinePayment}</p>
      </div>
    </form>
  );
}

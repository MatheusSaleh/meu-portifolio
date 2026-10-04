"use client";

import type { FormEvent } from "react";
import { profile } from "@/content/shared";
import type { Content } from "@/content/types";
import { format } from "@/lib/format";
import { useGame } from "./game-provider";
import { Icon } from "./icon";

const fieldClassName =
  "w-full border border-outline-variant bg-surface-container p-2 text-body-md text-on-surface voxel-slot-inset placeholder:text-placeholder focus:border-secondary focus:outline-hidden";
const labelClassName = "text-label-sm font-bold text-outline uppercase";
const secondaryLinkClassName =
  "flex items-center gap-1 bg-surface-container px-space-sm py-1.5 text-label-md uppercase voxel-btn-bevel hover:bg-surface-container-high";

/**
 * Pergaminho encantado de contato. Sem back-end: ao enviar, abre o cliente de e-mail
 * do visitante com a mensagem já preenchida para o endereço do perfil.
 */
export function ContactForm({ strings }: { strings: Content["contact"]["form"] }) {
  const { notify } = useGame();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name"));
    const email = String(data.get("email"));
    const message = String(data.get("message"));

    const subject = encodeURIComponent(format(strings.subject, { name }));
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    notify(strings.toast.title, strings.toast.message);
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-space-md md:grid-cols-2">
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-name" className={labelClassName}>
          {strings.nameLabel}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={strings.namePlaceholder}
          className={fieldClassName}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-email" className={labelClassName}>
          {strings.emailLabel}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={strings.emailPlaceholder}
          className={fieldClassName}
        />
      </div>
      <div className="flex flex-col gap-1 md:col-span-2">
        <label htmlFor="contact-message" className={labelClassName}>
          {strings.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder={strings.messagePlaceholder}
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col items-center justify-between gap-space-sm pt-2 sm:flex-row md:col-span-2">
        <div className="flex items-center gap-space-sm">
          <a href={`mailto:${profile.email}`} className={`${secondaryLinkClassName} text-on-surface`}>
            <Icon name="mail" className="text-[16px]" />
            <span>{strings.directEmail}</span>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className={`${secondaryLinkClassName} text-secondary`}
          >
            <Icon name="handshake" className="text-[16px]" />
            <span>{strings.linkedin}</span>
          </a>
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 border-2 border-surface-container-lowest bg-primary px-space-lg py-space-sm font-headline text-sm font-bold text-on-primary uppercase shadow-xl transition-none active:translate-y-1 sm:w-auto"
        >
          <Icon name="save" className="text-[18px]" />
          <span>{strings.submit}</span>
        </button>
      </div>
    </form>
  );
}

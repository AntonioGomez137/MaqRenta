'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import Link from 'next/link';
import { getEquipos } from '@/lib/equipos';
import { construirEnlaceWhatsApp } from '@/lib/whatsapp';

const esquema = z.object({
  nombre: z.string().trim().min(2, 'Escribe al menos 2 caracteres'),
  telefono: z
    .string()
    .trim()
    .regex(/^\d{10}$/, 'El teléfono debe tener 10 dígitos'),
  equipo: z.string().optional(),
  mensaje: z.string().max(300, 'Máximo 300 caracteres').optional(),
  aviso: z.boolean().refine((valor) => valor === true, {
    message: 'Debes aceptar el aviso de privacidad',
  }),
});

type Valores = z.infer<typeof esquema>;

interface FormularioContactoProps {
  equipoInicial?: string;
}

export function FormularioContacto({ equipoInicial = '' }: FormularioContactoProps) {
  const equipos = getEquipos();
  const [enlace, setEnlace] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Valores>({
    resolver: zodResolver(esquema),
    defaultValues: {
      nombre: '',
      telefono: '',
      equipo: equipoInicial,
      mensaje: '',
      aviso: false,
    },
  });

  function onSubmit(valores: Valores) {
    const nombreEquipo =
      equipos.find((equipo) => equipo.slug === valores.equipo)?.nombre ?? 'maquinaria pesada';
    const extra = valores.mensaje?.trim() ? `${valores.mensaje.trim()} ` : '';
    const texto = `Hola, soy ${valores.nombre}. Me interesa rentar: ${nombreEquipo}. ${extra}Mi teléfono: ${valores.telefono}.`;
    const url = construirEnlaceWhatsApp(texto);
    setEnlace(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-carbon">
          Nombre
        </label>
        <input
          id="nombre"
          {...register('nombre')}
          className="w-full rounded border border-niebla px-3 py-2 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        />
        {errors.nombre ? <p className="mt-1 text-sm text-error">{errors.nombre.message}</p> : null}
      </div>

      <div>
        <label htmlFor="telefono" className="mb-1 block text-sm font-medium text-carbon">
          Teléfono
        </label>
        <input
          id="telefono"
          inputMode="numeric"
          {...register('telefono')}
          className="w-full rounded border border-niebla px-3 py-2 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        />
        {errors.telefono ? (
          <p className="mt-1 text-sm text-error">{errors.telefono.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="equipo" className="mb-1 block text-sm font-medium text-carbon">
          Equipo de interés
        </label>
        <select
          id="equipo"
          {...register('equipo')}
          className="w-full rounded border border-niebla px-3 py-2 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          <option value="">Sin equipo específico</option>
          {equipos.map((equipo) => (
            <option key={equipo.slug} value={equipo.slug}>
              {equipo.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className="mb-1 block text-sm font-medium text-carbon">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          rows={4}
          maxLength={300}
          {...register('mensaje')}
          className="w-full rounded border border-niebla px-3 py-2 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        />
        {errors.mensaje ? <p className="mt-1 text-sm text-error">{errors.mensaje.message}</p> : null}
      </div>

      <div>
        <label className="flex items-start gap-2 text-sm text-carbon">
          <input type="checkbox" {...register('aviso')} className="mt-1 accent-primary" />
          <span>
            He leído el{' '}
            <Link
              href="/aviso-de-privacidad"
              className="underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              aviso de privacidad
            </Link>
          </span>
        </label>
        {errors.aviso ? <p className="mt-1 text-sm text-error">{errors.aviso.message}</p> : null}
      </div>

      <button
        type="submit"
        className="rounded bg-whatsapp px-5 py-3 font-semibold text-white outline-offset-2 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-carbon"
      >
        Abrir WhatsApp
      </button>

      {enlace ? (
        <p className="text-sm text-carbon">
          Abrimos WhatsApp con tu mensaje. Si no se abrió,{' '}
          <a
            href={enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2"
          >
            toca aquí
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}

import { z } from 'zod';

export const peminatanSchema = z.object({
  namaSantri: z
    .string()
    .min(3, 'Nama santri wajib diisi minimal 3 karakter'),
  nis: z
    .number({ error: 'NIS wajib diisi berupa angka' })
    .min(100, 'NIS minimal bernilai 100'),
  umur: z
    .number({ error: 'Umur wajib diisi berupa angka' })
    .min(15, 'Umur minimal 15 tahun')
    .max(20, 'Umur maksimal 20 tahun'),
  pilihanDivisi: z.enum(['Frontend', 'Backend', 'UIUX'], {
    error: 'Wajib memilih salah satu divisi',
  }),
  keahlian: z
    .array(z.string())
    .min(1, 'Wajib mencentang minimal 1 keahlian'),
  persetujuan: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Persetujuan tata tertib wajib dicentang',
    }),
});

export type PeminatanFormData = z.infer<typeof peminatanSchema>;
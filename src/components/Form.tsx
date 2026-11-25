import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { peminatanSchema, type PeminatanFormData } from '../schemas/perminatanSchema';
import usePerminatanStore from '../store/usePerminatanStore';

const DAFTAR_KEAHLIAN = ['HTML', 'CSS', 'JavaScript', 'React'];

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 ' +
  'placeholder:text-slate-400 transition-colors focus:border-slate-800 focus:outline-none ' +
  'focus:ring-2 focus:ring-slate-900/10';

const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700';

const errorClass = 'mt-1 text-xs text-red-600';

export default function PeminatanForm() {
  const addSantri = usePerminatanStore((state) => state.addSantri);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<PeminatanFormData>({
    resolver: zodResolver(peminatanSchema),
    mode: 'onChange',
    defaultValues: {
      namaSantri: '',
      keahlian: [],
      persetujuan: false,
    },
  });

  const onSubmit = (data: PeminatanFormData) => {
    addSantri(data);
    alert(`Pendaftaran ${data.namaSantri} berhasil!`);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="mb-6 text-center text-xl font-semibold tracking-tight text-slate-900">
        Form Peminatan Santri
      </h2>

      <div className="space-y-5">
        <div>
          <label htmlFor="namaSantri" className={labelClass}>
            Nama Santri
          </label>
          <input
            id="namaSantri"
            type="text"
            placeholder="Masukkan nama lengkap"
            className={inputClass}
            {...register('namaSantri')}
          />
          {errors.namaSantri && <p className={errorClass}>{errors.namaSantri.message}</p>}
        </div>

        <div>
          <label htmlFor="nis" className={labelClass}>
            NIS
          </label>
          <input
            id="nis"
            type="number"
            placeholder="Minimal 100"
            className={inputClass}
            {...register('nis', { valueAsNumber: true })}
          />
          {errors.nis && <p className={errorClass}>{errors.nis.message}</p>}
        </div>

        <div>
          <label htmlFor="umur" className={labelClass}>
            Umur
          </label>
          <input
            id="umur"
            type="number"
            placeholder="15 - 20 tahun"
            className={inputClass}
            {...register('umur', { valueAsNumber: true })}
          />
          {errors.umur && <p className={errorClass}>{errors.umur.message}</p>}
        </div>

        <div>
          <label htmlFor="pilihanDivisi" className={labelClass}>
            Pilihan Divisi
          </label>
          <select
            id="pilihanDivisi"
            defaultValue=""
            className={inputClass}
            {...register('pilihanDivisi')}
          >
            <option value="" disabled>
              -- Pilih Divisi --
            </option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="UIUX">UIUX</option>
          </select>
          {errors.pilihanDivisi && <p className={errorClass}>{errors.pilihanDivisi.message}</p>}
        </div>

        <div>
          <span className={labelClass}>Keahlian yang Dikuasai</span>
          <div className="space-y-1">
            {DAFTAR_KEAHLIAN.map((skill) => (
              <label
                key={skill}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1 text-sm text-slate-700 transition-colors hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  value={skill}
                  className="h-4 w-4 rounded accent-slate-900"
                  {...register('keahlian')}
                />
                {skill}
              </label>
            ))}
          </div>
          {errors.keahlian && <p className={errorClass}>{errors.keahlian.message}</p>}
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-700">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded accent-slate-900"
              {...register('persetujuan')}
            />
            Saya menyetujui seluruh tata tertib yang berlaku
          </label>
          {errors.persetujuan && <p className={errorClass}>{errors.persetujuan.message}</p>}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          Daftar Sekarang
        </button>
      </div>
    </form>
  );
}
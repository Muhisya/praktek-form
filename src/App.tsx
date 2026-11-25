import PeminatanForm from './components/Form';
import usePerminatanStore from './store/usePerminatanStore';

export default function App() {
  const santriList = usePerminatanStore((state) => state.santriList);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 font-sans text-slate-900">
      <PeminatanForm />

      <section className="mx-auto mt-8 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="mb-4 text-center text-lg font-semibold tracking-tight text-slate-900">
          Daftar Santri Terdaftar ({santriList.length})
        </h3>

        {santriList.length === 0 ? (
          <p className="text-center text-sm text-slate-500">Belum ada santri yang mendaftar.</p>
        ) : (
          <ul className="space-y-3">
            {santriList.map((santri, index) => (
              <li
                key={index}
                className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm"
              >
                <p className="font-semibold text-slate-900">
                  {santri.namaSantri}
                  <span className="ml-2 font-normal text-slate-500">
                    NIS {santri.nis} · Umur {santri.umur}
                  </span>
                </p>
                <p className="mt-1 text-slate-600">
                  Divisi: <span className="font-medium text-slate-900">{santri.pilihanDivisi}</span>
                  {' · '}
                  Keahlian: {santri.keahlian.join(', ')}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
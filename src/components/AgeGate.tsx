import { useState } from 'react'
import type { ReactNode } from 'react'

const STORAGE_KEY = 'aix-livraison-cbd-age-gate'

type AgeGateProps = {
  children: ReactNode
}

export function AgeGate({ children }: AgeGateProps) {
  const [accepted, setAccepted] = useState(() =>
    typeof window !== 'undefined' &&
    window.localStorage.getItem(STORAGE_KEY) === 'accepted',
  )

  const confirmAge = () => {
    window.localStorage.setItem(STORAGE_KEY, 'accepted')
    setAccepted(true)
  }

  return (
    <>
      {children}

      {!accepted ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#0d1513] p-6 text-[#f2efe4] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
                18+
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-emerald-200/70">
                  Vérification d&apos;âge
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[#f7f3e8]">
                  Accès réservé aux personnes majeures
                </h2>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/72">
              Ce site présente un service réservé aux personnes majeures. En
              continuant, vous confirmez avoir plus de 18 ans.
            </p>
            <button
              type="button"
              onClick={confirmAge}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#d4b06a] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e2bf7a]"
            >
              J&apos;ai plus de 18 ans
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}

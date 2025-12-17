export default function KarasaiPromise() {
  return (
    <div className="rounded-lg bg-white p-6">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-dark">
        The Karasai Promise:
      </h3>
      
      <div className="space-y-4 text-sm leading-relaxed text-neutral-dark/80">
        <p>
          We take rental home fraud very seriously, that's why every home on Karasai has undergone 
          a multi-step verification process to ensure that you're dealing with the actual 
          owner/operator of the rental home you're applying for.
        </p>
        
        <p>
          Every owner/operator has their own application procedures. ONLY use the contact 
          information listed above to apply for your new rental home or contact the owner/operator. 
          Never send money via Zelle, PayPal, CashApp, ApplePay or similar cash transfer service.
        </p>

        <div className="mt-6 rounded-md bg-karasai-light p-4">
          <p className="font-semibold text-karasai-blue">
            ⚠️ Important: Report Suspicious Activity
          </p>
          <p className="mt-2 text-xs">
            If you encounter any suspicious activity or believe you've found fraudulent contact 
            information, please report it immediately to{' '}
            <a href="mailto:fraud@karasai.com" className="font-semibold text-karasai-blue hover:underline">
              fraud@karasai.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
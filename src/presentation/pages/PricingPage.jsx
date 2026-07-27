import { useEffect, useState } from 'react';
import { getFaqs, getPricingPlans } from '../../domain/usecases/getContent.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { PricingCard } from '../components/shared/PricingCard.jsx';
import { CTABanner } from '../components/shared/CTABanner.jsx';
import { Accordion } from '../components/ui/Accordion.jsx';

export function PricingPage() {
  const [plans, setPlans] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState('1');
  const [openPlan, setOpenPlan] = useState(null);

  useEffect(() => {
    Promise.all([getPricingPlans(), getFaqs()]).then(([p, f]) => {
      setPlans(p);
      setFaqs(f);
      setOpenFaq(f[0]?.id ?? null);
    });
  }, []);

  const featureLabels = plans[0]?.features.map((f) => f.label) ?? [];

  return (
    <>
      {usePageMeta({
        title: 'Pricing',
        description: 'Transparent TATATECH pricing for Starter, Professional, and Enterprise plans.',
        path: '/pricing',
      })}
      <div className="border-b border-border bg-surface py-12 md:py-16">
        <PageContainer>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Pricing' }]} />
          <h1>Simple, scalable pricing</h1>
          <p className="mt-3 max-w-2xl text-text-secondary">
            Choose a package or talk to us about a custom engagement.
          </p>
        </PageContainer>
      </div>

      <Section>
        <PageContainer>
          <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-surface">
        <PageContainer>
          <h2 className="mb-8 text-2xl">Compare plans</h2>
          <div className="hidden overflow-x-auto rounded-xl border border-border bg-background lg:block">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border bg-surface">
                <tr>
                  <th className="px-5 py-4 font-semibold">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="px-5 py-4 font-semibold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureLabels.map((label) => (
                  <tr key={label} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 text-text-secondary">{label}</td>
                    {plans.map((plan) => {
                      const feature = plan.features.find((f) => f.label === label);
                      return (
                        <td key={plan.id} className="px-5 py-4">
                          {feature?.included ? (
                            <span className="text-success">Included</span>
                          ) : (
                            <span className="text-text-muted">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden">
            <Accordion
              items={plans.map((plan) => ({
                id: plan.id,
                title: plan.name,
                content: (
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature.label} className="flex justify-between gap-3 text-sm">
                        <span>{feature.label}</span>
                        <span className={feature.included ? 'text-success' : 'text-text-muted'}>
                          {feature.included ? 'Yes' : 'No'}
                        </span>
                      </li>
                    ))}
                  </ul>
                ),
              }))}
              openId={openPlan}
              onChange={setOpenPlan}
            />
          </div>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer>
          <h2 className="mb-8 text-2xl">FAQ</h2>
          <Accordion items={faqs} openId={openFaq} onChange={setOpenFaq} />
        </PageContainer>
      </Section>

      <Section>
        <CTABanner
          title="Need something custom?"
          subtitle="We’ll scope a package around your roadmap."
          primary={{ to: '/contact', label: 'Get a Quote →' }}
        />
      </Section>
    </>
  );
}

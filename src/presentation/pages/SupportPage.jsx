import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Clock3, Headphones, MessageSquareText, ShieldCheck } from 'lucide-react';
import { submitTicket } from '../../domain/usecases/submitQuote.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { useToast } from '../hooks/useToast.js';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Select } from '../components/ui/Select.jsx';
import { Textarea } from '../components/ui/Textarea.jsx';

const ticketSchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  company: z.string().optional(),
  category: z.string().min(1, 'Choose a category'),
  priority: z.string().min(1, 'Choose a priority'),
  subject: z.string().min(5, 'Add a short, specific subject'),
  description: z.string().min(20, 'Please include at least 20 characters'),
});

const supportBenefits = [
  { icon: Clock3, title: 'Fast triage', text: 'Every request is reviewed and routed to the right specialist.' },
  { icon: ShieldCheck, title: 'Secure by default', text: 'Do not include passwords, API keys, or private credentials.' },
  { icon: MessageSquareText, title: 'Clear updates', text: 'Your ticket ID keeps every response and next step organized.' },
];

export function SupportPage() {
  const [ticket, setTicket] = useState(null);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(ticketSchema), mode: 'onBlur' });

  const onSubmit = async (values) => {
    try {
      const result = await submitTicket(values);
      setTicket(result.id);
      reset();
      toast.success('Support ticket created.');
    } catch {
      toast.error('We could not create the ticket. Please try again.');
    }
  };

  return (
    <>
      {usePageMeta({
        title: 'Technical Support',
        description: 'Open a support ticket with the TATATECH technical team.',
        path: '/support',
      })}
      <div className="border-b border-border bg-surface py-10 sm:py-14">
        <PageContainer>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Support' }]} />
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <span className="label-caps text-primary">TATATECH support desk</span>
              <h1 className="mt-3">Tell us what needs attention</h1>
              <p className="mt-4 max-w-2xl text-lg text-text-secondary">
                Share the impact, expected behavior, and any steps we can use to reproduce the issue.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-text-secondary">
              <span className="h-2.5 w-2.5 rounded-full bg-success" />
              Support desk operational
            </div>
          </div>
        </PageContainer>
      </div>

      <Section>
        <PageContainer>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
            <div className="min-w-0 rounded-xl border border-border bg-background p-5 shadow-sm sm:p-8">
              <AnimatePresence mode="wait">
                {ticket ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex min-h-[520px] flex-col items-center justify-center text-center"
                  >
                    <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                      <CheckCircle2 className="h-8 w-8" />
                    </span>
                    <h2 className="text-2xl">Your ticket is in the queue</h2>
                    <p className="mt-3 max-w-md text-text-secondary">
                      A support specialist will review the details and contact you by email.
                    </p>
                    <div className="mt-6 rounded-lg border border-border bg-surface px-5 py-3 font-mono text-sm font-semibold text-text-primary">
                      Ticket {ticket.slice(0, 8).toUpperCase()}
                    </div>
                    <Button type="button" variant="outline" className="mt-8" onClick={() => setTicket(null)}>
                      Open another ticket
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                  >
                    <div>
                      <h2 className="text-2xl">Open a support ticket</h2>
                      <p className="mt-2 text-sm text-text-secondary">Required fields help us route your request without delay.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input label="Name" autoComplete="name" error={errors.name?.message} {...register('name')} />
                      <Input label="Work email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
                    </div>
                    <Input label="Company (optional)" autoComplete="organization" {...register('company')} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Select label="Issue category" error={errors.category?.message} {...register('category')}>
                        <option value="">Select category</option>
                        <option value="website">Website or application</option>
                        <option value="infrastructure">Cloud or infrastructure</option>
                        <option value="billing">Billing and account</option>
                        <option value="security">Security concern</option>
                        <option value="other">Other</option>
                      </Select>
                      <Select label="Priority" error={errors.priority?.message} {...register('priority')}>
                        <option value="">Select priority</option>
                        <option value="low">Low - general question</option>
                        <option value="normal">Normal - work impaired</option>
                        <option value="high">High - major feature unavailable</option>
                        <option value="urgent">Urgent - production unavailable</option>
                      </Select>
                    </div>
                    <Input label="Subject" placeholder="Example: Checkout fails after sign-in" error={errors.subject?.message} {...register('subject')} />
                    <Textarea label="What happened?" rows={6} placeholder="Include steps, affected users, error messages, and when the issue started." error={errors.description?.message} {...register('description')} />
                    <Button type="submit" variant="accent" className="w-full sm:w-auto" loading={isSubmitting}>
                      <Headphones className="h-4 w-4" />
                      Submit ticket
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <aside className="space-y-7 lg:pt-2">
              <div>
                <h2 className="text-xl">What happens next</h2>
                <div className="mt-5 space-y-6">
                  {supportBenefits.map(({ icon: Icon, title, text }) => (
                    <div key={title} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary dark:bg-primary/15">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-base">{title}</h3>
                        <p className="mt-1 text-sm text-text-secondary">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-sm font-semibold text-text-primary">Planning a new project?</p>
                <p className="mt-2 text-sm text-text-secondary">Use our project form for estimates, discovery, and new work.</p>
                <Link to="/contact" className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">Contact our project team</Link>
              </div>
            </aside>
          </div>
        </PageContainer>
      </Section>
    </>
  );
}
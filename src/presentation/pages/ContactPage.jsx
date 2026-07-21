import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { submitQuote } from '../../domain/usecases/submitQuote.js';
import { SITE } from '../../utils/constants.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { useToast } from '../hooks/useToast.js';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Select } from '../components/ui/Select.jsx';
import { Textarea } from '../components/ui/Textarea.jsx';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from '../components/shared/SocialIcons.jsx';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  company: z.string().optional(),
  service: z.string().min(1, 'Select a service'),
  budget: z.string().min(1, 'Select a budget'),
  message: z.string().min(10, 'Please share a bit more detail'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Consent is required',
  }),
});

const methods = [
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone.replace(/[^\d+]/g, '')}` },
  { icon: MapPin, label: 'Address', value: SITE.address },
  { icon: Clock3, label: 'Hours', value: SITE.hours },
];

export function ContactPage() {
  const [success, setSuccess] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (values) => {
    try {
      await submitQuote(values);
      setSuccess(true);
      toast.success('Message sent successfully.');
      reset();
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      {usePageMeta({
        title: 'Contact',
        description: 'Get a free quote from TATATECH — we reply within 24 hours.',
        path: '/contact',
      })}
      <Section className="!pt-10">
        <PageContainer>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Contact' }]} />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h1>Let&apos;s build together</h1>
              <p className="mt-3 text-text-secondary">Free quote — 24-hour reply</p>
              <div className="mt-8 space-y-4">
                {methods.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary dark:bg-primary/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{label}</p>
                      {href ? (
                        <a href={href} className="text-text-secondary hover:text-primary">
                          {value}
                        </a>
                      ) : (
                        <p className="text-text-secondary">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-2">
                {[
                  { href: SITE.social.linkedin, icon: LinkedInIcon, label: 'LinkedIn' },
                  { href: SITE.social.facebook, icon: FacebookIcon, label: 'Facebook' },
                  { href: SITE.social.instagram, icon: InstagramIcon, label: 'Instagram' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-secondary hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-lg lg:p-8">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[320px] flex-col items-center justify-center text-center"
                >
                  <CheckCircle2 className="mb-4 h-14 w-14 text-success" />
                  <h2 className="text-2xl">Message sent</h2>
                  <p className="mt-2 text-text-secondary">
                    We&apos;ll reply within 24 hours.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-6"
                    onClick={() => setSuccess(false)}
                  >
                    Send another
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Name"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label="Email"
                      type="email"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>
                  <Input label="Company (optional)" {...register('company')} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select label="Service" error={errors.service?.message} {...register('service')}>
                      <option value="">Select a service</option>
                      <option value="web-design">Web Design</option>
                      <option value="software">Software Development</option>
                      <option value="infrastructure">IT Infrastructure</option>
                      <option value="nfc">NFC Digital Cards</option>
                      <option value="lms">LMS & Education</option>
                      <option value="marketing">Digital Marketing</option>
                    </Select>
                    <Select label="Budget" error={errors.budget?.message} {...register('budget')}>
                      <option value="">Select a budget</option>
                      <option value="<5k">Under $5k</option>
                      <option value="5-15k">$5k – $15k</option>
                      <option value="15-50k">$15k – $50k</option>
                      <option value="50k+">$50k+</option>
                    </Select>
                  </div>
                  <Textarea
                    label="Message"
                    error={errors.message?.message}
                    {...register('message')}
                  />
                  <label className="flex items-start gap-3 text-sm text-text-secondary">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-border text-primary"
                      {...register('consent')}
                    />
                    <span>
                      I agree to the{' '}
                      <Link to="/privacy" className="font-semibold text-primary">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.consent ? (
                    <p className="text-sm text-danger">{errors.consent.message}</p>
                  ) : null}
                  <Button type="submit" variant="accent" className="w-full" loading={isSubmitting}>
                    Send Message →
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl grayscale">
            <iframe
              title="TATATECH office map — Alexandria, Virginia"
              src="https://maps.google.com/maps?q=Alexandria%20Virginia&t=&z=12&ie=UTF8&iwloc=&output=embed"
              className="h-64 w-full border-0 md:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </PageContainer>
      </Section>
    </>
  );
}

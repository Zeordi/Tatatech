export function FAQItem({ question, answer }) {
  return (
    <div>
      <h3 className="font-heading font-semibold text-text-primary">{question}</h3>
      <p className="mt-2 text-text-secondary">{answer}</p>
    </div>
  );
}
